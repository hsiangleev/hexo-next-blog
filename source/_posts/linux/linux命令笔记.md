---
title: linux命令笔记
date: 2020/05/19 10:54:26
tags: linux
categories: linux
# description: 
excerpt: linux命令记录以防忘记
---

#### 关机/重启
    shutdown -r now   # 立即重启（reboot）
    shutdown -h now   # 立即关机（poweroff）

#### 内存占用
    ps aux --sort -rss
    top
    free
    ps aux | grep nginx   # 查看某个软件的进程
    
#### 端口占用
    netstat -lnp|grep 80      # 查看端口占用
    ps 14973                  # 查看进程情况
    kill -9 14973             # 杀进程


#### 查看软件安装路径
    which node

#### 文件管理
```sh
cat: 连接文件并打印到标准输出设备上
    1. cat 1.txt  # 打印文件到控制台
    2. cat -n 1.txt  # 打印文件到控制台并对每一行编号
    3. cat -b 1.txt  # 打印文件到控制台并对每一行编号，不包括空白行
    4. cat 1.txt > 2.txt    # 把1.txt的内容复制到2.txt中
    5. cat 1.txt >> 2.txt   # 把1.txt的内容追加到2.txt中
    6. cat 1.txt 2.txt > 3.txt    # 把1.txt和2.txt的内容复制到3.txt中
    7. cat null > 3.txt    # 清空3.txt

chgrp: 变更文件或目录的所属群组
    1. chgrp -v user 1.txt              # 修改1.txt的群组为user
    2. chgro -v -R user test            # 修改test文件夹及其下面所有的文件的群组为user
    3. chgrp -v --reference=test2 test  # 修改test文件夹的群组与test2的群组相同

chown: 指定文件的拥有者改为指定的用户或组
    1. chown user test          # 把test文件夹所属用户改为user用户
    2. chown user:user test     # 把test文件夹所属用户改为user用户,所属组设为user组
    2. chown -R user:user test  # 把test文件夹及其下面所有的文件所属用户改为user用户,所属组设为user组

chmod: 修改文件权限
    1. chmod 777 -R file.txt

cksum: 检测文件是否被改动，确保文件从一个系统传输到另一个系统的过程中不被损坏
    1. cksum 1.txt              # 若文件被改动，则两次输出结果不同

cmp: 比较两个文件是否相同（只显示第一次出现不同的位置，一般比较二进制文件）
    1. cmp 1.txt 2.txt          # 如果两个文件相同，则不显示信息，否则显示第一个不同的位置

diff: 以逐行的方式，比较文本文件的异同处
    1. diff 1.txt 2.txt         # 
    2. diff 1.txt 2.txt -y      # 以并列的方式显示文件的异同之处。

file: 查看文件类型
    1. file 1.js                # 1.js: ASCII text
    1. file -i 1.js             # 1.js: text/plain; charset=us-ascii(显示MIME类别)

find: 查找文件(find   path   -option   [   -print ]   [ -exec   -ok   command ]   {} \;)
    1. find . -name "*.js"      # 查找当前目录下的所有.js的文件
    2. find . -type f           # 查找当前目录所有文件
    3. find . -type d           # 查找当前目录下的所有目录（文件夹）
    4. find . -name "*.js" -exec ls -l {} \;        # 查找当前目录下的所有.js的文件并列出它们的完整路径(-exec参数后面的命令可以操作查找出来之后的结果)

ln: 为某一个文件在另外一个位置建立一个同步的链接
    1. ln -s node/index.js aa/index.js      # 在aa文件夹下创建一个软连接，指向node/index.js

less: 查看文件（可分页和搜索）less 1.html
    1. 内部快捷键：
        * /post        # 向下查找
        * ?post        # 向上查找
        * n            # 重复前一个搜索，接着查找
        * N            # 反向重复前一个搜索
        * pagedown     # 向下翻动一页
        * pageup       # 向上翻动一页
        * -N:          # 显示行号
        * -m:          # 显示百分比
        * -i:          # 忽略搜索大小写

mv: 为文件或目录改名、或将文件或目录移入其它位置
    1. mv 1.js 2.js         # 把1.js文件名修改为2.js
    2. mv 1.js ../node/     # 移动文件

paste: 会把每个文件以列对列的方式，一列列地加以合并
    1. paste 1.txt 2.txt    # 按列合并文件（按行合并用cat）

rm: 删除一个文件或者目录
    1. rm -f 1.txt          # 删除文件，无需确认
    2. rm -rf aa            # 删除文件夹及其文件，无需确认

tee: 读取标准输入的数据，并将其内容输出成文件
    1. ping baidu.com | tee 1.txt       # 把ping的结果实时的存进1.txt文件
    2. ping baidu.com | tee 1.txt -a    # 把ping的结果实时的追加到1.txt文件

touch: 修改文件或者目录的时间属性，包括存取时间和更改时间。若文件不存在，系统会建立一个新的文件
    1. touch 1.txt          # 文件若不存在，则创建，若存在，则修改时间属性为当前系统时间（可用 ls -l 查看）
    2. touch {1..6}.txt     # 创建1.txt, 2.txt, ... 6.txt等6个文件

cp: 复制文件或目录
    1. cp ../1.txt .        # 复制上一次的1.txt文件到本目录
    2. cp -r ../aa .        # 复制上一次的aa文件夹到本目录

文件上传
    1. yum install -y lrzsz
    2. rz       # 上传
    3. sz       # 下载

scp: 跨服务器复制
    1. scp .\1.txt root@192.168.100.84:~/               # 复制windows当前文件夹下的1.txt文件
    2. scp -P 22 .\1.txt root@192.168.100.84:~/         # 复制windows当前文件夹下的1.txt文件
    3. scp -P 22 root@192.168.100.84:~/1.txt .\         # 复制到本地
```

