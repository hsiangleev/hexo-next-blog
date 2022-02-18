---
title: git常用命令
date: 2020/01/14 09:33:06
tags: 
    - git
categories: git
# description: 
excerpt: git常用命令记录以防忘记
---


#### 常用命令
```bash
git init                  # git初始化
git add 1.js              # 添加文件到暂存区
git add .                 # 添加当前文件夹的所有文件到暂存区
git commit -m "..."       # 提交到分支
git commit -a -m "..."    # 从工作区直接提交，跳过暂存区
git commit --amend        # 合并上次的提交，即如果提交内容少了，可以用此追加提交
git rm a.txt              # 从暂存区移除文件，并把工作区文件一并删除
git rm --cached a.txt     # 从暂存区移除文件，不删除本地文件
git clone [url]           # 克隆现有项目
git status -s
    1. ??       # 尚未添加到暂存区
    2. _M       # 工作区文件修改(_表示空格)
    3. M_       # 暂存区文件修改
    4. A_       # 新添加到暂存区
    5. _D       # 工作区文件删除
    6. _R       # 工作区文件重命名
git mv a.txt b.txt        # 暂存区和工作区文件重命名(相当于以下三条命令)
    1. mv a.txt b.txt
    2. git rm a.txt
    3. git add b.txt
git log       # 查看提交历史
    1. -p           # 显示每次提交的差异
    2. -2           # 仅显示最近两次提交
    3. --stat       # 显示文件提交信息
    4. --pretty=    # 格式化显示信息
        1. oneline      # 单行显示
        2. short
        3. full
        4. fuller
        5. format:"%h - $an, %ar : %s"
            1. %H       # commit完整哈希值
            2. %h       # commit简短哈希值
            3. %an      # 作者名字
            4. %ae      # 作者邮箱
            5. %ad      # 作者修订日期
            6. %ar      # 作者修订日期，按多久之前显示
            7. %cn      # 提交者名字
            8. %ce      # 提交者邮箱
            9. %cd      # 提交者提交日期
            10. %cr     # 提交者提交日期，按多久之前显示
            11. %s      # 提交说明
    5. --graph              # 显示 ASCII 图形表示的分支合并历史
    6. --since=2.weeks      # 从什么日期(1.years1.days5.minutes  2019-01-12)
    7. --until              # 到什么日期
    8. -S "aaa"             # 查找某次提交记录添加或删除某些字符串的记录
    9. [path]               # 查看某个文件或文件夹的提交记录
    10. --author=           # 仅显示指定作者相关的提交
git log --oneline --graph --decorate
git reset
    0. 设工作区为A，暂存区为B，分支为C
    1. git reset --soft [HEAD]              # 移动分支HEAD到指定位置，不取消暂存（撤销commit命令），只修改C
    2. git reset [HEAD]                     # 移动分支HEAD到指定位置，并取消暂存（撤销commit命令和add命令），修改B和C
    3. git reset --hard [HEAD]              # 移动分支HEAD到指定位置，取消暂存，并撤销本地文件的修改，修改ABC（不安全，可能会丢失版本）
    4. git reset [file]                     # 取消某个文件暂存（与 git add 相反）
    5. git reset [HEAD] [file]              # 某个文件暂存区重置到指定位置，只修改B（相当于A先重置，再add到B，A再恢复）
git checkout -- [file]            # 撤销文件修改
git reflog                        # 查找之前的记录
git remote
    1. git remote -v                    # 查看当前关联的远程库（cat .git/config）
    2. git remote add [pb] [url]        # 关联远程库，pb为远程 Git 仓库简写
    3. git remote show [pb]             # 查看某个远程库信息
    4. git remote rename [opb] [npb]    # 改名
    5. git remote rm [pb]               # 移除远程库
git revert -n [HEAD]                  # 只撤销某一步的修改，然后重新提交
git diff [<commit-id>] [file]                     # 比较某文件工作区与暂存区（或指定commit-id）差异
    1. --cached/staged [<commit-id>] [file]         # 比较某文件暂存区与版本库（或指定commit-id）差异
    2. HEAD [file]                                  # 比较某文件工作区与版本库差异
    3. git diff [<commit-id>] [<commit-id>] [file]  # 比较某文件两个commit-id之间的差异
    3. --stat                                       # 不显示详细信息，只显示有多少行被改动
git difftool -x "code --wait --diff" [HEAD] [file]    # 比较某个文件的某一次提交跟当前的版本差异，并用vscode显示区别
git stash
    1. git stash save "保存当前状态"     # 保存当前的进度状态
    2. git stash list                   # 显示保存进度列表
    3. git stash pop "[stash_id]"       # 恢复指定的进度到工作区，如果没有stash_id则使用最新的进度，会删除当前进度
    4. git stash apply "[stash_id]"     # 恢复指定的进度到工作区，如果没有stash_id则使用最新的进度，不会删除当前进度
    4. git stash drop "[stash_id]"      # 删除指定的进度到工作区，如果没有stash_id则使用最新的进度
    5. git stash clear                  # 删除所有存储的进度
git update-index
    1. git update-index --skip-worktree [file]                  # 忽略本地文件的修改
    2. git update-index --no-skip-worktree [file]               # 取消忽略本地文件的修改
    3. git ls-files -v                                          # 查看所有被忽略的文件
git cherry-pick
    1. git cherry-pick [HEAD]               # 把其他分支的某次提交复制到当前分支
    2. git cherry-pick [b]                  # 把某个分支的最后一次提交复制到当前分支
    3. git cherry-pick [HEAD] [HEAD]        # 多个提交
    4. git cherry-pick [HEAD1]..[HEAD3]     # HEAD1到HEAD3，不包括HEAD1
    4. git cherry-pick [HEAD1]^..[HEAD3]    # HEAD1到HEAD3，包括HEAD1
```


