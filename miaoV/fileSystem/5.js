var fs = require('fs');
var filename = '2.txt';
/*
* fs.writeFile(file, data[, options], callback)//向一个指定的文件中写入数据，如果该文件不存在，
* 则新建，如果存在则新的内容会覆盖原有的文件内容
* */
// fs.writeFile(filename, 'miaov', function () {
//     console.log(arguments);
// });
// fs.appendFile(filename, '-leo', function () {
//     console.log(arguments);
//
// });
//异步方式
// fs.exists(filename, function (exists) {
//     // console.log(exists);
//     if (!exists) {
//         fs.writeFile(filename, 'miaov', function (err) {
//             if (err) {
//                 console.log('出错了');
//             } else {
//                 console.log('创建新文件成功');
//             }
//         })
//     } else {
//         fs.appendFile(filename, '-leo', function (err) {
//             if (err) {
//                 console.log('新内容追加失败');
//             } else {
//                 console.log('新内容追加成功');
//             }
//         });
//     }
// });

//同步
if (!fs.existsSync(filename)) {
    fs.writeFileSync(filename, 'miaov');
    console.log('创建新文件成功');
} else {
    fs.appendFileSync(filename, '-leo');
    console.log('新内容追加成功');
}