#### 防火墙
```sh
firewall-cmd --query-port=80/tcp      # 查询防火墙指定端口是否开启
firewall-cmd --zone=public --add-port=80/tcp --permanent      # 开启防火墙端口（需重新载入）
firewall-cmd --zone=public --remove-port=80/tcp --permanent  # 关闭防火墙端口（需重新载入）
firewall-cmd --reload         # 防火墙重新载入
systemctl start firewalld     # 开启防火墙
systemctl stop firewalld      # 关闭防火墙
firewall-cmd --state          # 查看防火墙状态
firewall-cmd --list-ports     # 查询防火墙已开放的端口
firewall-cmd --list-all       # 查询防火墙信息
firewall-cmd --zone=public --add-port=22/tcp --add-port=80/tcp --permanent
firewall-cmd --zone=public --add-port=20-22tcp --permanent
```


#### 用户管理
```sh
useradd user      # 创建新用户
passwd user       # 设置密码
userdel user      # 删除用户
su user           # 切换用户
groupadd testgroup    # 添加组
groupdel testgroup    # 删除组
cat /etc/passwd       # 查看所有用户
cat /etc/group        # 查看所有组
```

#### 发送请求curl
    -b [str/url]: 使用cookie字符串或文件用来向服务器发送 Cookie
    -X [type]: 请求类型（POST）
    -o [url]: 抓取内容到一个文件
    -d: 传输数据（-d log=aaaa）
    -x: 代理（-x 24.10.28.84:32779）

#### 添加到systemctl服务
1. 新建文件`/usr/lib/systemd/system/frp.service`
2. 添加以下文件
    ```
    [UNIT]
    Description=frp Service
    After=network.target

    [Service]
    Type=simple
    # Type=forking

    # 命令
    ExecStart=/web/frp/frp_0.38.0_linux_amd64/frps -c /web/frp/frp_0.38.0_linux_amd64/frps.ini
    ExecReload=
    ExecStop=

    PrivateTmp=True

    [Install]
    WantedBy=multi-user.target
    ```
