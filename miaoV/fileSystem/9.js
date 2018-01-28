//前端自动化构建

var projectData = {
    name: 'miaov',
    fileData: [
        {name: 'css', type: 'dir'},
        {name: 'js', type: 'dir'},
        {name: 'source', type: 'dir'},
        {name: 'images', type: 'dir'},
        {
            name: 'index.html', type: 'file',
            content:
                `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>title</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> 
    </head>
    <body>
    <h1>Hello</h1>
    </body>          
</html>`
        },
    ]
};

var fs = require('fs');
if (projectData.name) {
    fs.mkdirSync(projectData.name);
    var fileData = projectData.fileData;
    if (fileData && fileData.forEach) {
        fileData.forEach((f) => {
            f.path = projectData.name + '/' + f.name;
            f.content = f.content || '';
            switch (f.type) {
                case 'dir':
                    fs.mkdirSync(f.path);
                    break;
                case 'file':
                    fs.writeFileSync(f.path, f.content, 'utf8');
                    break;
                default:
                    break;
            }
        });
    }
}