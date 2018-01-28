var fs = require('fs');
//监控文件变化
var filename = '2.new.txt';
fs.watch(filename, function (eventType, fileName) {
    console.log(eventType);
    if (fileName) {
        console.log(fileName + '发生了变化');
    } else {
        console.log('...');
    }
});