3. 重载 `systemctl daemon-reload`
4. 启动服务 `systemctl start frp.service`

#### centos8网卡操作
```sh
nmcli connection reload          # 重启网卡
nmcli connection up eth0         # 激活网卡eth0
nmcli connection down eth0       # 停用网卡eth0
nmcli device status              # 查看网卡状态
nmcli device show eth0           # 查看网卡详情
vi /etc/sysconfig/network-scripts/ifcfg-eth0         # 编辑网卡文件
```

#### 压缩
```sh
tar -czvf a.tar.gz a.txt          # 压缩a.txt文件(c: create创建, z: gzip压缩, v: 显示压缩的文件信息, f: file压缩文件名)
tar -tzvf a.tar.gz                # 查看压缩包包含哪些文件(t: 不解压查看tar包的内容)
tar -xzvf a.tar.gz                # 解压(x: 解压tar包)
zip -v a.zip a.txt b.txt          # 压缩a.txt和b.txt或者向压缩文件追加(v: 显示压缩信息)   
zip -d a.zip 3.txt                # 从压缩包删除文件(d: 删除文件)
zip -r aa.zip ./aa                # 压缩文件夹(r: 压缩目录)
zip -v a.zip {1..6}.txt -x "3.txt"    # 压缩1,2,4,5,6.txt文件(x: 排除文件或文件夹)
unzip a.zip                       # 解压到当前目录
```

#### vsftpd（配置文件删除后面的注释及空格,centos8）
* yum install vsftpd -y                     # vsftpd安装
* useradd ftpadmin -s /sbin/nologin         # 新建虚拟宿主用户
* 配置vsftpd的文件(/etc/vsftpd/)
    ```bash
    listen=YES
    listen_ipv6=NO
    allow_writeable_chroot=YES  
    chroot_list_enable=NO
    chroot_local_user=YES
    guest_enable=YES            # 启用虚拟用户
    guest_username=ftpadmin     # 虚拟宿主用户名
    user_config_dir=/etc/vsftpd/user_conf
    pasv_min_port=30000
    pasv_max_port=31000
    ```
* mkdir /etc/vsftpd/user_conf/              # 虚拟用户配置文件存放路径
* 生成虚拟用户的数据库文件
    1. vi /etc/vsftpd/login.txt             # 奇数行为用户名，偶数行为密码
    2. db_load -T -t hash -f /etc/vsftpd/login.txt /etc/vsftpd/vsftpd_login.db     # 转换成db文件
    3. chmod 600 /etc/vsftpd/vsftpd_login.db            # 权限设置
* 生成一个使用vsftpd_login.db数据文件的PAM认证文件
    1. vi /etc/pam.d/vsftpd                 # 注释文件内的所有行，添加下面2，3行
    2. auth required /lib64/security/pam_userdb.so db=/etc/vsftpd/vsftpd_login crypt=hash
    3. account required /lib64/security/pam_userdb.so db=/etc/vsftpd/vsftpd_login crypt=hash
* 创建虚拟用户的配置文件
    1. cd /etc/vsftpd/user_conf
    2. vi test                          # 新建文件（文件名为虚拟用户表中的名字），并写入下面的权限
        ```bash
        local_root=/home/ftpadmin       # 访问目录
        write_enable=YES                # 写入的权限
        anon_world_readable_only=NO
        anon_upload_enable=YES
        anon_mkdir_write_enable=YES
        anon_other_write_enable=YES
        ```
* systemctl restart vsftpd               # 重启服务
* 开启端口
    1. firewall-cmd --permanent --add-port=20-21/tcp
    2. firewall-cmd --permanent --add-port=30000-31000/tcp
* 若出现*500 OOPS: cannot change directory:/home/ftpadmin*
    1. getsebool -a | grep ftp          # 发现tftp_home_dir–>off则执行
    2. setsebool -P tftp_home_dir 1
    3. systemctl restart vsftpd

