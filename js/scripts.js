/**
 * Created by mephisto on 5/16/17.
 */




$(document).ready(function() {

    //Main Function Variables
    const freshDeck = createDeck();
    var theDeck = freshDeck;
    var playersHand = [];
    var dealersHand = [];


    function createDeck() {
        var newDeck = [];
        const suits = ['h','s','d','c'];
        for(let s = 0; s <suits.length; s++){
            for(let c = 1; c <= 13; c++){
                newDeck.push(c + suits[s]);
            }
        }
        return newDeck;
    }

    function shuffleDeck() {
        for(let i = 0; i < 500; i++){
            var randomCard1 = Math.floor(Math.random() * 52);
            var randomCard2 = Math.floor(Math.random() * 52);
            var temp = theDeck[randomCard1];
            theDeck[randomCard1] = theDeck[randomCard2];
            theDeck[randomCard2] = temp;
        }
        return theDeck;
    }

    function placeCard(who, where, cardToPlace) {
        var classSelector = '.' + who + '-cards .card-' + where;
        //console.log(classSelector)
        $(classSelector).html('<img src=cards/'+cardToPlace+'.png>');
    }

    function calculateTotal(hand, who) {

        var total = 0;
        var cardValue = 0;
        for(let i = 0; i < hand.length; i++){
            cardValue = getCardValue(hand[i]);
            total += cardValue;
        }
        //console.log(total);
        var classSelector = '.' + who + '-total';
        $(classSelector).html(total);
        return total;
    }

    function checkWin(){
        var playerTotal = calculateTotal(playersHand, 'player');
        var dealerTotal = calculateTotal(dealersHand, 'dealer');


    }

    function getCardValue(card){

        var initialValue = parseInt(card);
        var finalValue;
        if(initialValue > 10){
            finalValue = 10;
            console.log(finalValue)
        }else if(initialValue > 1 && initialValue <= 10){
            finalValue = initialValue;
        }else if(initialValue == 1){
            finalValue = 11;
        }
        return finalValue;

    }

    $('.deal-button').click(function(){
        theDeck = shuffleDeck();
        //console.log(theDeck);
        playersHand.push(theDeck.shift());
        dealersHand.push(theDeck.shift());
        playersHand.push(theDeck.shift());
        dealersHand.push(theDeck.shift());

        //console.log(dealersHand, playersHand);
        placeCard('player', 1, playersHand[0]);
        placeCard('dealer', 1, dealersHand[0]);
        placeCard('player', 2, playersHand[1]);
        placeCard('dealer', 2, dealersHand[1]);
        calculateTotal(playersHand, 'player');
        calculateTotal(dealersHand, 'dealer');

    });

    $('.hit-button').click(function(){
        //console.log('hit')
        playersHand.push(theDeck.shift());
        placeCard('player', playersHand.length, playersHand[playersHand.length - 1]);
        calculateTotal(playersHand, 'player');

    });

    $('.stand-button').click(function(){
        //console.log('stand clicked')
        var dealerTotal = calculateTotal(dealersHand, 'dealer');
        while(dealerTotal < 17){
            dealersHand.push(theDeck.shift());
            placeCard('dealer', dealersHand.length, dealersHand[dealersHand.length - 1]);
            dealerTotal = calculateTotal(dealersHand, 'dealer');

        }
        //checkWin();
    })



});

