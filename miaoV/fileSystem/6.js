var fs = require('fs');
//读取文件
/*
fs.readFile('2.txt', function (err, data) {
    // console.log(arguments);
    if (err) {
        console.log('文件读取失败');
    } else {
        console.log(data.toString());
    }
});*/

//删除一个文件
/*fs.unlink('2.txt', function (err) {
    if (err) {
        console.log('删除失败');
    } else {
        console.log('删除成功');
    }
});*/

//重命名一个文件
fs.rename('2.txt', '2.new.txt', function () {
    console.log(arguments);
});


//获取一个文件的状态信息即属性fs.stat(path, callback) 回调有两个参数 (err, stats) 其中 stats 是一个 fs.Stats 对象。
// fs.stat('2.new.txt', function () {
//     console.log(arguments);
// });
