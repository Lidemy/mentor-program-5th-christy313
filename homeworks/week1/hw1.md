## 交作業流程

1. 開一個叫做 week1 的 branch: `git branch week1`
2. 切到 week1 底下寫作業: `git checkout week1`
3. 寫所有的作業，看自我檢討
4. 把所有新增的檔案都加進去 git: `git add .`
5. 把暫存區的改動交到本地的倉庫，`git commit -am "finish"`
6. 把 week1 那個分支推到遠端：`git push origin week1`
7. 在自己的 GitHub 上面發 PR （那個神秘的綠色按鈕）
8. 到學習系統新增作業，複製 PR 的連結
9. 等助教 merge 以後，切到 master：`git checkout master`
10. 把遠端的東西更新到本地：`git pull origin master`
11. 把本地的 week1 分支刪掉：`git branch -d week1`
12. 繼續寫下一週作業