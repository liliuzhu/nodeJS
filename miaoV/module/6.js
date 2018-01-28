/*
* __filename:返回当前模块文件的解析后的绝对路径，该属性其实并非全局的，而是模块作用局下的
* __dirname:返回当前文件模块文件所在目录解析后的绝对路径，该属性也不是全局的，而是模块作用域下的
* */

// var d = new Date();
// console.log(d);
// var arr = new Array(1, 2, 3);
// console.log(arr);
setInterval(() => {
    var d = new Date();
    console.log(d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日 ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds());
}, 1000);