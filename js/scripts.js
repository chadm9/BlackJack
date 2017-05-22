/**
 * Created by mephisto on 5/16/17.
 */




$(document).ready(function() {

   //Variables

    const freshDeck = createDeck();
    var playersHand = [];
    var dealersHand = [];
    //var theDeck = freshDeck.slice();
    var theDeck = freshDeck.slice();
    var bankRoll = 50;
    var playerBet = 0;

    var playerCardsDealt = 1;


//*************************************************
    //Event Handlers


    $('.deal-button').click(function(){


        playersHand.push(theDeck.shift());
        dealersHand.push(theDeck.shift());
        playersHand.push(theDeck.shift());
        dealersHand.push(theDeck.shift());

        placeCard('player', 1, playersHand[0]);
        placeCard('player', 2, playersHand[1]);

        placeCard('dealer', 1, dealersHand[0]);
        placeCard('dealer', 2, dealersHand[1]);

        calculateTotal(playersHand, 'player');
        calculateTotal(dealersHand, 'dealer');

        if(calculateTotal(playersHand, 'player') === 21){
            $('.message').text('BlackJack! Player wins!');
            bankRoll += Math.floor(playerBet*1.5);
            $('.hit-button').css('display', 'none');
            $('#slider').css('display', 'none');
            $('.deal-button').css('display', 'none');
            $('.stand-button').css('display', 'none');
            $('.reset-button').css('display', 'inline');
            $('.bank-roll').html('$' + bankRoll);

        }else if(calculateTotal(dealersHand, 'dealer') === 21) {
            $('.message').text('BlackJack, dealer wins.');
            bankRoll -= playerBet;
            $('.hit-button').css('display', 'none');
            $('#slider').css('display', 'none');
            $('.deal-button').css('display', 'none');
            $('.stand-button').css('display', 'none');
            $('.reset-button').css('display', 'inline');
            $('.bank-roll').html('$' + bankRoll);
        }else{
            $('.deal-button').css('display', 'none');
            $('.stand-button').css('display', 'inline');
            $('.hit-button').css('display', 'inline');
            $('#slider').css('display', 'none');
            $('#slider').html('');
            $('#bet').html('');
        }

        console.log(dealersHand);







    });

    $('.reset-button').click(function(){
        reset();
        $('.deal-button').css('display', 'inline');
        $('#slider').css('display', 'inline');
    })



    $('.hit-button').click(function(){
        playersHand.push(theDeck.shift());
        var lastCardIndex = playersHand.length - 1;
        var slotForNewCard = playersHand.length;
        placeCard('player', slotForNewCard, playersHand[lastCardIndex]);
        calculateTotal(playersHand, 'player');

        if(calculateTotal(playersHand, 'player') > 21){
            $('.message').text('Player busts');
            bankRoll -= playerBet;
            $('.hit-button').css('display', 'none');
            $('.stand-button').css('display', 'none');
            $('.reset-button').css('display', 'inline');
            $('.bank-roll').html('$' + bankRoll);

        }


        if(calculateTotal(playersHand, 'player') <= 21 && playersHand.length === 5){
            $('.message').text('Player Winds!');
            bankRoll -= playerBet;
            $('.hit-button').css('display', 'none');
            $('.stand-button').css('display', 'none');
            $('.reset-button').css('display', 'inline');
            $('.bank-roll').html('$' + bankRoll);

        }



    });



    $('.stand-button').click(function(){
        var dealerTotal = calculateTotal(dealersHand, 'dealer');
        while(dealerTotal < 17){
            dealersHand.push(theDeck.shift());
            var lastCardIndex = dealersHand.length - 1;
            var slotForNewCard = dealersHand.length;
            placeCard('dealer', slotForNewCard, dealersHand[lastCardIndex]);
            dealerTotal = calculateTotal(dealersHand, 'dealer');

        }
        checkWin();
        //$('.deal-button').css('display', 'inline');
        //$('#slider').css('display', 'inline');
        $('.stand-button').css('display', 'none');
        $('.hit-button').css('display', 'none');

        $('#slider').html('$2');
        $('.bank-roll').html('$' + bankRoll);
        $('.reset-button').css('display', 'inline');

        console.log(dealersHand);
    });


    $('#slider').change(function(){
        var bet = this.value;
        $('#bet').html('$' + bet);
        $('.current-bet').html('$' + bet);
        playerBet = parseInt(bet);


    });



//***************************************************
    //Utility Functions


    function checkWin(){
        var playerTotal = calculateTotal(playersHand, 'player');
        var dealerTotal = calculateTotal(dealersHand, 'dealer');
        var winner;

        if(playerTotal > 21){
            winner = "Busted! Dealer wins.";
            bankRoll -= playerBet;
        }else if(dealerTotal > 21){
            winner = "Dealer busts.  Player wins!"
            bankRoll += playerBet;
        }else{
            if(playerTotal > dealerTotal){
                winner = 'Player wins!';
                bankRoll += playerBet;
            }else if(dealerTotal > playerTotal){
                winner = 'Dealer wins.';
                bankRoll -= playerBet;
            }else{
                winner = "Push."
            }
        }
        $('.bank-roll').html(bankRoll);
        console.log(bankRoll);
        $('.message').text(winner);
    }

    function reset(){
        theDeck = freshDeck.slice();
        shuffleDeck();

        dealersHand = [];
        $('.card').html('');
        $('.dealer-total-number').html('0');
        $('.player-total-number').html('0');
        $('.message').text('Player Bets');
        $('.reset-button').css('display', 'none');
        $('#bet').html('$' + playerBet);
        console.log(bankRoll);
        console.log($('#slider'));
        if(bankRoll === 0){
            alert("You have lost.  Play again?")
            bankRoll = 50
            $('.bank-roll').html('$' + bankRoll);
        }
        $('#slider')[0].max = bankRoll;
        for(var i = 1; i <= playerCardsDealt; i++){
            console.log(i);

            $('.deck.card-' + i).addClass('deck-' + i);
            $('.deck.card-' + i).removeClass('card-' + i);
        }
        playersHand = [];
        playerCardsDealt = 1;
    }

    function createDeck() {
        var newDeck = [];
        var suites = ['h', 's', 'd', 'c']
        for(let s = 0; s < 4; s++){
            for(let c = 1; c < 14; c++){
                newDeck.push(c + suites[s]);
            }
        }
        return newDeck;
    }

    function shuffleDeck(){
        for(let i = 0; i < 14000; i++){
            var random1 = Math.floor(Math.random()*52);
            var random2 = Math.floor(Math.random()*52);
            var temp = theDeck[random1];
            theDeck[random1] = theDeck[random2];
            theDeck[random2] = temp;


        }
    }

    function placeCard(who, where, what){
        if(who =='player'){
            $('.deck-' + playerCardsDealt).addClass('card-' + playerCardsDealt);
            $('.deck-'+playerCardsDealt).removeClass('deck-'+playerCardsDealt);
            playerCardsDealt++;

        }

        //setTimeout($('.deck-2').addClass('card-2'), 400);
        //$('.deck-2').removeClass('deck-2');
        //$('.deck').removeClass('deck');
        var cardSlot = '.' + who + '-cards .card-' + where;
        imageTag = '<img src="cards/' + what + '.png">';
        $(cardSlot).html(imageTag);
    }

    function calculateTotal(hand, who){
        var total = 0;
        var cardValue = 0;
        var aces = 0;
        for(let i = 0; i < hand.length; i++){
            cardValue = parseInt(hand[i]);

            if(cardValue > 10){
                cardValue = 10;

            }else if(cardValue === 1){
                cardValue = 11;
                aces += 1;
            }
            total += cardValue;
        }
        if(total > 21 && aces > 0){
            while(total > 21 && aces > 0){
                total -= 10;
                aces--;
            }
        }
        var valueToUpdate = '.' + who + '-total-number';
        $(valueToUpdate).text(total);
        return total;
    }

});

