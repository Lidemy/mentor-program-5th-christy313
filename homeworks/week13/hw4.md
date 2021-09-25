## Webpack 是做什麼用的？可以不用它嗎？

Webpack 是做什麼用的？

即使現在瀏覽器有 ES6 的 import 與 export，但因支援度不好及要引入其他模組化套件來實作專案，而其他套件又不被瀏覽器支援，所以用 Webpack 打包轉換，才能執行在瀏覽器上面。

可以不用它嗎？

不可以。也許可以用其他套件取代，例如：snowpack or parcel，但是為了實現「要在瀏覽器上面使用 CommonJS 的模組機制，就必須使用工具先把程式碼打包才能做到」，所以一定要用套件打包程式碼。

## gulp 跟 webpack 有什麼不一樣？

定位不一樣，gulp 是管理任務；webpack 是打包程式碼用的。如果硬要比喻，gulp 有點像是產線管理員，而 webpack 是產線；產線負責包裝商品，管理員負責管理每條產線（?）

## CSS Selector 權重的計算方式為何？

CSS Selector 有以下三種等級，規則是 a > b > c：

a. id selector(像是 #username)

b. class selector(例如 .navbar), attributes selector(例如 type="radio") and pseudo-classes (例如 :hover)

c. type selector(例如 h1) and pseudo-elements (例如 ::before)

但是呢，inline style (就是寫在標籤裡面的那種)會覆蓋在 style sheet 裡面的樣式；還有雖然 `!important` 跟選擇器無關，一但用了它，所有的權重都會被覆蓋。

因此可以把先後順序想像成：

`!important` > inline style > a > b > c
