### hw1：Event Loop

```js
console.log(1)
setTimeout(() => {
  console.log(2)
}, 0)
console.log(3)
setTimeout(() => {
  console.log(4)
}, 0)
console.log(5)
```

首先預設 JavaScript 的執行環境是瀏覽器，以下為先備知識：

a. Call Stack: 當程式執行時，會在 Call Stack 儲存正在執行的程式

b. stack: 每個正在執行的程式會產生一個 stack，最上面的 stack 代表現在正在執行的程式，執行完畢以後就會移除 stack。

c. WebAPI: 由瀏覽器提供給 JavaScript 使用的 API，這裡會用的是計時類型的 `setTimeout()`。WebAPI 在執行時，不影響 Call Stack 的運行。

e. Callback Queue: 用來儲存非同步的函式。

f. Event Loop: 負責檢查 Call Stack 是否為空，如果為空則把 Callback Queue 裡的函式放到 Call Stack 執行。

接著來跑一下這道題目，會輸出 1、3、5、2、4。

1. 開始執行，第一個在 Call Stack 出現的會是 main （也就是跑這個 js 檔案），接著依序往上堆 stack。

2. 執行第一行，產生 `console.log(1)` stack，印出 1 後結束執行，移除 stack。

3. 執行第二行，把 `setTimeout()` 整個函式放進 Call Stack，產生 stack，用 WebAPI 設定計時器，結束執行並移除 stack。此時 Call Stack 會繼續執行下一行程式碼 `console.log(3)`，WebAPI 則是時間到就把裡面的函式 `() => { console.log(2) }` 放到 Callback Queue 等待。

4. 執行 `console.log(3)` 產生 stack，印出 3 後結束執行，移除 stack。

5. 執行下一行，遇到第二個 `setTimeout()`，把整個函式放進 Call Stack，產生 stack，用 WebAPI 設定計時器，結束執行並移除 stack。此時 Call Stack 會繼續執行下一行程式碼 `console.log(5)`；WebAPI 則是時間到就把裡面的函式 `() => { console.log(4) }` 放到 Callback Queue 等待。

6. 執行 `console.log(5)` 產生 stack，印出 5 後結束執行，移除 stack。

7. 執行完所有的程式碼了，移除 mains stack，此時 Call Stack 為空。

8. Event Loop 檢查 Call Stack 為空，把 Callback Queue 排序第一的 `() => { console.log(2) }` 放到 Call Stack 產生一個 stack 並執行；呼叫 `console.log(2)`，往上再產生一個 stack 並印出 2，結束執行並移除 stack；剛剛這個函式 `() => { console.log(2) }` 執行完了，結束並移除 stack。

9. Event Loop 檢查 Call Stack 為空，把 Callback Queue 排序第一的 `() => { console.log(4) }` 放到 Call Stack 產生一個 stack 並執行；呼叫 `console.log(4)`，往上再產生一個 stack 並印出 4，結束執行並移除 stack；剛剛這個函式 `() => { console.log(4) }` 執行完了，結束並移除 stack。

10. 執行完畢