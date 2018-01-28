var http = require('http');
var url = require('url');
var server = http.createServer();
server.on('request', function (req, res) {
    //req.url:访问路径
    //?后面的部分query string
    // console.log(req.url);
    var urlStr = url.parse(req.url);
    // console.log(urlStr);
    // console.log(req.url);
    switch (urlStr.pathname) {
        case '/':
            res.writeHead(200, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>这是首页</h1>');
            break;
        case '/user':
            res.writeHead(200, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>个人中心</h1>');
            break;
        default:
            res.writeHead(404, {
                'content-type': 'text/html;charset=utf-8'
            });
            res.end('<h1>页面被LEO吃掉了</h1>');
            break;
    }
});
server.listen(8080, 'localhost', () => {

});