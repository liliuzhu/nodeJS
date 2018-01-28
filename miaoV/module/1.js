/*
* 每一个文件就是一个模块
* 每个模块都有自己的作用域
*
* 我们用var来声明一个变量，他并不是全局的，而是属于当前模块下
* */
/*
var a = 100;
global.a = 200;
console.log(a);
console.log(global.a);*/

//__filename  :当前文件被解析过后的绝对路径
// console.log(__filename);
// console.log(__dirname);

/*
* 模块加载系统
* require('模块')
* */

/*
* 模块加载机制
*   路径
*       相对路径
*       绝对路径
* */
// require('./2.js');
// require(__dirname + '/2.js');
// require('2.js');//加载node中的核心模块，或者是node_modules

/*
* 1.首先按照加载的模块的文件名称进行查找
* 2.如果没有找到，则会在模版文件名称后加上.js多的后缀，进行查找
* 3.如果还没有找到，则会在文件名称后加上.json的后缀，进行查找
* 4.如果还没有，则会在文件的名称后加上.node的后缀，进行查找
*
* 文件名称 -> .js->.json->.node
* */
require('./3');