#### 分支
```bash
git branch                # 查看当前分支
    1. [b]                  # 创建分支
    2. -d [b]               # 删除分支(未合并的分支会删除失败)
    3. -D [b]               # 强制删除分支
    4. -v                   # 查看每个分支的最后一次提交
    5. --merged             # 查看哪些分支已经合并到当前分支
    6. --no-merged          # 查看所有包含未合并工作的分支
git checkout
    1. [b]                  # 切换分支
    2. -b [b]               # 创建并切换分支
git merge [b]             # 合并某分支到当前分支
git checkout -b 本地分支名 origin/远程分支名          # 从远程分支拉取本地没有的分支
```

#### 补丁
```bash
git format-patch [HEAD] -1                # 某次提交
git format-patch [HEAD] [HEAD]            # 某两次提交之间的所有patch
git diff [HEAD] [HEAD] > [file.diff]      # 生成diff文件
git apply --check [file.patch|diff]       # 检查能否打补丁
git apply [file.patch|diff]               # 打补丁
git am [file.patch|diff]                  # 打补丁
```

#### 整合分支的修改（合并test分支到master）
```bash
1. 合并分支（git merge test）
2. 变基（提交历史可能会丢失）
    1. git checkout test
    2. git rebase master
    3. git checkout master
    4. git merge test
3. 不同之处：合并分支的历史记录为并行的，变基的历史记录为串行的
4. 注意：不要对在你的仓库外有副本的分支执行变基
```

