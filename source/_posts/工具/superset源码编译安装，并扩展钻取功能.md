---
title: Superset源码编译安装，并扩展钻取功能
date: 2022/02/17 15:26:18
tags: 
    - superset
categories: 工具
description: 使用centos8源码编译安装Apache Superset，并合并https://github.com/apache/superset/pull/17883 的钻取功能
---

### 环境安装(软件安装到/software下)
```bash
dnf install make gcc gcc-c++ libffi-devel python3-devel python3-pip python3-wheel openssl-devel cyrus-sasl-devel openldap-devel mysql-devel bzip2-devel sqlite-devel xz-devel
python3 --version    # python版本需要3.7或3.8
```

### 安装python3.8
```bash
mkdir /software
cd /software
wget https://registry.npmmirror.com/-/binary/python/3.8.6/Python-3.8.6.tar.xz
tar -xvf Python-3.8.6.tar.xz
mkdir python
cd Python-3.8.6
./configure --prefix=/software/python
make&&make install
rm -rf /usr/bin/python3                                                     # 删除原先的命令
ln -s /software/python/bin/python3 /usr/bin/python3                         # 建立新的软连接
rm -rf /usr/bin/pip3                                                        # 删除原先的命令
ln -s /software/python/bin/pip3 /usr/bin/pip                                # 建立新的软连接
ln -s /software/python/bin/pip3 /usr/bin/pip3                               # 建立新的软连接
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple    # 镜像
```

### mysql安装(可以不使用mysql)
```bash
dnf install mysql-server
systemctl start mysqld.service       # 启动服务
systemctl enable mysqld.service      # 开机自启
systemctl disable mysqld.service     # 取消开机自启
mysql_secure_installation            # 配置密码与安全性选择
    * 为root用户设置密码；
    * 删除匿名账号；
    * 取消root用户远程登录；
    * 删除test库和对test库的访问权限；
    * 刷新授权表使修改生效。
mysql -u root -p        # 登录
CREATE DATABASE IF NOT EXISTS superset DEFAULT CHARSET utf8 COLLATE utf8_general_ci;    # 新建superset数据库
# 远程访问设置
use mysql;
update user set host = '%' where user = 'root'; 
flush privileges;   
```

### 安装nodejs16(如果不修改前端代码可以不安装)
```bash
cd /software
wget https://nodejs.org/dist/v16.14.0/node-v16.14.0-linux-x64.tar.xz
tar -xvf node-v16.14.0-linux-x64.tar.xz
mkdir node
mv node-v16.14.0-linux-x64/* node/*
ln -s /software/node/bin/node /usr/bin/node                  # 建立软连接
ln -s /software/node/bin/npm /usr/bin/npm                    # 建立软连接
```

### 项目编译

#### 项目克隆
**注意：如果使用windows的git clone，需要设置换行符不转换`git config --global core.autocrlf false`**
```bash
cd /software
# git clone https://gitee.com/hsiangleev/superset.git       国内镜像地址
git clone https://github.com/hsiangleev/superset.git
git fetch origin my_drilldown
git checkout -b my_drilldown origin/my_drilldown
git pull origin my_drilldown
```

#### 编译前端(如果不修改前端代码可以省略这一步)
```bash
cd /software/superset/superset-frontend
npm ci --registry=https://registry.npmmirror.com
# 如果提示堆栈溢出，则可以扩大内存，node --max-old-space-size=4096 $(which npm) ci --registry=https://registry.npmmirror.com
npm run build
```

#### 修改配置项(superset/config.py)
* `vim /software/superset/superset/config.py`
* 176行mysql连接字符串修改为自己的`SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:password@localhost/superset'`
* 589行缓存文件目录修改`PATH = os.path.join('/web/superset/cache')`
* 如果需要启用redis缓存，则修改为
    ```py
    CACHE_CONFIG: CacheConfig = {
        "CACHE_TYPE": "redis",
        'CACHE_DEFAULT_TIMEOUT': 60 * 60 * 24, # 1 day default (in secs)
        'CACHE_REDIS_URL': 'redis://:password@localhost:6379/2', # 配置 URL,保存数据使用的redis的第2个数据库
        'CACHE_KEY_PREFIX': 'SUPERSET_DATA' # 保存数据用的前缀
    }
    TABLE_NAMES_CACHE_CONFIG: CacheConfig = {
        "CACHE_TYPE": "redis",
        'CACHE_DEFAULT_TIMEOUT': 60 * 60 * 24, # 1 day default (in secs)
        'CACHE_REDIS_URL': 'redis://:password@localhost:6379/2', # 配置 URL,保存数据使用的redis的第2个数据库
        'CACHE_KEY_PREFIX': 'SUPERSET_DATA' # 保存数据用的前缀
    }
    ```

#### 启动后端
```bash
cd /software
python3 -m venv virtual                         # 创建虚拟环境
source /software/virtual/bin/activate           # 进入虚拟环境
deactivate                                      # 此命令退出python虚拟环境
cd /software/superset
pip install -r requirements/testing.txt         # 安装外部依赖
pip install -e .
pip install pymssql
pip install pymysql
superset db upgrade                             # 初始化数据库
superset fab create-admin                       # 创建用户
superset init                                   # 初始化角色和权限
FLASK_ENV=development superset run -h 0.0.0.0 -p 8088 --with-threads --reload --debugger
```

#### 访问
```bash
firewall-cmd --zone=public --add-port=8088/tcp --permanent      # 添加防火墙端口
firewall-cmd --reload
# 浏览器访问: ip:8088
```

#### 添加数据库
```bash
mssql+pymssql://user:password@127.0.0.1:1433/superset           # mssql
mysql+pymysql://user:password@127.0.0.1:3306/superset           # mysql
```