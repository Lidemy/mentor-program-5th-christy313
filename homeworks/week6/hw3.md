## 請找出三個課程裡面沒提到的 HTML 標籤並一一說明作用。
1. <hr>: horizontal rule
分隔線，可以區分段落，使用起來簡單暴力，也可以用 CSS 裝飾它；但是相較於 border，後者用起來比較美，也更容易控制。

2. <dd>: description detail
就像是小情侶喜歡疊字一樣，這個可愛的標籤是 html 裡面唯一有疊字的標籤。要用它呢，要與 <dl> 及 <dt> 搭配使用。<dd> 主要是在描述某個名詞的定義，在畫面上會往後縮排五格，看起來好像很專業。

3. <progress>: progress
人如其名，這是一個顯示進度條的標籤，更改 value 的值可以顯示不同的血條之類的，使用方法如下：

```css
<progress value="32" max="100"> 32% </progress> 
```

## 請問什麼是盒模型（box model）
在 CSS 裡，每個物件是由許多大大小小的盒子組成，盒子裡會有 margin, border, padding, content。 
Margin 外邊距，在最外層的空間，是物體與物體之間的距離。
Border 邊框，很像是盒子本身的外框線。
Padding 內邊距，區別邊框跟內容兩者之間的差距。
Content 是指內容本人。

這是 CSS 裡最基礎也很重要的概念，因為所有的元素都是盒模型組成的。

為了方便計算盒子的大小，我們習慣在 CSS 裡面設置以下的方式，這樣寬度就會自己調整了。

```css
* {
 box-sizing: border-box;
}
```

## 請問 display: inline, block 跟 inline-block 的差別是什麼？
1. inline: 是一種行內元素，常見的有 span, a, input, img。元素可在同一行呈現，設定 margin 與 padding 看起來不會有效果，排版不會隨之改變。

2. block: 是一種區塊元素，常見的有 div, ul, p, h 系列。它自己佔滿一整行，不會跟其他元素並列，可以設定 margin, padding。

3. inline-block: 是一種行內區塊，它有著上述兩者的優點，可以調整寬高，也可以跟其他元素並排，一次滿足兩個願望。 

## 請問 position: static, relative, absolute 跟 fixed 的差別是什麼？
1. static: 網頁預設的定位方式，從左到右，由上到下。有點像是剛進公司的新人，矇矇懂懂地就被放到某個位置，做著自以為該做的事。

2. relative: 在網頁中，根據自己原本的定位，改變自己的定位位置。進公司三個月後，根據環境以及人心，默默地改變自己位置的偽菜鳥。

3. absolute: 有兩種可能性，如果有基準點的話，就可以脫離原本的排版，以那個基準點為起點，來定位自己；沒有基準點的話，就是以視窗為基準做定位。像是公司裡的老油條，老闆在（有基準點）的話，就多少裝模作樣；老闆不在（沒有基準點），就在公司裡面橫著走。

4. fixed: 依據視窗來決定位置，網頁廣告、聯絡客服或者是導覽列都可以用固定定位在同一個地方。視窗像公司，fixed 像老闆，想在哪裡就在哪，沒有人可以改變他。
