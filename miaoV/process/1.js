/*
* process :全局对象
* */
// console.log(process);
// console.log(global.process);
// console.log(process.argv);//一组包含命令行参数deep数组
// console.log(process.execPath);//开启当前进程的的绝对路径
// console.log(process.env);//返回用户环境信息
// console.log(process.version);//属性返回Node.js的版本信息。
// console.log(process.versions);//返回一个对象，此对象列出了Node.js和其依赖的版本信息
// console.log(process.pid);//属性返回进程的PID。
// setInterval(() => {
// }, 5000);
// console.log(process.title);//用于获取或设置当前进程在 ps 命令中显示的进程名字
// console.log(process.arch);//返回一个标识Node.js在其上运行的处理器架构的字符串  例如 'arm', 'ia32', or 'x64'.
// console.log(process.platform);//返回字符串，标识Node.js进程运行其上的操作系统平台。  例如'darwin', 'freebsd', 'linux', 'sunos' 或 'win32'
// console.log(process.cwd());//返回 Node.js 进程当前工作的目录
//process.chdir('/tmp')//变更Node.js进程的当前工作目录，如果变更目录失败会抛出异常
// console.log(`Starting directory: ${process.cwd()}`);
// try {
//     process.chdir('/tmp');
//     console.log(`New directory: ${process.cwd()}`);
// } catch (err) {
//     console.error(`chdir: ${err}`);
//
// }
// console.log(process.memoryUsage());//返回Node.js进程的内存使用情况的对象，该对象每个属性值的单位为字节。
// process.exit([code]);//方法以结束状态码code指示Node.js同步终止进程。 如果code未提供，此exit方法要么使用'success' 状态码 0
// setInterval(() => {
//     process.exit(1);
// }, 5000);

//process.stdout //标准输出流
// process.stdout.write('aaa')
// function Log(data) {
//     process.stdout.write(data);
// }
//
// Log('你好');
//process.stdin //标准输出流
process.stdin.setEncoding('utf8');//编码
//旧模式下默认情况下，输入流是关闭的，要监听处理输入流数据，首先要开启输入流
process.stdin.resume();

//用于监听用户的输入数据
// process.stdin.on('data', (chunk) => {
// console.log(process.stdin.read());
//     console.log('用户输入了：' + chunk);
// });
var a;
var b;
process.stdout.write(`请输入a的值：`);
process.stdin.on('data', (chunk) => {
    if (!a) {
        a = Number(chunk);
        process.stdout.write(`请输入b的值：`);
    } else {
        b = Number(chunk);
        console.log(`${a} + ${b} = ${a + b}`);
    }
});