#### gitlab安装
##### centos7安装gitlab
```bash
yum install -y curl policycoreutils-python openssh-server    # 防火墙中打开HTTP，HTTPS和SSH访问
systemctl enable sshd
systemctl start sshd
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
systemctl reload firewalld
yum install postfix                                          # 邮件服务
systemctl enable postfix
systemctl start postfix
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.rpm.sh | sudo bash    # 下载速度慢，可以先下载安装包，用rpm -ivh安装
EXTERNAL_URL="https://gitlab.example.com" yum install -y gitlab-ee
```

##### docker安装gitlab
```bash
docker pull gitlab-ce                 # 获取镜像
docker volume create gitlab-etc
docker volume create gitlab-log
docker volume create gitlab-data
docker run -d --hostname localhost -p 3001:80 -p 3002:443 --name gitlab --restart unless-stopped --volume gitlab-etc:/etc/gitlab --volume gitlab-log:/var/log/gitlab --volume gitlab-data:/var/opt/gitlab gitlab/gitlab-ce:latest
docker ps
docker exec -it gitlab /bin/bash      # 进入容器
vi /etc/docker/gitlab.rb              # 修改配置文件
docker restart gitlab                 # 重启服务
```


##### 邮件配置
* 修改配置文件/etc/gitlab/gitlab.rb
    ```bash
    gitlab_rails['smtp_enable'] = true
    gitlab_rails['smtp_address'] = "smtp.qq.com"
    gitlab_rails['smtp_port'] = 465
    gitlab_rails['smtp_user_name'] = "******@qq.com"
    gitlab_rails['smtp_password'] = "授权码"
    gitlab_rails['smtp_domain'] = "smtp.qq.com"
    gitlab_rails['smtp_authentication'] = "login"
    gitlab_rails['smtp_enable_starttls_auto'] = true
    gitlab_rails['smtp_tls'] = true
    gitlab_rails['gitlab_email_from'] = '******@qq.com'
    ```
* gitlab-rails console          # 进入控制台
    1. Notify.test_email('收件人邮箱', 'title', 'body').deliver_now     # 发送邮件测试


#### docker常用命令
1. docker rm -f id			# 删除镜像
2. docker rmi REPOSITORY:TAG		# 删除容器
3. docker build -t hsiangleev/httptest:v1 .	# 构建容器（.为查找当前目录下的Dockerfile）
4. docker run -d -p 127.0.0.1:3000:3000 hsiangleev/httptest:v1	# 运行容器


#### 安装ifconfig
1. yum search ifconfig
2. yum install net-tools.x86_64

#### 把默认的CentOS Yum源修改成国内的aliyun Yum源
1. 下载wget: `yum install wget`
2. 备份: `mkdir /opt/centos-yum.bak`, `mv /etc/yum.repos.d/* /opt/centos-yum.bak/`
3. 下载aliyun Yum源repo文件: `wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-8.repo`
4. 清除缓存: `yum clean all`, `yum makecache`

#### mysql安装
##### 安装指定版本的mysql
1. **RPM Bundle**文件[下载](https://downloads.mysql.com/archives/community/)
2. tar -xvf mysql...                                                # 解压
2. dnf install mysql-community-{server,client,common,libs}-*        # 安装
3. grep 'temporary password' /var/log/mysqld.log                    # 查看初始密码
4. mysql -uroot -p                                                  # 登录
5. `SET GLOBAL validate_password_policy=LOW;`                       # 降低密码安全级别
6. `use mysql;`,`update user set host = '%' where user = 'root';`,`flush privileges;`   # 远程访问
7. mysql_secure_installation                                        # 配置密码与安全性选择
    * 为root用户设置密码；
    * 删除匿名账号；
    * 取消root用户远程登录；
    * 删除test库和对test库的访问权限；
    * 刷新授权表使修改生效。
8. systemctl start mysqld.service       # 启动服务
9. systemctl enable mysqld.service      # 开机自启
10. systemctl disable mysqld.service    # 取消开机自启

##### 安装最新版本的
* dnf install mysql-server