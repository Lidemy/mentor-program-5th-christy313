## 請列出 React 內建的所有 hook，並大概講解功能是什麼

a. `useState`: 管理及更新在網頁上會變動的資料，例如遊戲的儲存記錄

b. `useEffect`: 網頁 render 完以後想做的事，例如載入頁面後就更新資料

c. `useContext`: 利用 `createContext` 在父層建立資料，將要傳遞的資料放到 value 中，使用 <Context.Provider> 包起來，即可與子層共享資料。

用這個方法傳遞資料與 Props 的差別是，後者必須每一層都傳 value 才可以拿到想要的數值。

Props 是接力棒，ㄧ定要透過每個跑者才能從第一棒傳到最後一棒；`useContext` 像是捷運廣播消息，只要一廣播，所有人都可以收到列車延誤的訊息。

d. `useReducer`: 看起來像是在管理 `useState` 的管理器，透過把 state 們集中，並使用 switch case 的方式，讓程式碼更有可讀性

參考資料：[这一次彻底搞定useReducer-使用篇](https://juejin.cn/post/6844903869604986888)

e. `useCallback`: 優化程式碼節省效能，如果 dependencies array 中的值沒有被修改，那 React 就會幫我們記住 object 裡面的值，防止 object 被重新分配記憶體位址。

f. `useMemo`: 用它把資料包起來，如果有變動才 re-render

g. `useRef`：新增東西但不需要放到畫面上就會用，例如新增 todo 也新增 id，但 id 不需要放在畫面上

h. `useImperativeHandle`: 讓父元件可以重新定義子元件中使用 ref 的 component

React 資料流特性是向下傳遞，使用這個方式可以讓子元件傳遞資料給父元件，並讓父元件重新定義

就像是捷運裡每個車廂都有廣播回報系統，民眾可以主動通報有人打翻飲料，捷運公司就會去清理

參考資料：[最陌生的hooks: useImperativeHandle](https://iter01.com/628819.html)

i. `useLayoutEffect`: 在 render 完，瀏覽器 paint 前會執行，也就是說在畫面出現前更新資料；`useEffect` 是在畫面出現後才更新資料

j. `useDebugValue`: 安裝 [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=zh) 以後，可以幫 hook 加上自定義的標籤來 debug

參考資料：[React Hooks系列之useDebugValue](https://blog.csdn.net/weixin_43720095/article/details/104968237#:\~:text=useDebugValue%20%E7%94%A8%E4%BA%8E%E5%9C%A8React,%E6%A0%BC%E5%BC%8F%E5%8C%96%E7%9A%84%E6%98%BE%E7%A4%BA%E5%80%BC%E3%80%82)、[Hooks API Reference](https://reactjs.org/docs/hooks-reference.html)

## 請列出 class component 的所有 lifecycle 的 method，並大概解釋觸發的時機點

根據 [官方文件](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/) 提供的資料，class component 的 lifecycle 分別有三個階段：Mounting、Updating、Unmounting，以下一一介紹，

#### Mounting 包含了以下的 lifecycle

* [`constructor()`](https://reactjs.org/docs/react-component.html#constructor): 用來初始化跟綁定 method，觸發時間點在 mount 之前

* [`static getDerivedStateFromProps()`](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops): 在 render 之前、初始化時即後續更新都會觸發

* [`render()`](https://reactjs.org/docs/react-component.html#render): 如果 props 或 state 改變時，就會執行

* [`componentDidMount()`](https://reactjs.org/docs/react-component.html#componentdidmount): component mount 以後執行

#### Updating 包含了以下的 lifecycle

* [`static getDerivedStateFromProps()`](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops): 在呼叫 render 之前執行

* [`shouldComponentUpdate()`](https://reactjs.org/docs/react-component.html#shouldcomponentupdate): 當有新的 props 及 state 時，在 render 之前會被觸發

* [`render()`](https://reactjs.org/docs/react-component.html#render): 同上題所述

* [`getSnapshotBeforeUpdate()`](https://reactjs.org/docs/react-component.html#getsnapshotbeforeupdate): 在最近一次 render 輸出後，更新 DOM 之前觸發；但初次  render 不會觸發

* [`componentDidUpdate()`](https://reactjs.org/docs/react-component.html#componentdidupdate): component update 之後，會給你前一次的 props & state 兩個參數

#### Unmounting

* [`componentWillUnmount()`](https://reactjs.org/docs/react-component.html#componentwillunmount): component unmount 之前（意指把 component 從畫面上去除，不 render 它的時候）觸發

#### Error Handling 在渲染過程、生命週期或 constructor 有錯誤時會觸發以下 methods

* [`static getDerivedStateFromError()`](https://reactjs.org/docs/react-component.html#static-getderivedstatefromerror): 在子層 component 出錯時觸發，會回傳一個 value 並更新 state

* [`componentDidCatch()`](https://reactjs.org/docs/react-component.html#componentdidcatch): 在子層 component 出錯時觸發，會回傳兩個參數

## 請問 class component 與 function component 的差別是什麼？

class component 所用的方式是「每個生命週期都有對應的 method，要做事時就把東西寫在裡面」

function component 什麼東西都寫在function 裡面，每次執行都會 render 一次，生命週期的方式改用成 useEffect()

## uncontrolled 跟 controlled component 差在哪邊？要用的時候通常都是如何使用？

差別在於 controlled 是把資料放到 state 裡面；uncontrolled 沒有

uncontrolled 的方式會用在例如 todo 輸入框，在使用者按下送出之後，才會去抓輸入框裡面的值，在這之前都不需要知道使用者輸入什麼，因為不需要掌控它

controlled 的方式則用在例如信用卡號或者手機號碼，如果使用者輸入的格式不對，就可以發出提醒訊息，不需要等到送出之後再去判斷
