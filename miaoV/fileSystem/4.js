var fs = require('fs');
fs.open('1.txt', 'r+', function (err, fd) {
    //当我们要对打开的文件进行读写操作的时候，打开文件的模式应该是  读写 方式
    /*
    * fs.write(fd, buffer[, offset[, length[, position]]], callback)
    * fd:打开的文件
    * buffer:要写入的数据
    * offset：buffer对象中要写入的数据的其实位置
    * length：要写入的buffer数据的长度
    * position：fd中的起始位置
    * callBack：回调
    * */
    if (err) {
        console.log('打开文件失败');
    } else {
        /*var bf = new Buffer('123');
        fs.write(fd, bf, 0, 3, 5, function () {
            console.log(arguments);
        });*/
        /*
        * fs.write(fd, string[, position[, encoding]], callback)
        * 写入 string 到 fd 指定的文件。 如果 string 不是一个字符串，则该值将被强制转换为一个字符串。
position 指向从文件开始写入数据的位置的偏移量。 如果 typeof position !== 'number'，则数据从当前位置写入。详见 pwrite(2)。
encoding 是期望的字符串编码。
    * */
        fs.write(fd, '1234', 5, 'utf8', function () {
            console.log(arguments);
        });
        fs.close(fd, function () {
            console.log(arguments);
        })
    }
});