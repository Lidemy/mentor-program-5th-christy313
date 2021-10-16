### hw4：What is this?

```js
const obj = {
  value: 1,
  hello: function() {
    console.log(this.value)
  },
  inner: {
    value: 2,
    hello: function() {
      console.log(this.value)
    }
  }
}
  
const obj2 = obj.inner
const hello = obj.inner.hello
obj.inner.hello() // ??
obj2.hello() // ??
hello() // ??
```

#### 1. 以下會依序輸出

```
obj.inner.hello() // 2
obj2.hello() // 2
hello() // undefined
```

#### 2. 解釋

#### 以「函式怎麼被呼叫」這個觀點來看 `obj.inner.hello()`

在 obj 物件中的 inner 裡，有個叫 hello 的函式；這裡的 this 就是 inner 本身 （也就是 `{ value: 2, hello: [Function: hello] }`），因此取 `this.value` 就會是 2

#### 延續同樣觀點來看 `obj2.hello()`

`const obj2 = obj.inner`，這裡把 `obj.inner` 賦值給 obj2，因此 obj2 就等於是下面的物件（其實跟上面的那個 `{ value: 2, hello: [Function: hello] }` 是一樣的）

```
{
  value: 2,
  hello: function() {
    console.log(this.value)
  }
}
```

由此可知，這裡的 this 就是 inner 本身，因此要取 `this.value` 就會是 2

#### 最後一行 `hello()`

`const hello = obj.inner.hello` 這裡的 hello 被賦值了一個函式如下：

```
function() {
  console.log(this.value)
}
```

脫離了物件，在函式中的 this 為預設值。在非嚴格模式下，若是在 node.js 裡為 global，在瀏覽器為 window；而這裡求的是 `global.value` 或是 `window.value`，所以會輸出 `undefined`。