var imgEl = document.getElementById('poke-img');
var choices = document.querySelectorAll('.choice');
var infoEl = document.getElementById('info-text');
var hintEl = document.getElementById("hint-area");


var app = {
    currentPokemon: null,
    shuffledChoices: null,
    round: 0,
    getRandomPokemon: function() {
        let length = data.length;
        return Math.floor(Math.random() * length);
    },
    getCurrentPokemon: function() {
        this.currentPokemon = data[this.getRandomPokemon()];
    },
    getOtherPokemon: function() {
        let tempArray = [];
        for(let i = 0; i <= 2; i++){
            tempArray.push(data[this.getRandomPokemon()]);
        }
        tempArray.push(this.currentPokemon);
        this.shuffledChoices = this.shuffle(tempArray);
    },
    //Fisher-Yates Shuffle
    shuffle: function (array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
},
    newRound: function() {
        var roundEl = document.getElementById('round');
        this.round += 1;
        roundEl.innerHTML = 'Round: ' + app.round;
        hintEl.innerHTML = '';
        app.getCurrentPokemon();
        app.getOtherPokemon();
        app.makeButtonChoices();
        imgEl.classList.add("silhouette");
        imgEl.src = app.currentPokemon.artUrl;
    },
    makeButtonChoices: function() {
        for (let i = 0; i < this.shuffledChoices.length; i++){
            choices[i].innerHTML = this.shuffledChoices[i].name;
        }
    },
    addChoiceEvents: function(){
        for (let i = 0; i < this.shuffledChoices.length; i++){
            choices[i].addEventListener('click', function(event){
                app.checkClick(event);
            });
        }
    },
    addHintEvent: function() {
        var hintButton = document.getElementById("hintButton");
        hintButton.addEventListener('click', function(){
            app.giveHint();
        });
    },
    giveHint: function(){
        hintEl.innerHTML = this.currentPokemon.description + '...';
    },
    checkClick: function(event) {
        if (event.target.innerHTML === this.currentPokemon.name){
            infoEl.innerHTML = "Correct!";
            imgEl.classList.remove('silhouette');
            var audio = new Audio(this.currentPokemon.cry);
            audio.volume = 0.3;
            audio.play();
            var countdown = 3;
            var myInterval = setInterval(function(){
                if (countdown === 1){
                    clearInterval(myInterval);
                }
                infoEl.innerHTML = "New round will start in " + countdown
                countdown -= 1;
            }, 1000);
            setTimeout(function(){
                infoEl.innerHTML = '';
                app.newRound();
            }, 4000);
        }
        else {
            infoEl.innerHTML = "Sorry that's wrong";
        }
    },
};

document.addEventListener('DOMContentLoaded', function() {
    app.newRound();
    app.addChoiceEvents();
    app.addHintEvent();
})