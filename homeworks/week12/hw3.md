## 請簡單解釋什麼是 Single Page Application

SPA 是一種單頁式的應用，前端負責顯示資料，後端負責提供資料。相對於一般傳統型的 MPA (Multi-Page Application)，主要差別在於 SPA 是 client side render，而 MPA 的網頁是 server side render。因此 SPA 只要一個 index.html 的檔案就好了，透過同一個檔案，就可以去不同的分頁；但是 MPA 的網頁，每一個分頁都會有不同的檔案。

## SPA 的優缺點為何
優點：前後端分離，整個專案更好維護。使用者體驗較佳，因為用 ajax 來抓資料，不會有換頁等待的問題。
缺點：SEO 比較差，因為是 client side render，所以後端不會存資料。前端管理狀態會比 MPA 要來得複雜很多，因為會有一些非同步顯示資料的問題要處理。

## 這週這種後端負責提供只輸出資料的 API，前端一律都用 Ajax 串接的寫法，跟之前透過 PHP 直接輸出內容的留言板有什麼不同？
第九週的 PHP 留言板，是用傳統型的 MPA 來製作網頁，因此 SPA 跟 MPA 主要的差別在於 SPA 是 client side render，MPA 是 server side render。
MPA 在轉換頁面時，會重新刷新整個網頁來拿資料，而且對於 SEO 非常友好，但是速度比 SPA 慢。
SAP 在進到網頁之後，第一次是全頁下載，接著當使用者跳轉頁面時，只會改變部分資料，而且對 SEO 不友善。
