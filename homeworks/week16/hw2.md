### hw2：Event Loop + Scope

```js
for(var i=0; i<5; i++) {
  console.log('i: ' + i)
  setTimeout(() => {
    console.log(i)
  }, i * 1000)
}
```

首先假設 Javascript 的執行環境為瀏覽器

解題前的一些先備知識：

#### 1. 用 `var` 宣告的變數，若不在函式中，就會算在全域裡

在函式中使用 `var` 宣告變數，其作用域只會存在函式裡；但 for 迴圈不是一個函式，所以裡面的變數 i 等於是宣告在全域。

#### 2. 函式裡沒有宣告的變數，就往上一層作用域去找

這裡的 `setTimeout()` 函式中並沒有宣告 i 的值，因此會去上層作用域，也就是全域中尋找 i。

#### 3. `setTimeout()` 是一種 WebAPI，由瀏覽器提供的計時器

而值得特別注意的是，計時器的時間並不精準，裡面所設置的時間為「至少幾秒後再去執行」。

#### 4. 一行一行模擬 js 引擎執行

a. 執行這份 js 檔案，在 Call Stack 產生 main stack，開始執行第一行程式碼。初始化全域的 VO，此時 for 迴圈裡面的 i 為 undefined。

b. 進入 for 迴圈第一圈，此時全域的 i 從 undefined 變為 0。令 i 為 0，檢查 i 是小於 5，繼續執行，開始第一圈迴圈

c. 執行第二行 `console.log('i: ' + i)`，在 Call Stack 產生一個 stack 並印出 `i: 0`，結束執行並刪除 stack

d. 執行下一行，遇到第一個 `setTimeout()`，在 Call Stack 產生 stack，用 WebAPI 設定計時器，Call Stack 結束執行並刪除 stack，此時秒數為 0 (0 * 1000)。WebAPI 則是時間到就把第一圈 `setTimeout()` 裡面的函式 `() => { console.log(i) }` 放到 Callback Queue 等待。

e. 進入 for 迴圈第二圈，此時全域的 i 從 0 變為 1。令 i 為 1，檢查 i 是小於 5，繼續執行，開始第二圈迴圈

f. 執行第二行 `console.log('i: ' + i)`，在 Call Stack 產生一個 stack 並印出 `i: 1`，結束執行並刪除 stack

g. 執行下一行，遇到第二個 `setTimeout()`，在 Call Stack 產生 stack，用 WebAPI 設定計時器，Call Stack 結束執行並刪除 stack，此時秒數為一秒 (1 \* 1000)。WebAPI 則是時間到就把第二圈 `setTimeout()` 裡面的函式 `() => { console.log(i) }` 放到 Callback Queue 等待。

h. 進入 for 迴圈第三圈，此時全域的 i 從 1 變為 2。令 i 為 2，檢查 i 是小於 5，繼續執行，開始第三圈迴圈

i. 執行第二行 `console.log('i: ' + i)`，在 Call Stack 產生一個 stack 並印出 `i: 2`，結束執行並刪除 stack

j. 執行下一行，遇到第三個 `setTimeout()`，在 Call Stack 產生 stack，用 WebAPI 設定計時器，Call Stack 結束執行並刪除 stack，此時秒數為兩秒 (2 \* 1000)。WebAPI 則是時間到就把第三圈 `setTimeout()` 裡面的函式 `() => { console.log(i) }` 放到 Callback Queue 等待。

k. 進入 for 迴圈第四圈，此時全域的 i 從 2 變為 3。令 i 為 3，檢查 i 是小於 5，繼續執行，開始第四圈迴圈

l. 執行第二行 `console.log('i: ' + i)`，在 Call Stack 產生一個 stack 並印出 `i: 3`，結束執行並刪除 stack

m. 執行下一行，遇到第四個 `setTimeout()`，在 Call Stack 產生 stack，用 WebAPI 設定計時器，Call Stack 結束執行並刪除 stack，此時秒數為三秒 (3 \* 1000)。WebAPI 則是時間到就把第四圈 `setTimeout()` 裡面的函式 `() => { console.log(i) }` 放到 Callback Queue 等待。

n. 進入 for 迴圈第五圈，此時全域的 i 從 3 變為 4。令 i 為 4，檢查 i 是小於 5，繼續執行，開始第五圈迴圈

o. 執行第二行 `console.log('i: ' + i)`，在 Call Stack 產生一個 stack 並印出 `i: 4`，結束執行並刪除 stack

p. 執行下一行，遇到第五個 `setTimeout()`，在 Call Stack 產生 stack，用 WebAPI 設定計時器，Call Stack 結束執行並刪除 stack，此時秒數為四秒 (4 \* 1000)。WebAPI 則是時間到就把第五圈 `setTimeout()` 裡面的函式 `() => { console.log(i) }` 放到 Callback Queue 等待。

q. 進入 for 迴圈，此時全域的 i 從 4 變為 5。令 i 為 5，檢查 i 不是小於 5，結束執行迴圈。Call Stack 裡的 main 結束執行並刪除，此時全域中的 i 為 5；這時 Callback Queue 裡面一共有五個 `() => { console.log(i) }`

r. Event Loop 偵測到 Call Stack 為空，把 Callback Queue 裡第一個 `() => { console.log(i) }` 放到 Call Stack 產生一個 stack 並執行。呼叫 `console.log(i)` 往上再產生一個 stack，因為 setTimeout 本身沒有定義 i 的值，因此往上一層全域作用域尋找，此時 i 的值為 5，印出 5，結束執行並刪除 stack。剛剛這個函式 `() => { console.log(i) }` 執行完了，結束並刪除 stack。

s. 接下來重複四次 r 步驟，「執行 Callback Queue 裡第一個 `() => { console.log(i) }`」。

t. 執行完畢，輸出內容如下：

```
i: 0
i: 1
i: 2
i: 3
i: 4
5
5
5
5
5
```