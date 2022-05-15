'use strict';
var scores, roundScore, activePlayer, gamePlaying;

init();


// DOM manipulation


//Event, Event listener $ Event Handler rolling of the dice

document.querySelector('.btn--roll').addEventListener('click', function () {
  if (gamePlaying) {
    
    // 1. random number
    var dice = Math.floor(Math.random() * 6) + 1;
    
    // 2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    // 3. Update the round the score IF the roll number is NOT a 1
    
    if (dice !== 1) {
      // Add the score
      roundScore += dice;
      document.querySelector('#current--' + activePlayer).textContent = roundScore;
    } else {
      // Next player
      nextPlayer();
    }
  } 
});

// hold button

document.querySelector('.btn--hold').addEventListener('click', function () {
  if (gamePlaying) {
    // Add CURRENT score to global score
    scores[activePlayer] += roundScore;

    // update the UI
    document.querySelector('#score--' + activePlayer).textContent = scores[activePlayer];

    //  Check if the player won the game
    if (scores[activePlayer] >= 20) {
    document.querySelector('#name--' + activePlayer).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
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
  document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  // state variable
  gamePlaying = true

  // setting the total-score, current-score to 0
  document.querySelector('.dice').style.display = 'none';

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
  