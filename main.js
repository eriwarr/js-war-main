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
      let aCard = new Card(i);
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
  for (var i = 0; i < this.deck.length; i++) {
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


// While the players have cards, run the compareCard function//
  while(this.player1.hand.length > 0 && this.player2.hand.length > 0) {
    this.compareCard();

  }

}

//compareCard function evaluates each card and determines who wins the round//
Game.prototype.compareCard = function(){
  var player1Card = game.player1.hand[game.player1.hand.length - 1];
  var player2Card = game.player2.hand[game.player2.hand.length - 1];



  if (player1Card.number > player2Card.number) {
    console.log(`${player1} threw out a ${player1Card.number}. ${player2} threw out a ${player2Card.number}. ${player1} takes the cards. ${player1} has ${game.player1.hand.length} cards.`);
    //Adds player2's card to the front of player1's deck//
    game.player1.hand.unshift(player2Card);
    //Removes the last card from player1's deck//
    var x = game.player1.hand.pop();
    //Adds the last card from player1's deck to the front//
    game.player1.hand.unshift(x);
    //Removes the card removes the card from player2's deck//
    game.player2.hand.pop();
  } else if (player1Card.number < player2Card.number) {
    console.log(`${player2} threw out a ${player2Card.number}. ${player1} threw out a ${player1Card.number}. ${player2} takes the cards. ${player2} has ${game.player2.hand.length} cards.`);
    game.player2.hand.unshift(player1Card);
    var x = game.player2.hand.pop();
    game.player2.hand.unshift(x);
    game.player1.hand.pop();

  } else if (player1Card.number === player2Card.number) {
    console.log(`IT'S WAR BABY!`)
    for(var i = 0; i < 4; i++){
    var x = game.player1.hand.pop();
    var y = game.player2.hand.pop();
      game.pot.push(x);
      game.pot.push(y);

    }
    if(game.pot[game.pot.length - 2].number > game.pot[game.pot.length - 1].number){
      console.log(`I DECLARE THAT....${player1} wins the WAR`);
      for(var i = 0; i < game.pot.length; i++){
        game.player1.hand.push(game.pot[i]);
      }
        game.pot = [];
    } else if(game.pot[game.pot.length - 2].number < game.pot[game.pot.length - 1].number) {
      console.log(`I DECLARE THAT....${player2} wins the WAR`);
      for(var i = 0; i < game.pot.length; i++){
        game.player2.hand.push(game.pot[i]);
      }
        game.pot = [];
    } else {
        this.compareCard();
    }

  }

}

const game = new Game();
game.start();



if (game.player1.hand.length > game.player2.hand.length){
  alert(`${player1} wins with ${game.player1.hand.length} cards!!!!!!`);
}
if (game.player1.hand.length < game.player2.hand.length){
  alert(`${player2} wins with ${game.player2.hand.length} cards!!!!!!`);
}
