function join(arr, concatStr) {
    if  (arr.length === 0) {
        return ''
    } 
    let ans = arr[0]
    for (var i=1; i<arr.length; i++) {
        ans = ans + concatStr + arr[i]
    }
    return ans
}

function repeat(str, times) {
    let ans = ''
    for (var i=1; i<=times; i++) {
        ans += str
    }
    return ans   
}

console.log(join(['a'], '!'));
console.log(repeat('a', 5));
