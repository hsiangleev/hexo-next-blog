---
title: 使用frp配置内网穿透，将内网服务反向代理到公网
date: 2021/11/06 14:30:36
tags: 
    - 内网穿透
    - 反向代理
categories: 工具
description: 通过在具有公网 IP 的节点上部署 frp 服务端，可以将内网服务穿透到公网。
---

1. [下载地址](https://github.com/fatedier/frp/releases)，因为我的公网服务器是linux，内网服务是windows，所以下载两个版本**frp_0.38.0_linux_amd64.tar.gz**和**frp_0.38.0_windows_amd64.zip**。
2. windows的软件解压到任意一个文件夹，删除frps相关的文件，linux的软件上传到服务器并解压，删除frpc相关的软件，然后修改两端的配置文件**frpc.init**和**frps.init**。
3. frps.init内容如下：
    ```ini
    [common]
    # 服务端监听端口，接收 frpc 的连接，须和frpc.init的server_port一致
    bind_port = 3010
    # 鉴权使用的 token 值，须和frpc.init的token一致
    token = 123
    # 日志文件地址
    log_file = ./frps.log
    # 配置服务端管理界面监控
    dashboard_addr = 0.0.0.0
    # 管理界面端口
    dashboard_port = 3015
    # 管理界面登录用户
    dashboard_user = admin
    # 管理界面登录密码
    dashboard_pwd = admin
    # 是否提供 Prometheus 监控接口
    enable_prometheus = true
    ```
4. frpc.init内容如下：
    ```ini
    [common]
    token = 123
    # 连接服务端的地址(自己的公网IP)
    server_addr = ×.×.×.×
    # 连接服务端的端口，和上面的bind_port一致
    server_port = 3010
    # 配置客户端管理界面
    admin_addr = 0.0.0.0
    admin_port = 3011
    admin_user = admin
    admin_pwd = admin

    [webUI]
    type = tcp
    local_port = 3011
    remote_port = 3016
    ```
5. linux防火墙开启端口3010-3020端口，`firewall-cmd --zone=public --add-port=3010-3020/tcp --permanent`，`firewall-cmd --reload`
6. 服务端启动`./frps -c ./frps.ini`，浏览器访问**http://×.×.×.×:3015**，界面提示需要登录，输入用户名密码admin，登录之后便可以看到如下界面：<img data-src="/images/使用frp配置内网穿透，将内网服务暴漏公网/1.png" class="lozad" style="margin: 0 auto;"/>
7. 客户端启动`.\frpc.exe -c .\frpc.ini`，浏览器访问**http://127.0.0.1:3011**或者**http://×.×.×.×:3016**，登录之后看到如下界面：<img data-src="/images/使用frp配置内网穿透，将内网服务暴漏公网/2.png" class="lozad" style="margin: 0 auto;"/>
8. 点击左侧菜单**Configure**，可以直接修改配置文件，如果要添加ssh，远程连接本机内网，可以添加如下内容，即远程访问3012端口即可访问本机22端口
    ```ini
    [ssh]
    type = tcp
    local_port = 22
    remote_port = 3012
    ```
    然后点击upload，点击yes即可更新
9. 关于本机开启ssh可以看下[microsoft文档](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse)，或直接使用powershell安装：
    * 检查是否安装: `Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'`
    * 若出现**State : NotPresent**，则为未安装
    * 安装客户端: `Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0`
    * 安装服务端: `Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0`
    * 启动
    ```powershell
    # Start the sshd service
    Start-Service sshd
    # OPTIONAL but recommended:
    Set-Service -Name sshd -StartupType 'Automatic'
    # Confirm the Firewall rule is configured. It should be created automatically by setup. Run the following to verify
    if (!(Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP" -ErrorAction SilentlyContinue | Select-Object Name, Enabled)) {
        Write-Output "Firewall Rule 'OpenSSH-Server-In-TCP' does not exist, creating it..."
        New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
    } else {
        Write-Output "Firewall rule 'OpenSSH-Server-In-TCP' has been created and exists."
    }
    ```
    * 打开powershell，连接`ssh user@ip`，如果是使用微软账户登录的windows10，则直接使用微软账户也可以登录ssh，如果出现：
    ```
    The authenticity of host 'servername (×.×.×.×)' can't be established.
    ECDSA key fingerprint is SHA256:(<a large string>).
    Are you sure you want to continue connecting (yes/no)?
    ```
    输入yes，然后按enter，输入密码，即可连接成功
10. 使用公网ip测试能否连接内网的ssh，在powershell中输入**ssh -p 3012 user@公网ip**，不出意外的话，应该是可以连接的。
11. 添加共享内网文件夹，再次执行第八步，修改配置文件
    ```ini
    [file]
    type = tcp
    remote_port = 3013
    plugin = static_file
    # 要对外暴露的文件目录
    plugin_local_path = F:\共享
    # 用户访问 URL 中会被去除的前缀，保留的内容即为要访问的文件路径
    plugin_strip_prefix =
    plugin_http_user = admin
    plugin_http_passwd = admin
    ```
    然后点击upload，点击yes，浏览器访问`http://×.×.×.×:3013`，输入用户名密码之后，即可看到本地文件夹**F:\共享**内的文件
12. 服务端把命令添加到systemctl服务
    * 新建文件`/usr/lib/systemd/system/frp.service`
    * 内容如下：
    ```ini
    [UNIT]
    Description=frp Service
    After=network.target
    [Service]
    Type=simple
    # 执行的命令(文件地址根据安装位置修改)
    ExecStart=/web/frp/frp_0.38.0_linux_amd64/frps -c /web/frp/frp_0.38.0_linux_amd64/frps.ini
    ExecReload=
    ExecStop=
    PrivateTmp=True
    [Install]
    WantedBy=multi-user.target
    ```
    * 重载 `systemctl daemon-reload`
    * 使用命令启动/停止/重启服务 `systemctl start/stop/restart frp.service`
13. 可以在服务器上同时搭配nginx把不同的端口代理到不同的域名(需要域名解析到公网ip)上，如：
    ```conf
    server {
        listen       80;
        server_name  a.hsianglee.cn;
        location / {
            proxy_pass       http://127.0.0.1:3015;
        }
    }
    server {
        listen       80;
        server_name  b.hsianglee.cn;
        location / {
            proxy_pass       http://127.0.0.1:3013;
        }
    }
    ```
    即访问**a.hsianglee.cn**即可访问配置服务端管理界面，访问**b.hsianglee.cn**即可访问到内网共享文件
14. 如果要添加本地的其它端口，直接修改配置文件就可以了。
15. 配置代理服务器，服务器frps.init添加配置`vhost_http_port = 3017`，客户端frpc.init添加如下配置
    ```ini
    [http]
    type = tcp
    remote_port = 3018
    plugin = http_proxy
    plugin_http_user = admin
    plugin_http_passwd = admin
    ```
    然后打开另一台电脑，配置代理服务器，如下图：<img data-src="/images/使用frp配置内网穿透，将内网服务暴漏公网/3.png" class="lozad" style="margin: 0 auto;"/>
    然后浏览器访问baidu之后，便会要求输入用户名和密码，输入之后便可以了<img data-src="/images/使用frp配置内网穿透，将内网服务暴漏公网/4.png" class="lozad" style="margin: 0 auto;"/>


**附录：**
    1. [frp文档](https://gofrp.org/docs/)
    2. [frp下载地址](https://github.com/fatedier/frp/releases)
    3. [windows10开启ssh](https://docs.microsoft.com/en-us/windows-server/administration/openssh/openssh_install_firstuse)