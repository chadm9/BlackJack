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
    })



});

