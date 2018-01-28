/*
* 搭建一个http的服务器，用于处理用户发送的http请求
* 需要使用node提供一个模块 http
* */
//加载一个http模块
var http = require('http');
//通过http模块下的createServer创建并返回一个web服务器对象
var server = http.createServer();
server.timeout = 50000;//超时时间，以毫秒为单位。默认为 120000 (2 分钟)。
server.on('error', (err) => {//监听错误
    console.log(err);
});
server.on('listening', () => {//开始监听
    console.log('listening...');
});
server.on('request', function (req, res) {
    console.log('有客户端请求了');
    // console.log(res);
    // res.setHeader('content-type','text/html;charset=utf-8');
    res.setHeader('miaov', 'leo');
    res.writeHead(200, '', {
        // 'content-type': 'text/plain'
        'content-type': 'text/html;charset=utf-8'
    });
    res.write(`<h1>hello</h1>`);//或者res.end(`<h1>hello</h1>`);
    res.end();

});
server.listen(8080, 'localhost', () => {
    console.log(1);
});

// console.log(server.address());