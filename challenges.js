'use strict';
var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

// DOM manipulation


//Event, Event listener $ Event Handler rolling of the dice

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (gamePlaying) {
    
    // 1. random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    
    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    document.getElementById('dice--1').style.display = 'block';
    document.getElementById('dice--2').style.display = 'block';

    document.getElementById('dice--1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice--2').src = 'dice-' + dice2 + '.png';
    // 3. Update the round the score IF the roll number is NOT a 1
    
     if (dice1  !== 1 && dice2 !== 1) {
      // Add the score
      roundScore += dice1 + dice2;
      document.querySelector('#current--' + activePlayer).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
    
    /*
    if (dice === 6 && lastDice == 6) {
      // player looses score
      scores[activePlayer] = 0

      document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer]
      nextPlayer()
    } else   if (dice !== 1) {
      // Add the score
      roundScore += dice;
      document.querySelector('#current--' + activePlayer).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }

     lastDice = dice;
     */

    
  } 
});

// hold button

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add CURRENT score to global score
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final--scores').value
    var winningScore

    // undefined, zero, null, or "" are COERCED to false
    // Anything else is COERCED to true
    if (input) {
       winningScore = input;
    } else {
      winningScore = 100
    }

    //  Check if the player won the game
    if (scores[activePlayer] >= winningScore) {
    document.querySelector('#name--' + activePlayer).textContent = 'Winner!';

    document.getElementById('dice--1').style.display = 'none';
    document.getElementById('dice--2').style.display = 'none';
    document.querySelector('.player--' + activePlayer).classList.add('player--winner');
    document.querySelector('.player--' + activePlayer).classList.remove('player--active');
    gamePlaying = false;

    // nextPlayer();
  } else {

    // Next player
    nextPlayer();
  }
  }
  
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  // to set the current score to 0
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';

  // to change the active bg
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');

  // document.querySelector('.player--0').classList.remove('player--active');
  // document.querySelector('.player--1').classList.add('player--active');
  document.getElementById('dice--1').style.display = 'none';
  document.getElementById('dice--2').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  // state variable
  gamePlaying = true

  // setting the total-score, current-score to 0
  document.getElementById('dice--1').style.display = 'none';
  document.getElementById('dice--2').style.display = 'none';

  document.getElementById('score--0').textContent = '0';
  document.getElementById('score--1').textContent = '0';
  document.getElementById('current--0').textContent = '0';
  document.getElementById('current--1').textContent = '0';

  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');

}

// document.querySelector('#current--' + activePlayer).textContent = dice;
// document.querySelector('#current--' + activePlayer).innerHTML =
//   '<em>' + dice + '</em>';
  