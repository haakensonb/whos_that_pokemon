//downloads only the pokemon artwork I need from PokeAPI
var https = require('https');
var fs = require('fs');

var myUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other-sprites/official-artwork/';
var fileEnding = '.png';

function downloadFiles(count) {
    if (count === 152){
        return console.log('finished');
    }

    var picNum = String(count);
    var finalUrl = myUrl + picNum + fileEnding
    var file = fs.createWriteStream(picNum+fileEnding);
    var request = https.get(finalUrl, function(response){
        response.pipe(file);
    });
    downloadFiles(count+1)
}
//starts at 1 and ends at 151 so that I only download artwork for generation 1 pokemon
downloadFiles(1);