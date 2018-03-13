let http = require('http');
let util = require('util');
http.get('http://www.imooc.com/index/getstarlist', function (res) {
    let data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
        let result = JSON.parse(data);
        // console.log(data);
        // console.log("result:" + result.msg);
        console.log(result);
        // console.log(util.inspect(result));
    });
}).on('error', (e) => {
    console.error(`错误: ${e.message}`);
});
