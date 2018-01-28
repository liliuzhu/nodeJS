/*
* Buffer类
*   用于操作二进制数据流
* */
//new Buffer(size);size [Number] 创建一个Buffer对象，并未这个对象分配一个大小
//当我们为一个Buffer对象分配空间大小以后，其长度是固定的，不能更改
// var bf = new Buffer(5);//废弃的: 使用 Buffer.alloc() 代替（或 Buffer.allocUnsafe()）
/*
var bf = Buffer.alloc(5, 10, 'utf8');
console.log(bf);
bf[1] = 2;
console.log(bf);*/


//new Buffer(array);//废弃的: 使用 Buffer.from(array) 代替
// var bf = new Buffer([1, 2, 3]);
// var bf = Buffer.from([1, 2, 3]);
// console.log(bf);
// bf[10] = 10;
// console.log(bf);

//new Buffer(string[, encoding])//废弃的: 使用 Buffer.from(string[, encoding]) 代替。
//
// var bf = new Buffer('miaov', 'utf8');
// console.log(bf);
// for (var i = 0; i < bf.length; i++) {
//     console.log(bf[i].toString(16));
//     console.log(String.fromCharCode(bf[i]));
//     // console.log(String.fromCodePoint(bf[i]));
// }

/*var str1 = 'miaov';
var bf1 = new Buffer(str1);
console.log(str1.length);
console.log(bf1.length);

var str2 = '秒味';
var bf2 = new Buffer(str2);
console.log(str2.length);
console.log(bf2.length);*/









