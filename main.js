// uses strict mode so strings are not coerced, variables are not hoisted, etc... 
'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// the function that will be called by the unit test below
const rockPaperScissors = (hand1, hand2) => {

  hand1 = hand1.toLowerCase().trim();
  hand2 = hand2.toLowerCase().trim();

  const hand1Wins = `Hand one wins!`
  const hand2Wins = `Hand two wins!`
  const hand1InvalidInput = `The input for ${hand1} is not allowed. Please use rock, paper, or scissors for hand 1`
  const hand2InvalidInput = `The input for ${hand2} is not allowed. Please use rock, paper, or scissors for hand 2`
  const tiedHand = `It's a tie!`

  switch (true ) {

    // If Hand 1 or Hand 2 is outside of params
    case (hand1 != 'rock' && hand1 != 'scissors' && hand1 != 'paper'):
      return hand1InvalidInput
      break;
    case (hand2 != 'rock' && hand2 != 'scissors' && hand2 != 'paper'):
      return hand2InvalidInput
      break;

    //If Hand 1 and Hand 2 tie 
    case (hand1 === hand2):
      return tiedHand
      break;

    //If Hand 1 Wins
    case (hand1 == 'rock' && hand2 == 'scissors'):
      return hand1Wins
      break;
    case (hand1 == 'paper' && hand2 == 'rock'):
      return hand1Wins
      break;
    case (hand1 == 'scissors' && hand2 == 'paper'):
      return hand1Wins
      break;

    // If Hand 2 Wins
    case (hand1 == 'scissors' && hand2 == 'rock'):
      return hand2Wins
      break;
    case (hand1 == 'rock' && hand2 == 'paper'):
      return hand2Wins
      break;
    case (hand1 == 'paper' && hand2 == 'scissors'):
      return hand2Wins
      break;

  }

}

// the first function called in the program to get an input from the user
// to run the function use the command: node main.js
// to close it ctrl + C
function getPrompt() {
  rl.question('hand1: ', (answer1) => {
    rl.question('hand2: ', (answer2) => {
      console.log( rockPaperScissors(answer1, answer2) );
      getPrompt();
    });
  });
}

// Unit Tests
// to use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  // most are notes for human eyes to read, but essentially passes in inputs then compares if the function you built returns the expected output.
  describe('#rockPaperScissors()', () => {
    it('should detect a tie', () => {
      assert.equal(rockPaperScissors('rock', 'rock'), "It's a tie!");
      assert.equal(rockPaperScissors('paper', 'paper'), "It's a tie!");
      assert.equal(rockPaperScissors('scissors', 'scissors'), "It's a tie!");
    });
    it('should detect which hand won', () => {
      assert.equal(rockPaperScissors('rock', 'paper'), "Hand two wins!");
      assert.equal(rockPaperScissors('paper', 'scissors'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock', 'scissors'), "Hand one wins!");
    });
    it('should scrub input to ensure lowercase with "trim"ed whitepace', () => {
      assert.equal(rockPaperScissors('rOcK', ' paper '), "Hand two wins!");
      assert.equal(rockPaperScissors('Paper', 'SCISSORS'), "Hand two wins!");
      assert.equal(rockPaperScissors('rock ', 'sCiSsOrs'), "Hand one wins!");
    });
  });
} else {

  // always returns ask the user for another input
  getPrompt();

}
