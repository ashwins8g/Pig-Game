var score, activePlayer, roundScore, gamePlaying, lastDice;

function initialize(){
    
    score = [0,0];
    activePlayer = 0;
    roundScore = 0;
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('winner');   


    gamePlaying = true;

};

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
    
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
}; 

initialize();


//Event of dice roll
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        
        //1. throw a random number b/w 1 to 6
        var dice1 = Math.floor(Math.random() * 6) +1;
        var dice2 = Math.floor(Math.random() * 6) +1;
        
        //2. display the dice image
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        
        
        //3. update the current score if dice does not roll 1
        /*
        if(dice === 6 && lastDice === 6){
            
            //Player loses all his score
            score[activePlayer] = 0;
            document.getElementById('current-' + activePlayer).textContent = 0;
            document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
            nextPlayer();
            
        }
        */
        if(dice1 !== 1 && dice2 !==1){
            
            //Add score
            roundScore += (dice1 + dice2);
            //document.querySelector('#current-' + activePlayer).textContent = roundScore;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        
        else
            nextPlayer();
        
        lastDice = dice;
    }
});


// Event of pressing hold
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        
        //1. Add current score to global score
        score[activePlayer] += roundScore;
        
        //2. Update the UI
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        //type coercion where 0, null, "" are trwated as false.
        if(input){
            winningScore =input;
        } else
            winningScore = 100;
        
        //2. Check if player won
        if(score[activePlayer] >= winningScore){
            console.log('Player ' + activePlayer + ' wins!');
            
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            gamePlaying = false;
        }
        
        else
            nextPlayer();
    }
});


document.querySelector('.btn-new').addEventListener('click', initialize);