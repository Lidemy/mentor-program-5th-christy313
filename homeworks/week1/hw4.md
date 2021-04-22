## 跟你朋友介紹 Git

使用 Git 來做版本控制，可以方便保存歷史紀錄、方便管理、並容易多人協作。

現在假設你在桌面有一個紀錄笑話的資料夾，叫做「haha」好了，然後你用文字紀錄的 txt 檔名叫做「joke1」、「joke2」

1. 首先到官網下載 Git https://git-scm.com/
2. 到 terminal 輸入：git --version 按下 enter 確認是否安裝完畢，看一下目前版本號。
3. 先切到 haha 那個資料夾底下：`cd haha`
4. 把 git 初始化：`git init`，告訴 git 你想要它管理這個資料夾
5. 用 `git add haha`，把檔案加入 git 這個倉儲裡面
6. 建立第一個版本：`git commit -am "first commit"` 
7. 開一個叫做 haha1 的新分支，並且切到那個分支去：`git checkout -b haha1`
8. 接著你最好都在這個分支裡面工作，每次建立一個新的笑話，都用 `git add joke1` 加入控制
9. 再用 `git commit -am "我是註解"`，這樣才會有保存版本的功能
10. 工作結束以後，記得把 haha1 這個分支 merge 回到 master: 
`git checkout master` -> `git merge haha1`

11. 你也可以用一個叫做 GitHub 免費的網站空間保存你的笑話
12. 先在那個網站註冊，建立一個新的倉庫 repository
13. 把你電腦的笑話資料夾上傳到 GitHub：`git push origin -u master`
14. 如果 h0w 哥在 GitHub 上面寫了一個笑話，你可以把笑話抓下來：`git pull origin master`

接著菜哥又問我一些問題，像是：

問：我有一個笑話比賽網站的帳號密碼檔案，不想要被控制，那該怎麼做呢？
答：可以在 terminal 執行 `.gitignore 接檔案名稱`，這樣檔案就可以脫離控制了

問：如果有一天我很厭世，不想再講笑話，也不想再用 git 控制了，那該怎麼辦？
答：那你就在那個資料夾底下，用 `rm -r .git` 把 git 刪掉，你就脫離所有控制了