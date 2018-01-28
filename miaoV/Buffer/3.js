var str = 'miaov';
// console.log(new Buffer(str));
var bf = new Buffer(str);
console.log(bf.toString());
console.log(bf.toString('utf8', 1, 3));

var bf2 = new Buffer('秒味');
console.log(bf2);
console.log(bf2.toString('utf8', 1));

console.log(bf.toJSON());



