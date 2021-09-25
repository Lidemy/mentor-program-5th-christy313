![系統架構圖](https://upload.cc/i1/2021/09/25/zDg1BV.jpg)

### 後端系統架構圖

參考了一些資料，不確定理解是否正確，總覺得要把故事說完應該要花三天三夜，那只好先把重點擺在：

1. 增進效能：透過快取來減少對資料庫的存取，快取可以分成三種（或更多？）：

a. Browser Cache: client side 利用 header 帶參數的方式，拿存在瀏覽器裡面的資料。

b. Networking Cache: client side 利用把資料存在 CDN 的方式，降低與遠端 server 溝通的成本

c. Application Cache: server side 利用 Redis (Key Value Pair, NoSQL) 這個儲存系統，降低資料庫存取次數

2. 水平擴張：為了解決單點故障問題，在預算、需求允許下，會有多個 Server, DB

3. 備份：透過有多個 DB 來實現

參考資料：

[沒了解過 Cache，就別說網站性能沒救了！](https://oldmo860617.medium.com/%E6%B2%92%E4%BA%86%E8%A7%A3%E9%81%8E-cache-%E5%B0%B1%E5%88%A5%E8%AA%AA%E7%B6%B2%E7%AB%99%E6%80%A7%E8%83%BD%E6%B2%92%E6%95%91%E4%BA%86-6d9d4cfe3291)

[循序漸進理解 HTTP Cache 機制](https://blog.techbridge.cc/2017/06/17/cache-introduction/)

[資料庫的好夥伴：Redis](https://blog.techbridge.cc/2016/06/18/redis-introduction/)

[常见分布式应用系统设计图解（十三）：短网址系统](http://www.udpwork.com/item/17816.html)

[System Design I — TinyURL](https://huayuzhang.medium.com/system-design-i-tinyurl-b4cf7ffd56a3)
