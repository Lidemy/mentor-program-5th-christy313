## 請說明雜湊跟加密的差別在哪裡，為什麼密碼要雜湊過後才存入資料庫

雜湊是不可逆的，加密是可逆的，意思是說雜湊以後是沒辦法反推出原來的密碼，或者是說要花很大的時間或精力才有辦法反推。
因為密碼雜湊過後存到資料庫才安全，萬一資料庫被盜了，駭客才無法知道密碼原始碼。

## `include`、`require`、`include_once`、`require_once` 的差別

include 跟 include_once 其實功能相似，都是用來引入檔案，如果沒有找到檔案，會出現錯誤訊息，但程式還是會繼續執行。
後面的 once 會先檢查要引入的檔案是否已經被引入過了，因為 PHP 不允許相同名稱的函數被重複宣告，如果重複就會出現錯誤訊息。

require 跟 require_once 功能也相似，也都是用來引入檔案，如果沒有找到檔案，會出現錯誤訊息，但是程式會停止執行。
後面的 once 跟上述的作用是相同的。

一開始我誤以為，require 有「連線到外部檔案」的概念，因為大部分都是用在連線上的；而 include 有「把檔案拿進來」的感覺，因為本次都是用在引入 navbar。

## 請說明 SQL Injection 的攻擊原理以及防範方法

攻擊原理：在使用者可以輸入的地方，插入惡意的程式碼，到資料庫裡面讀取敏感資料、刪除、更新等等。
因為沒有防範的 sql 語法是用單引號或雙引號組成的，所以可以輸入類似 `"SELECT * FROM users WHERE account = '' or '1' = '1';"`，這樣程式碼會永遠成立，就可以拿到所有用戶資料了。

防範方法：

1. 利用下面的程式碼來實現，重點在於 sql 語法裡面不要放任何的引號，只讓最外面有引號。
2. 接著用 bind_param() 這個函式把參數把放進去
3. 執行 sql

```php
  $page = $_POST['page'];
	$id = $_POST['id'];
	$title = $_POST['title'];
	$content = $_POST['content'];

	$sql = "UPDATE christy_blog_articles SET title=?, content=? WHERE id=?";
	$stmt = $conn->prepare($sql);
	$stmt->bind_param('ssi', $title, $content, $id);
	$result = $stmt->execute();
```  

##  請說明 XSS 的攻擊原理以及防範方法
攻擊原理：在網站上插入惡意程式碼，來竊取想要的資料或者把使用者導向釣魚網站。

防範方法：永遠不要相信使用者輸入的任何東西

1. 利用跳脫把所有客戶端可輸入的地方都轉成文字，例如 PHP 內建函式 `htmlspecialchars()`
2. 對於 img, a 這一類的標籤，可以設定白名單，禁止 javascript 開頭的連結
關於第二點，我看了一下參考資料，但是沒有很懂要怎麼應用

[前端安全系列（一）：如何防止XSS攻擊？](https://www.gushiciku.cn/pl/28uX/zh-tw)
[淺談 XSS 攻擊與防禦的各個環節](https://blog.huli.tw/2021/06/19/xss-attack-and-defense/)

## 請說明 CSRF 的攻擊原理以及防範方法

攻擊原理：利用瀏覽器對 server 發送請求時，會帶上 cookie 資料(通常會有 session id、密碼之類的) 的特色，讓使用者在不知情的情況下點擊圖片或連結，已達到攻擊的目的。

例如說，把網址放在 img 的標籤裡面，並且偽裝成一張圖片，當使用者點擊之後就可以達成攻擊目的了。

防範方法：

SameSite 有 Strict, Lax 還有 None 三種，預設是 Lax，如果是 PHP 7.3 以後的版本，可以用
Set-Cookie: __Host-session=123; path=/; Secure; HttpOnly; SameSite=Lax
