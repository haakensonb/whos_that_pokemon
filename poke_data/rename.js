//rename sound files
//needs to be fixed cuts off everything after 99
var fs = require('fs');

var dirArray = fs.readdirSync('./poke_cries');


for (var i = 0; i < dirArray.length; i++){
    var num = dirArray[i].split('.')
    var pathName = './poke_cries/' + String(dirArray[i]);
    if (num[0].charAt(0) === '0' && num[0].charAt(1) === '0') {
        fs.renameSync(pathName, './poke_cries/' + num[0].charAt(2) + '.wav');
    } 
    
    if (num[0].charAt(0) === '0' && num[0].charAt(1) !== '0'){
        fs.renameSync(pathName, './poke_cries/' + num[0].charAt(1) + num[0].charAt(2) + '.wav');
    }
    
}