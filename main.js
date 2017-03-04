var imgEl = document.getElementById('poke-img');
var choices = document.querySelectorAll('.choice');
var infoEl = document.getElementById('info-text');
var hintEl = document.getElementById("hint-area");
var roundEl = document.getElementById('round');
var streakEl = document.getElementById('streak');
var volumeEl = document.getElementById('volume');
var correctClickCount = 0;

//clonedData is to be mutated to keep track of used pokemon while data is simply for choices
var clonedData = data.slice(0);

var app = {
    currentPokemon: null,
    shuffledChoices: null,
    round: 0,
    streak: 0,
    sound: true,
    getRandomPokemon: function(array) {
        let length = array.length;
        return Math.floor(Math.random() * length);
    },
    
    getCurrentPokemon: function() {
        //splice returns array so need to add [0]
        let usedPoke = clonedData.splice(this.getRandomPokemon(clonedData),1)[0];
        this.currentPokemon = usedPoke;
    },
    getOtherPokemon: function() {
        let tempArray = [];
        for(let i = 0; i <= 2; i++){
            tempArray.push(data[this.getRandomPokemon(data)]);
        }
        tempArray.push(this.currentPokemon);
        tempArray = this.removeDuplicates(tempArray)
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
},  //not really a good solution but should reduce odds of getting duplicate choices
    removeDuplicates: function(array) {
        var filtered = array.filter(function(item, index){
            return index === array.indexOf(item);
        });
        for (let i = filtered.length; i < 4; i++){
            filtered.push(data[this.getRandomPokemon(data)]);
        }
        return filtered;
    },
    newRound: function() {
        correctClickCount = 0;
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
        //to prevent spamming correct answer
        if (correctClickCount !== 0){
            return
        }

        if (event.target.innerHTML === this.currentPokemon.name){
            infoEl.innerHTML = "Correct!";
            imgEl.classList.remove('silhouette');
            this.playSound();
            correctClickCount += 1;

            //if player gets pokemon correct and that is the only pokemon left, they win
            if (clonedData.length === 1){
                return this.win();
            }

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
                app.streak += 1;
                streakEl.innerHTML = 'Streak: ' + app.streak;
                app.newRound();
            }, 4000);
        }
        else {
            infoEl.innerHTML = "Sorry that's wrong. You lost your streak";
            this.streak = 0;
            streakEl.innerHTML = 'Streak: ' + this.streak;
        }
    },
    win: function() {
        this.round += 1;
        roundEl.innerHTML = 'Round: ' + app.round;
        infoEl.innerHTML = "WOW you won with a final streak of " + this.streak + "! You must know all the first gen pokemon! Refresh to play again.";
    },
    addVolumeHandler: function() {
        volumeEl.addEventListener('click', function(event){
            if (event.target.className === 'icon-volume-up'){
                app.sound = false;
                event.target.classList.remove('icon-volume-up');
                event.target.classList.add('icon-volume-off');
            } else {
                app.sound = true;
                event.target.classList.remove('icon-volume-off');
                event.target.classList.add('icon-volume-up');
            }
        });
    },
    playSound: function() {
        if (this.sound){
            var audio = new Audio(this.currentPokemon.cry);
            audio.volume = 0.25;
            audio.play();
        }
    },
};

document.addEventListener('DOMContentLoaded', function() {
    app.newRound();
    app.addChoiceEvents();
    app.addHintEvent();
    app.addVolumeHandler();
})