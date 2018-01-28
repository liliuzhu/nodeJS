var fs = require('fs');
var filedir = './miaov/source';
fs.watch(filedir, function (eventType, files) {
    // console.log(eventType + '/' + files);//这里不需要判断file是否有内容
    //只要有一个文件发生了变化，我们就需要对这个文件夹下的所有文件进行读取，然后合并
    fs.readdir(filedir, (err, dataList) => {
        var arr = [];
        dataList.forEach((f) => {
            try {
                var info = fs.statSync(filedir + '/' + f);
                if (info.mode === 33206) {
                    arr.push(filedir + '/' + f);
                }
            } catch (e) {
                // console.error(e.message);
            }
            // fs.stat(filedir + '/' + f, (err, stats) => {
            //     if (err) {
            //         // console.error(err);
            //         console.error(f + 'err');
            //     } else {
            //         if (stats.mode === 33206) {
            //             arr.push(filedir + '/' + f);
            //         }
            //         console.log(f);
            //     }
            // });
        });
        var content = '';
        arr.forEach((f) => {
            try {
                var c = fs.readFileSync(f);
                content += c.toString() + '\n';
            } catch (e) {

            }
        });
        // if(fs.existsSync('./miaov/dist')){
        //
        // }
        fs.mkdir('./miaov/dist', () => {
            fs.writeFile('./miaov/dist/main.js', content, function (err) {
                // console.log(arguments);
            });
        });
    });
});