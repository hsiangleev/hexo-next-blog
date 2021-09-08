---
title: linux命令笔记
date: 2020/05/19 10:54:26
tags: linux
categories: linux
# description: 
excerpt: linux命令记录以防忘记
---


### linux常用命令
#### 关机/重启
```bash
shutdown -r now   # 立即重启（reboot）
shutdown -h now   # 立即关机（poweroff）
```

#### 文件管理
```bash
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
        /post        # 向下查找
        ?post        # 向上查找
        n            # 重复前一个搜索，接着查找
        N            # 反向重复前一个搜索
        pagedown     # 向下翻动一页
        pageup       # 向上翻动一页
        -N:          # 显示行号
        -m:          # 显示百分比
        -i:          # 忽略搜索大小写

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
```

#### 防火墙
```bash
firewall-cmd --query-port=80/tcp      # 查询防火墙指定端口是否开启
firewall-cmd --zone=public --add-port=80/tcp --permanent      # 开启防火墙端口（需重新载入）
firewall-cmd --zone=public --remove-port=80/tcp --permanent  # 关闭防火墙端口（需重新载入）
firewall-cmd --reload         # 防火墙重新载入
systemctl start firewalld     # 开启防火墙
systemctl stop firewalld      # 关闭防火墙
firewall-cmd --state          # 查看防火墙状态
firewall-cmd --list-ports     # 查询防火墙已开放的端口
firewall-cmd --list-all       # 查询防火墙信息
```

#### 用户管理
```bash
useradd user      # 创建新用户
passwd user       # 设置密码
userdel user      # 删除用户
su user           # 切换用户
groupadd testgroup    # 添加组
groupdel testgroup    # 删除组
cat /etc/passwd       # 查看所有用户
cat /etc/group        # 查看所有组
```

#### 发送请求
```bash
curl
-b [str/url]: 使用cookie字符串或文件用来向服务器发送 Cookie
-X [type]: 请求类型（POST）
-o [url]: 抓取内容到一个文件
-d: 传输数据（-d log=aaaa）
-x: 代理（-x 24.10.28.84:32779）
```

#### 压缩
```bash
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
```bash
yum install vsftpd -y                     # vsftpd安装
useradd ftpadmin -s /sbin/nologin         # 新建虚拟宿主用户
配置vsftpd的文件(/etc/vsftpd/)
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
mkdir /etc/vsftpd/user_conf/              # 虚拟用户配置文件存放路径
生成虚拟用户的数据库文件
    1. vi /etc/vsftpd/login.txt             # 奇数行为用户名，偶数行为密码
    2. db_load -T -t hash -f /etc/vsftpd/login.txt /etc/vsftpd/vsftpd_login.db     # 转换成db文件
    3. chmod 600 /etc/vsftpd/vsftpd_login.db            # 权限设置
生成一个使用vsftpd_login.db数据文件的PAM认证文件
    1. vi /etc/pam.d/vsftpd                 # 注释文件内的所有行，添加下面2，3行
    2. auth required /lib64/security/pam_userdb.so db=/etc/vsftpd/vsftpd_login crypt=hash
    3. account required /lib64/security/pam_userdb.so db=/etc/vsftpd/vsftpd_login crypt=hash
创建虚拟用户的配置文件
    1. cd /etc/vsftpd/user_conf
    2. vi test                          # 新建文件（文件名为虚拟用户表中的名字），并写入下面的权限
        local_root=/home/ftpadmin       # 访问目录
        write_enable=YES                # 写入的权限
        anon_world_readable_only=NO
        anon_upload_enable=YES
        anon_mkdir_write_enable=YES
        anon_other_write_enable=YES
systemctl restart vsftpd               # 重启服务
开启端口
    1. firewall-cmd --permanent --add-port=20-21/tcp
    2. firewall-cmd --permanent --add-port=30000-31000/tcp
若出现*500 OOPS: cannot change directory:/home/ftpadmin*
    1. getsebool -a | grep ftp          # 发现tftp_home_dir–>off则执行
    2. setsebool -P tftp_home_dir 1
    3. systemctl restart vsftpd
```

#### centos7修改网络配置文件
```bash
vi /etc/sysconfig/network-scripts/ifcfg-eth0 修改ONBOOT=yes
systemctl restart network.service    # 重启网络服务
systemctl status network             # 查看网络状态
```

#### 安装ifconfig
1. yum search ifconfig
2. yum install net-tools.x86_64

#### centOS 7 network服务重启不了
```bash
执行service network restart，提示`Restarting network (via systemctl): Job for network.service failed because the control process exited with error code.See "systemctl status network.service" and "journalctl -xe" for details. [失败]`
和 NetworkManager 服务有冲突
关闭服务service NetworkManager stop
禁止开机启动 chkconfig NetworkManager off
网卡重启 service network restart
```

#### centos没网，显示io:flags=73..., ip变为127.0.0.1
动态获取或释放IP地址，执行代码: `dhclient`

#### 把默认的CentOS Yum源修改成国内的aliyun Yum源
1. 备份: `mkdir /opt/centos-yum.bak`, `mv /etc/yum.repos.d//opt/centos-yum.bak/`
2. 下载aliyun Yum源repo文件: `wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-8.repo`
3. 清除缓存: `yum clean all`, `yum makecache`