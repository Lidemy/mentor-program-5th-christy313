## Redux middleware 是什麼？

middleware 很像是轉運站，類似交通仲介，例如說我有一個 action 是從 A 地到 B 地，那 middleware 幫我做的事可能是「買車票」，常用在「非同步的事件處理上」，例如：呼叫 API 或者處理登入事件等。

## CSR 跟 SSR 差在哪邊？為什麼我們需要 SSR？

CSR 是 client side render 指的是網頁在 browser 渲染；SSR 是 server side render 指的是網頁在 server 渲染

對網頁右鍵檢視原始碼，如果是 CSR 不會看到網頁的內容，但 SSR 可以看到網頁內容。

SSR 除了對 SEO 比較有利以外，使用者體驗更好，因為使用者等待的時間較短，可以比較快看到畫面，而且有一部分的資料已經在 HTML 裡面了，可以減少去 API 拿資料的時間。

## React 提供了哪些原生的方法讓你實作 SSR？

在 server 把 html 的部分 DOM [render to string](https://reactjs.org/docs/react-dom-server.html#rendertostring)，接著在 client 端，透過 react 使用 hydrate 的方式，加上 event listener 那些沒有在 server 被執行的部分，就產生了使用者看到的網站。

## 承上，除了原生的方法，有哪些現成的框架或是工具提供了 SSR 的解決方案？至少寫出兩種

a. [Next.js](https://nextjs.org/) 一個 react 內建 SSR 的框架

b. [Nuxt.js](https://nuxtjs.org/) 給 Vue 用的

c. [Nest.js](https://nestjs.com/) 後端用的
