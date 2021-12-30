## 為什麼我們需要 Redux？

Redux 適合拿來管理大專案裡的全域狀態，當狀態改變時，Redux 讓我們更清楚理解「改變時間」、「在哪裡改變」、「為什麼改變」、「如何改變」這些資訊，使得程式碼具有可預測性與容易測試。

參考資料：[Why Should I Use Redux?](https://redux.js.org/tutorials/fundamentals/part-1-overview#why-should-i-use-redux)

## Redux 是什麼？可以簡介一下 Redux 的各個元件跟資料流嗎？

#### a. Redux 是實作狀態管理機制的套件，它幫助我們管理以及更新狀態。

#### b. Redux 各個元件

* action：是一個 JavaScript 的物件，裡面有 type（必要，記錄型別及對應函式）、payload（不必要，放想傳的參數）

* dispatch：任務總管，在 redux 中，我們用 `store.dispatch(action)` 來指派任務

* reducer：是一個 pure function，作用單純，只會修改、刪除等等

* store：任務處理中心，裡面執行 reducer 並且回傳新的狀態

* subscribe 訂閱開啟小鈴鐺，有事通知我：當 store 改變時，就會觸發裡面傳進去的函式

* action constants：規範字串，有錯會報錯，避免錯誤

* action creator：把行為寫成一個函式包起來，取代 `store.dispatch()` 簡化流程

#### c. 資料流：

使用者點擊畫面 -> 任務管理員 dispatch 發送任務 action 到任務處理中心 -> 執行任務並回傳新的狀態 -> 產生新的畫面

[官網動畫介紹](https://redux.js.org/tutorials/essentials/part-1-overview-concepts)

![](https://d33wubrfki0l68.cloudfront.net/01cc198232551a7e180f4e9e327b5ab22d9d14e7/b33f4/assets/images/reduxdataflowdiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

參考資料：[What is Redux?](https://redux.js.org/tutorials/fundamentals/part-1-overview#what-is-redux)、[Data Flow](https://redux.js.org/tutorials/fundamentals/part-1-overview#data-flow)


## 該怎麼把 React 跟 Redux 串起來？

有三種方法：

#### a. 如果不用 redux，也可以自行串接（但通常不會這樣做）：

* 原理就是利用 `store.subscribe()` 訂閱狀態變化，當使用者按下按鈕時，就 `store.dispatch()` 派送任務，接著 store 處理任務並回傳新的狀態產生畫面

#### b. 利用 `connect()` 串接：

* 新增一個函式例如 `connect()`，裡面回傳兩個參數 `mapStateToProps`、`mapDispatchToProps`

* 這兩個參數也是函式，裡面分別回傳狀態以及任務管理

  * `mapStateToProps` 連接 store 裡面的 state，類似 `getState()`

  * `mapDispatchToProps` 類似 `dispatch()`

* 再新增另一個函式例如 `connectedAddTodo`，去呼叫 `connect()`

* 這種手法叫做 HOC(higher order component)，指的是 component 外面再包一層 component

#### c. 利用 react-redux 官方提供的 hooks 串接：

* 建一個 redux 資料夾，裡面有以下兩個檔案：

  * 創建 store

  * 建立 reducer，裡面放要執行的任務

* 在 index.js 裡面，引入 store 以及 `Provider`，並用 `Provider` 把要 render 的 component 包起來

* 用 `useSelector` 對 store 裡面的資料作轉換，把需要的部分拿出來

* 用 `useDispatch()` 派送任務

