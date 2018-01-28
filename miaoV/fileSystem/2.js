var fs = require('fs');

// fs.open('1.txt', 'r', function (err, fd) {//异步执行
//     console.log(err);
// });
// console.log('ok');
var fd = fs.openSync('1.txt', 'r');
console.log(fd);