## 什麼是反向代理（Reverse proxy）？

實作原理就是 client 端發送請求到伺服器時，伺服器再轉發到其他伺服器，client 不知道 server 的真實身份，把 server 藏起來。

使用原因：因為只有一個伺服器可以佔用 80 port，但通常一台伺服器會有多個服務，那其他服務的網址就會變成 `http://www.service.com:3306`，就會很奇怪。

因此在 80 port 上放反向代理伺服器，就可以根據客戶端的參數，藉由參數設定的 sub domain，把請求轉到不同的地方去。

另一個好處是，別人看不出來你在內部使用哪一個 port。

## 什麼是 ORM？

ORM 全稱為 Object Relational Mapping，是一種把資料庫轉換成物件並且關聯對映的方法，感覺像是鏡像並且複製一份，人動鏡子裡面的人也動這樣。

優點在於可以防止 SQL injection，未來資料庫轉移時，比較不需要改寫程式碼。

## 什麼是 N+1 problem？

#### 背景：

假設有 User 及 review 兩份表格，使用 user_id 進行關聯，有一個查詢是「找出 20 歲以上使用者的所有評論」

#### 執行狀況：

在查詢時，第一次先找出「所有 20 歲以上的使用者」，假設有五筆資料。

接著在這五筆資料裡面，再把評論撈出來，因此是從第一筆資料查詢到第五筆。

第一次查詢主要的 User 表格，以查詢到的結果，再查詢有關聯的副表格。

這篇文章 [什么是 N+1 问题，以及如何解决](https://segmentfault.com/a/1190000039421843#:\~:text=N%2B1%20%E6%98%AFORM%EF%BC%88%E5%AF%B9%E8%B1%A1,%E4%B8%AD%E5%AD%98%E5%9C%A8%E7%9A%84%E4%B8%80%E4%B8%AA%E9%97%AE%E9%A2%98%E3%80%82&text=%E8%BF%99%E6%A0%B7%E5%81%9A%E6%98%AF%E9%9D%9E%E5%B8%B8%E7%B3%9F%E7%B3%95,%E4%BD%99%E9%A2%9D%E8%A1%A8%E6%98%AF%E5%9B%9B%E6%AC%A1%E3%80%82) 說得很好，其實應該要稱作「1 + N」問題。

也就是說，第一次查詢出來是 N 個紀錄，實際執行時需要查詢的次數是 N + 1 次（就執行順序來說，1 + N 次比較合理），這就叫做 N + 1 問題。

### 為什麼會有這個問題？

查到的資料大部分是說，可能是新手會犯的錯誤，其實用一個 SQL 的 join 就可以了，但是在 ORM 裡面，很有可能會寫出這樣的程式碼。

### 解決辦法

ORM 相對應的方案：預加載 preload with

參考資料：

[Understanding and fixing N+1 query](https://medium.com/doctolib/understanding-and-fixing-n-1-query-30623109fe89)

[\[Day 16\] 關聯資料表加載，解決 N+1 Query](https://ithelp.ithome.com.tw/articles/10224842)

[什么是 N+1 问题，以及如何解决](https://segmentfault.com/a/1190000039421843#:\~:text=N%2B1%20%E6%98%AFORM%EF%BC%88%E5%AF%B9%E8%B1%A1,%E4%B8%AD%E5%AD%98%E5%9C%A8%E7%9A%84%E4%B8%80%E4%B8%AA%E9%97%AE%E9%A2%98%E3%80%82&text=%E8%BF%99%E6%A0%B7%E5%81%9A%E6%98%AF%E9%9D%9E%E5%B8%B8%E7%B3%9F%E7%B3%95,%E4%BD%99%E9%A2%9D%E8%A1%A8%E6%98%AF%E5%9B%9B%E6%AC%A1%E3%80%82)

[GraphQL Design: 使用 DataLoader 提升效能 !](https://ithelp.ithome.com.tw/articles/10207606)

[\[科普文\]什么是ORM中的N+1](https://zhuanlan.zhihu.com/p/27323883)

[ORM — N+1 Problem](https://hung-x0x0.medium.com/orm-n-1-problem-c98e39b9c96)

### 心得

對這個問題還不是那麼熟悉，但是目前似乎有初步的理解了，放著之後慢慢研究。
