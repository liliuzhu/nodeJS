var fs = require('fs');
//操作文件夹
/*
*fs.mkdir(path[, mode], callback)//新建文件夹
* */
/*fs.mkdir('./1', function () {
    console.log(arguments);
});*/
//删除文件夹
/*
* fs.rmdir(path, callback)//删除文件夹
* */
/*fs.rmdir('./1', function () {
    console.log(arguments);
});*/

//读取文件夹
/*
* fs.readdir(path[, options], callback)//读取一个目录的内容。 回调有两个参数 (err, files)，其中 files 是目录中不包括 '.' 和 '..' 的文件名的数组
* */
fs.readdir('../FileSystem', function (err, fileList) {
    // console.log(arguments);
    fileList.forEach((f) => {
        fs.stat(f, function (err, stats) {
            // console.log(arguments);
            switch (stats.mode) {
                case 16822:
                    console.log('[文件夹]' + f);
                    break;
                case 33206:
                    console.log('[文件]' + f);
                    break;
                default:
                    console.log('[其他类型]' + f);
                    break;
            }
        });
    });
});





