---
title: git变基
date: 2022/05/12 10:06:38
tags: 
    - git
categories: git
description: 记录一下git变基的部分操作
---

### 拉取代码时变基

* 当本地提交代码之后再拉取代码时会产生类似如图的效果，继续执行`git pull`便会产生merge</br>
  <img data-src="/images/git变基/2.png" class="lozad"/>
* 这时可以使用 `git pull --rebase`便不会产生merge了
* 如果出现冲突，可以先解决冲突，然后执行 `git rebase --continue`，若要取消操作，则执行`git rebase --abort`
* 两者的过程如下:
    1. `git pull`是先`git fetch`，然后`git merge origin/master`
    1. `git pull --rebase`是先`git fetch`，然后`git rebase origin/master`
* 全局设置，`git config --global --add pull.rebase true`，即执行`git pull`自动执行`git pull --rebase`
* 取消，`git config --global --unset pull.rebase`

### 两个分支的变基

* test分支的代码合并到master分支

    ```git
    git checkout test
    git rebase master
    git checkout master
    git merge test
    ```

### 同一个分支变基

* 删除某次提交

    1. 复制删除的那次提交之前的commitId
    1. `git rebase -i [commitId]`
    1. 修改需要删除的commit之前的**pick**为**drop**
    1. 如果是vim编辑器，则输入i为编辑，按esc键为退出编辑状态，wq为保存并退出
    1. 如果是nano编辑器，则ctrl+x，然后输入y，再按entry为保存并退出
    1. 拉取变基之后的代码 `git pull --rebase`
    1. 修改默认编辑器为vim `git config ---global core.editor vim`
    1. 产生的提交数的原因：
        * drop之前的不会修改commitId
        * drop之后的会修改commitId，则该修改也会变，即会产生提交 <img data-src="/images/git变基/1.png" class="lozad"/>
