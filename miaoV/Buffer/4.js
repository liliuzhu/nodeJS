//注意node中的修改slice结果会影响原字符串
//buf.slice()//返回一个指向相同原始内存的新建的 Buffer，但做了偏移且通过 start 和 end 索引进行裁剪。
var bf = new Buffer('miaov');
console.log(bf);
// var bf2 = bf.slice();
// console.log(bf2);

//buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])
/*target <Buffer> | <Uint8Array> 要拷贝进的 Buffer 或 Uint8Array。
targetStart <integer> target 中开始拷贝进的偏移量。 默认: 0
sourceStart <integer> buf 中开始拷贝的偏移量。 当 targetStart 为 undefined 时忽略。 默认: 0
sourceEnd <integer> buf 中结束拷贝的偏移量（不包含）。 当 sourceStart 为 undefined 时忽略。 默认: buf.length
返回: <integer> 被拷贝的字节数。*/
// var bf3 = bf.slice(2);
// console.log(bf3);
// bf3[0] = 2;
// console.log(bf3);
// console.log(bf);

var bf4 = new Buffer(10);
/*bf.copy(bf4);
bf4[0] = 2;
console.log(bf4);
console.log(bf);*/

bf.copy(bf4, 1, 2, 4);
console.log(bf4);

