## hw1：好多星星
這題很直覺的把答案寫出來了，但是發現用 OJ 解題會有種不一樣的思維，很像是把解題過程拆成兩段，先把架構寫出來，再寫一個函式運作，有時候會需要寫到兩個或更多。程式解題就像寫讀書摘要一樣，看懂題目，寫出摘要，就成功一半了，剩下的就是實作。

## hw2：水仙花數
還是會直覺地用取各個位數再 n 次方，而不是用比較數學的那一種方法，但比起之前完全沒有想到這個解法，現在已經記得這件事了，只是要用的時候不一定可以第一時間想起來。感覺就像 ES6 的語法一樣，知道有這個東西存在，但不見得可以很輕鬆地寫得出來。

## hw3：判斷質數
```js
function solve(lines) {
	for(let i=1; i<lines.length; i++) {
		if(isPrime(Number(lines[i]))) {
			console.log('Prime')
		} else {
			console.log('Composite')
		}
		// console.log(isPrime(Number(lines[i])) ? 'Prime' : 'Composite')
	}
}

function isPrime(n) {
	if(n === 1) {
		return false
	}

	for(let i=2; i<n; i++) {
		if(n % i === 0) {
			return false
		}
	}
	return true
}
```
在做這題的時候，我一直卡在輸出的方式，原本以為不可以用 if...else...來取代三元運算子，但仔細尋找以後才發現，原來是我沒有把輸入資料轉成數字，魔鬼藏在細節裡，自己折磨我自己。

## hw4：判斷迴文
在解這題時，發現我居然可以下意識的說出「就是迴圈倒著跑」，但我也還記得第一次知道迴圈可以倒著跑的驚訝心情，沒想到過了幾個禮拜吧，就可以這麼自然的說出這句話，感覺很不可思議。

## hw5：聯誼順序比大小
這題我完全沒有意識到數字範圍會讓 JS Number 出問題，一開始寫了下面錯的程式碼：

```js

function solve(lines) {
    for(let i=1; i<lines.length; i++) {
        let temp = lines[i].split(' ')
        let A = Number(temp[0])
        let B = Number(temp[1])

        if(Number(temp[2]) === 1 && A>B) {
            console.log('A')
        } else console.log('B')

        if(Number(temp[2]) === -1 && A<B) {
            console.log('A')
        } else console.log('B')

        if(A === B) {
            console.log('DRAW')
        }
    }
}
```

想了半天，又寫出這個，但還是不對：

```js
function solve(lines) {
	let n = Number(lines[0])
	for(let i=1; i<=n; i++) {
		console.log(compare(lines[i][0], lines[i][1], lines[i][2]))
	}
}

function compare(n1, n2, p) {
	if(n1 === n2) {
		return 'DRAW'
	}

	if(n1 > n2 && p === 1) {
		return 'A'
	} else if (n1 > n2 && p === -1) {
		return 'B'
	}
}
```
去看了解答，最難理解的是「先假設比大，如果後面是比小，就把 A, B 對調」這一段，後來一行一行跑好像看懂了；接著又學到「字串比大小，比較的是字典序」，所以拿字串去比就會自動比較數字的順序大小了。

既然寫不出來，我決定強迫輸入模仿學習，在複習週的時候再把不熟悉的題目多做幾次。

## 其他心得
1. 看了作業檢討，才知道自己取變數名稱取得不夠有語意，像是判斷是不是的函式，可以寫 isXXX 為開頭，並且用駝峰命名，這樣對所有人都好。在取名的過程中，也學到了很多英文單字。

2. 在字串與數字之間跌倒了好多次，有時候就只剩下這個問題而已，要提醒自己多多注意。

3. 另外有時候在寫 for 迴圈，會忘記 let，’let i=...‘

4. 原來很難看的程式碼就是所有東西都擠在一起，我還是有這個毛病，很想要一次解決所有問題，反而把東西搞得更複雜。

5. 在被 eslint diss 的過程中，我迷失了自己，發覺其實 LIOJ 才是本體啊，傻瓜是我。程式碼是我寫的，eslint 是個文法老師，但是 LIOJ 跑不動，就失去意義了。


