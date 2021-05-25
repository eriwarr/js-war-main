//Creates a prompt to process the entered name of player 1 & 2//
const player1 = prompt('Enter your name player 1');
const player2 = prompt('Enter your name player 2');

//Player constructor has a deck of cards//
function Player(name) {
  this.name = name;
  this.hand = [];
}

//Deck constructor is an empty array//
function Deck () {
  this.deck = [];
}

//Card constructor//
function Card(number) {
  this.number = number;
}

//Constuctor prototype creates a 52 card deck//
Deck.prototype.createDeck = function() {
  for (var i = 2; i <= 14; i++) {
    for (var x = 0; x < 4; x++) {
      aCard = new Card(i);
      this.deck.push(aCard);
    }
  }
}

//Function shuffles cards//
function shuffle(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var x = deck[i];
    deck[i] = deck[j];
    deck[j] = x;
  }
  return deck;
}


//Function deals half of the cards to each player//
Deck.prototype.dealCards = function() {
  for (i = 0; i < this.deck.length; i++) {
    if (i % 2) {
      game.player1.hand.push(this.deck[i]);
    } else {
      game.player2.hand.push(this.deck[i]);
    }
  }
};

//Game constructor//
function Game() {

};

Game.prototype.start = function() {
  this.player1 = new Player({player1});
  this.player2 = new Player({player2});
  var gameDeck = new Deck();
  gameDeck.createDeck();
  shuffle(gameDeck.deck);
  gameDeck.dealCards();
  this.pot= [];



  while(this.player1.hand.length > 0 && this.player2.hand.length > 0) {
    this.compareCard();

  }

}


Game.prototype.compareCard = function(){
  var player1Card = game.player1.hand[game.player1.hand.length - 1];
  var player2Card = game.player2.hand[game.player2.hand.length - 1];



  if (player1Card.number > player2Card.number) {
    console.log(`${player1} has a ${player1Card.number}, while ${player2} has a ${player2Card.number} ${player1} wins!`)
    //Adds player's 2 card to the front of player1's deck//
    game.player1.hand.unshift(player2Card);
    //Removes the last card from player1's deck//
    x = game.player1.hand.pop();
    //Adds the last card from player1's deck to the front//
    game.player1.hand.unshift(x);
    //Removes the card removes the card from player2's deck//
    game.player2.hand.pop();
  } else if (player1Card.number < player2Card.number) {
    console.log(`${player2} has a ${player2Card.number}, while ${player1} has a ${player1Card.number} ${player2} wins!`)
    game.player2.hand.unshift(player1Card);
    x = game.player2.hand.pop();
    game.player2.hand.unshift(x);
    game.player1.hand.pop();

  } else if (player1Card.number === player2Card.number) {
    console.log('its a tie')
    for(i = 0; i < 3; i++){
    x = game.player1.hand.pop();
    y = game.player2.hand.pop();
      game.pot.push(x);
      game.pot.push(y);

    }
    if(game.pot[4].number > game.pot[5].number){
      console.log('player1 should take it');
      game.player1.hand.push(game.pot[0], game.pot[1], game.pot[2], game.pot[3], game.pot[4], game.pot[5]);
      game.pot = [];
    } else if(game.pot[4].number < game.pot[5].number) {
      console.log('player2 should take it');
      game.player2.hand.push(game.pot[0], game.pot[1], game.pot[2], game.pot[3], game.pot[4], game.pot[5]);
      game.pot = [];
    } else if (game.pot[4].number === game.pot[5].number){
        console.log('tie again')
    }

  }

}

game = new Game();
game.start();

console.log(game.player1.hand.length);
console.log(game.player2.hand.length);



// // Mady's Solution//
//
// (function() {
//   'use strict'
//
// const Card = function({value, suit} = {}) {
//   this.value = value;
//   this.suit = suit;
// }
//
//
// const Deck = function(){
//   this.cards = [];
//   this.suits = ['clubs', 'hearts', 'spades', 'diamonds']
//
//   for(let i = 0; i < 4; i++){
//     for(let j = 2; j <= 14; j++) {
//       this.cards.push(new Card({suit: this.suits[i], value: j}));
//     }
//   }
// }
//
// const Player = function({name}){
//   this.name = name;
//   this.hand = [];
//   this.cardCount = 0;
//   this.draw = null;
//
// }
//
// const Game = function() {
//   const player1 = prompt(`Enter player one's name: `);
//   const player2 = prompt(`Enter player two's name: `);
//   this.player1 = new Player({name: player1});
//   this.player2 = new Player({name: player2});
//   this.deck = new Deck();
//   this.pot = [];
//
// }
//
// Game.prototype.shuffle = function(deck) {
//   let i = deck.length, j, temp;
//   while(i--){
//     j = Math.floor(Math.random() * (i + 1));
//     temp = deck[i];
//     deck[i] = deck[j];
//     deck[j] = temp;
//   }
// }
//
// Game.prototype.deal = function(){
//   this.player1.hand = this.deck.cards.filter(function(item, index){
//     return !(index % 2);
//   });
//
//   this.player2.hand = this.deck.cards.filter(function(item, index) {
//     return index % 2;
//   });
// }
//
// Game.prototype.draw = function () {
//   const player1Card = this.player1.hand.shift();
//   const player2Card = this.player2.hand.shift();
//
//   this.player1.cardCount -= 1;
//   this.player2.cardCount -= 1;
//
//   if(!this.player1.cardCount){
//     this.shuffle(this.player1.hand);
//   }
//   if(!this.player2.cardCount) {
//     this.shuffle(this.player2.hand);
//   }
//
//   this.player1.draw = player1Card;
//   this.player2.draw = player2Card;
//
//   this.pot = [player1Card, player1Card, ...this.pot];
//   console.log(`${this.player1.name} draws a ${this.deck.value}`);
//   console.log(`${this.player2.name} draws a ${this.deck.value}`);
// }
//
// Game.prototype.play = function() {
//   this.shuffle(this.deck.cards);
//   this.deal();
//
//   console.log('Lets play War!');
//
//
//   game.draw();
//   //while loop or control flow that continues drawing if the player has cards//
// }
//
//
//
// const game = new Game();
// game.play();
// })();
