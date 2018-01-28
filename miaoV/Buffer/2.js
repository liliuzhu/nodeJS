/*
* buf.write(string[, offset[, length]][, encoding]);//据 encoding 的字符编码写入 string 到 buf 中的 offset 位置。 length 参数是写入的字节数。 如果 buf 没有足够的空间保存整个字符串，则只会写入 string 的一部分。 只部分解码的字符不会被写入。
*           （要写入的字符串，从buffer对象中的几位开始写入，写入的字符串的长度，写入的字符串的编码）
* */
var str = 'miaov';
console.log(new Buffer(str));
var bf = new Buffer(5);
/*
bf.write(str);
console.log(bf);*/
// bf.write(str, 1);
bf.write(str, 1, 3);
console.log(bf);
