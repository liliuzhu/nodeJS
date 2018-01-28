var fs = require('fs');
fs.open('1.txt', 'r', function (err, fd) {
    if (err) {
        console.log('文件读取失败');
    } else {
        /*
        * fs.read(fd,buffer,offset,length,position,callback)
        * fd:通过open方式成功打开一个文件返回的标号
        * buffer:buffer对象
        * offset:新的内容添加到buffer中内容的起始位置
        * length:添加到buffer中内容的长度  是一个整数，指定要读取的字节数。
        * position:读取的文件中的起始位置
        * callback：回调
        *   err
        *   length:buffer的长度
        * */
        var bf1 = new Buffer(10);
        console.log(bf1);
        fs.read(fd, bf1, 0, 4, null, function (err, length, newBf) {//newBf===bf1
            console.log(err, length, newBf);
        });
        //fs.readSync(fd, buffer, offset, length, position)//fs.read() 的同步版本。 返回 bytesRead 的数量。
    }
});