#### git远程分支
```bash
当从远程库克隆时，会为你自动将其命名为 origin（git clone -o [test] [url]，可以改为test），拉取它的所有数据，创建一个指向它的 master 分支的指针，并且在本地将其命名为 origin/master（跟踪分支）。
Git 也会给你一个与 origin 的 master 分支在指向同一个地方的本地 master 分支。
本地提交的时候master指针移动，但是origin/master指针不会移动
    > a=>b=>c=>d=>e           # 远程分支，本地在c处克隆，远程继续提交d和e，远程master指向e处</br>
    > a=>b=>c                 # 本地origin/master指向c处，只要不与服务器连接，指针不移动</br>
    > a=>b=>c=>f=>g           # 本地master分支初始指向c处，继续提交f和g，master指向g处
git fetch origin: 获取本地没有的远程库origin数据，移动 origin/master 指针指向新的、更新后的位置
    > a=>b=>c=>d=>e           # 远程分支，本地在c处克隆，远程继续提交d和e，远程master指向e处</br>
    > a=>b=>c=>d=>e           # 本地origin/master指针移动到远程origin最新处，指向e</br>
    > a=>b=>c=>f=>g           # 本地master分支初始指向c处，继续提交f和g，master指向g处
git merge origin/master: 合并到当前分支
git checkout -b newBranch origin/master: 新建分支，并指向跟踪分支的位置（跟踪分支和分支不同的是只有一个指针，不含可编辑的副本）
git push origin --delete master: 删除远程分支
```

#### git配置自定义服务器
```bash
useradd git                  # 管理员创建用户
passwd git                   # 设置git用户密码
su git                       # 切换git用户
mkdir .ssh                   
chmod 700 .ssh
cd .ssh
touch authorized_keys        # 创建保存公钥的文件
chmod 600 authorized_keys
vi authorized_keys           # 把公钥写进文件（如果用户的公钥不在文件中，则每次需要输入登录密码）
cd /home/git                # 回到主目录
git init --bare test.git    # 新建空仓库
本地测试
git remote add local git@ip:/home/git/test.git  # 关联远程库
git push local master       # 本地推送
```

#### GitWeb
```bash
yum install git-instaweb     # 安装
git instaweb -p 3000         # 修改监听端口（先进入仓库所在目录）
git instaweb --start         # 启动服务
```

#### GitLab
##### 基本命令
```bash
gitlab-ctl reconfigure        // 重启配置，并启动gitlab服务
gitlab-ctl start              // 启动所有
gitlab-ctl restart            // 重新启动GitLab
gitlab-ctl stop               // 停止所有
gitlab-ctl status             // 查看服务状态
gitlab-ctl tail               // 查看Gitlab日志
vim /etc/gitlab/gitlab.rb     // 修改默认的配置文件
```

##### centos7安装
```bash
yum install -y curl policycoreutils-python openssh-server    // 防火墙中打开HTTP，HTTPS和SSH访问
systemctl enable sshd
systemctl start sshd
firewall-cmd --permanent --add-service=http
firewall-cmd --permanent --add-service=https
systemctl reload firewalld
yum install postfix                                          // 邮件服务
systemctl enable postfix
systemctl start postfix
curl https://packages.gitlab.com/install/repositories/gitlab/gitlab-ee/script.rpm.sh | sudo bash    // 下载速度慢，可以先下载安装包，用rpm -ivh安装
EXTERNAL_URL="https://gitlab.example.com" yum install -y gitlab-ee
```

##### gitlab安装
```bash
docker pull gitlab-ce                 // 获取镜像
docker volume create gitlab-etc
docker volume create gitlab-log
docker volume create gitlab-data
docker run -d --hostname localhost -p 3001:80 -p 3002:443 --name gitlab --restart unless-stopped --volume gitlab-etc:/etc/gitlab --volume gitlab-log:/var/log/gitlab --volume gitlab-data:/var/opt/gitlab gitlab/gitlab-ce:latest
docker ps
docker exec -it gitlab /bin/bash      // 进入容器
vi /etc/docker/gitlab.rb              // 修改配置文件
docker restart gitlab                 // 重启服务
```

##### 邮件配置
修改配置文件/etc/gitlab/gitlab.rb
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
gitlab-rails console          // 进入控制台
    1. Notify.test_email('收件人邮箱', 'title', 'body').deliver_now     // 发送邮件测试
