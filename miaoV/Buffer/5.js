/*
* 类方法 静态方法
* */
// Buffer.isEncoding(encoding)//如果 encoding 是一个支持的字符编码则返回 true，否则返回 false 。
/*console.log(Buffer.isEncoding('utf8'));
console.log(Buffer.isEncoding('gbk'));
console.log(Buffer.isEncoding('hex'));*/

//Buffer.isBuffer(obj)//如果 obj 是一个 Buffer 则返回 true ，否则返回 false 。
/*var arr = [1, 2, 3];
var bf = new Buffer(10);
console.log(Buffer.isBuffer(arr));
console.log(Buffer.isBuffer(bf));*/


//Buffer.byteLength(string[, encoding])//返回一个字符串的实际字节长度。 这与 String.prototype.length 不同，因为那返回字符串的字符数。
/*var str1 = 'miaov';
console.log(str1.length);
console.log(Buffer.byteLength(str1));

var str2 = '秒味';
console.log(str2.length);
console.log(Buffer.byteLength(str2));
console.log(Buffer.byteLength(str2, 'ascii'));
console.log(Buffer.byteLength(str2, 'utf8'));*/


//Buffer.concat(list[, totalLength])//返回一个合并了 list 中所有 Buffer 实例的新建的 Buffer 。
/*var str1 = 'miaov';
var str2 = '秒味';
var list = [new Buffer(str1), new Buffer(str2)];
console.log(list);
// var bf = Buffer.concat(list);
var bf = Buffer.concat(list, 11);
console.log(bf);*/


process.stdout.write('请输入内容：');
// process.stdin.resume();
process.stdin.on('data', (chunk) => {
    console.log(chunk);//输入的数据为Buffer类型
    console.log(chunk.toString());
});


