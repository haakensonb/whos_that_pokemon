//kind of hacky
//Turns pokemon.csv.txt into data.js which is just an array of objects for example
// {id: 1, name: "bulbasaur", artUrl: 'filepath', cry: 'filepath', description: 'blah blah'}

var fs = require('fs');
var pokeContents = fs.readFileSync('pokemon.csv.txt', 'utf8');
var descContents = fs.readFileSync('pokemon_descriptions.csv.txt', 'utf8');

var dataArray = [];
var pokeUrl = './poke_data/poke_art/';
var cryUrl = './poke_data/poke_cries/';
var picExt = '.png';
var cryExt = '.wav';

pokeContents = pokeContents.split('\n').splice(1);
for (var i = 0; i < pokeContents.length; i++){
    pokeContents[i] = pokeContents[i].split(',');
}

//regex needs fixing, cuts some descriptions short at ',' inside quotes
descContents = descContents.split('"\n')
for (var i = 0; i < descContents.length; i++){
    descContents[i] = descContents[i].split(',');
    if (descContents[i][3]){
        descContents[i][3] = descContents[i][3].replace('"', '').replace(/\n/g, ' ').replace(/\f/g, ' ');
    }
}

for (var i = 0; i < pokeContents.length; i++){
    var contentNum = Number(pokeContents[i][0]);
    if (contentNum <= 151 && contentNum > 0) {
        dataArray.push({id: contentNum, name: pokeContents[i][1], artUrl: pokeUrl + contentNum + picExt});
    }
}
//dont know why its leaving out number 1, need to look when not so tired, will just add manually for now
for (var i = 0; i < descContents.length; i++){
    for (var j = 0; j < dataArray.length; j++){
        var descNum = Number(descContents[i][0]);
        if (descNum === dataArray[j].id && descContents[i][1] === '1' && descContents[i][2] === '9'){
            dataArray[j].description = descContents[i][3];
            dataArray[j].cry = cryUrl + String(dataArray[j].id) + cryExt;
        }
    }
}

fs.writeFileSync('./data.js', 'var data = ' + JSON.stringify(dataArray, null, 4));