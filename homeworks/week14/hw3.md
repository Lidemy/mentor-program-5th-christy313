## 什麼是 DNS？Google 有提供的公開的 DNS，對 Google 的好處以及對一般大眾的好處是什麼？

#### 什麼是 DNS？

DNS 全稱是 Domain Name System，DNS 將網域名稱（例如：https://www.google.com/）轉換成 IP 位址（例如：192.0.2.44），以便瀏覽器載入資源。

#### 對 Google 的好處：

收集使用者上網習慣會讓人直覺想到，可以幫助廣告商精準行銷。

不過看了這份文件 [Your Privacy](https://developers.google.com/speed/public-dns/privacy)，裡面寫明了 "Google does not use any personal information collected through the Public DNS service to target ads."

如果不是為了廣告收益，那提供免費服務也許是為了以下原因吧？

a. 市場壟斷性：越多人依賴 google 服務，它就越變得無法取代。

b. 收集數據：非廣告用途的收集數據，好處在於可以幫助 google 改善大數據分析能力，進而更加優化 Google Ads 和 BigQuery，讓產品高速迭代，增加競爭力。

#### 對一般人的好處：

a. 速度更快，瀏覽體驗更好。

b. 原本的 DNS（如中華電信）掛了，可以有備案。

c. 有些網路供應商（ISP）會因為廣告行銷的緣故，刻意阻止、篩選或誘導使用者進入特定網頁；而使用 google 的 DNS 可以預防這些事情發生。

參考資料：[Google Public DNS FAQ](https://developers.google.com/speed/public-dns/faq#filter)

#### 其他：
近年也有 [CloudFlare](https://1.1.1.1/) 出的 1.1.1.1 可以用，不是很確定到底哪一個比較好？[還在 Google DNS 8.8.8.8？更安全好用的「1.1.1.1」讓臉書不卡卡](https://www.vedfolnir.com/world-best-dns-1111-rather-than-8888-and-hinet-dns-29245.html)

## 什麼是資料庫的 lock？為什麼我們需要 lock？

資料庫的 Lock 用來鎖定資料，當多個使用者修改同一筆資料時，為了確保資料的正確性，會先把該筆資料鎖起來，等到改好以後再開放。

## NoSQL 跟 SQL 的差別在哪裡？

SQL 是關聯式資料庫，在裡面建立表格，可以從中新增、修改和刪除資料，以串連表格。

NoSQL 是非關聯式資料庫，資料格式為 json，用 key 對應 value 來讀取資料。每一個 NoSQL 都有自己的 API，必須透過呼叫函式或是使用特定指令才可以新增、修改、刪除資料。

#### NoSQL 跟 SQL 比較表：

| 差別     | SQL                            | NoSQL                          |
|----------|--------------------------------|--------------------------------|
| 資料結構 | 固定且嚴謹，具有一致性與完整性 | 結構不固定                     |
| 儲存格式 | 表格                           | 類似 json 的 document          |
| schema   | 需要定義                       | 不需要定義                     |
| 正規化   | join 連接                      | 偏向非正規化                   |
| 語法     | 輕量化，國際通用，有少許差異   | 基本操作簡單，但巢狀查詢複雜   |
| Scaling  | 可用 Clustering，但有點複雜    | 本質就有 scaling functionality |
| 特色     | ACID                           | BASE                           |
| 適用專案 | 銀行資料                       | 收集數據分析                   |

小結：

以上為簡單的比較表，主要還是根據需求選擇不同的資料庫格式；個人認為，有特定結構、需要有 ACID 的可偏向用 SQL；無特定結構，被動收集資料的，可以考慮用 NoSQL。

但是一個專案的運行，考量的不只是系統設計，還有營運成本、資料延遲速度、效能等等很多因素。

[參考資料：SQL vs NoSQL: The Differences](https://www.kshuang.xyz/doku.php/database:sql_vs_nosql)

## 資料庫的 ACID 是什麼？

ACID 代表以下四個定義：

a. 原子性 atomicity：一次 transaction 只能成功或失敗

b. 一致性 consistency：transaction 完成前後，必須維持資料的一致性

c. 隔離性 isolation：多筆 transaction 不會互相影響

d. 持久性 durability：transaction 完成後，對資料的操作就是永久的，即便系統故障也不會丟失

套用在銀行轉帳，例如 A 轉帳給 B 100 元：

a. A 會少 100，B 會多 100；這兩個要件要同時成立

b. 錢的總數不會因此錯誤

c. 若是 B 與 C 同時轉帳給 A，每筆交易是獨立的；一筆完成以後，再接著另一筆

d. 就算系統壞掉，A 帳戶裡面的錢總額也不會因此改變。
