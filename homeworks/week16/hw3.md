### hw3：Hoisting

```js
var a = 1
function fn(){
  console.log(a)
  var a = 5
  console.log(a)
  a++
  var a
  fn2()
  console.log(a)
  function fn2(){
    console.log(a)
    a = 20
    b = 100
  }
}
fn()
console.log(a)
a = 10
console.log(a)
console.log(b)
```

#### 輸出結果為 undefined、5、6、20、1、10、100；下文中***粗斜體***為答案

#### 先備知識：

a. EC: execution context 執行環境

b. VO: variable object 一個給 global 存資料的物件

c. AO: activation object 給函式存資料的物件

#### 執行流程：

1. 開始執行 js，進入 global EC，產生一個 VO。先找參數，可是沒有參數；再找函式，把 fn 加到 VO 裡；最後找到變數，把變數初始化，會有如下內容

  ```
  global VO {
    fn: Function,
    a: undefined
  }
  ```

2. global VO 初始化完成，接著開始執行程式碼

3. 執行第一行，global VO 的 a 從 undefined 變成 1

4. 接著呼叫 fn 這個函式，進入 fn EC 並建立 fn AO。先找參數，沒有參數；再找函式，把 fn2 加到 AO 裡；最後找變數，把 a 初始化，AO 內容如下

  ```
  fn {
    fn2: Function,
    a: undefined
  }
  ```

 5. 進入 fn，執行第三行，***印出 a 為 undefined***

 6. 執行第四行，把 fn AO 裡的 a 變成 5

 7. 執行第五行，***印出 a 為 5***

 8. 執行第六行，把 fn AO 裡的 a 變成 6

 9. 執行第七行，宣告變數，fn AO 裡已存在 a，因此不影響

10. 執行第八行，呼叫函式 fn2，產生 fn2 EC 並建立 fn2 AO

11. fn2 裡面沒有參數、函式及變數，fn2 AO 為空

12. 進入 fn2，執行第十一行，fn2 裡找不到 a；往上層 fn AO 裡面找到 a，***印出 a 為 6***

13. 執行第十二行，把 20 賦值給 a，但 fn2 AO 沒有 a，往上層 fn AO 找到 a，此時 a 為 20

14. 執行第十三行，依序從 fn2 AO -> fn AO -> global VO 都找不到 b。因此把 b 賦值 100，並放在 global VO 裡

15. fn2 執行結束，刪除 fn2 AO

16. 執行第九行，***印出 a 為 20***

17. fn 執行結束，刪除 fn AO

18. 執行第十七行，***印出 a 為 1***

19. 執行第十八行，在 global VO 裡把 10 給 a

20. 執行第十九行，***印出 a 為 10***

21. 執行第二十行，***印出 b 為 100***

22. 輸出依序為 undefined、5、6、20、1、10、100