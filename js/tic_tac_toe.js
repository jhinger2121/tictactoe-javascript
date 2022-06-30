(function () {  // iffe function (10 points)
    let currentPlayer;
    let playerIcon = {}

    let icons = ['x', 'o'];  // array ( 2 points)
    let players = {   // object (2 points)
        'player1': {"icon": "x", 'turn': true},
        'player2': {"icon": "o", 'turn': false}
    }
    let elements = document.querySelectorAll('td');  // querySelectorAll (2 points)
    let turn = document.getElementById('turn');      // document object (2 points)
    let winner = document.getElementById('winner');
    let resetGame = document.getElementById('reset');

    function game() {
        elements.forEach(element => {
            element.addEventListener('click', function(e){   // addEventListener (2 points)
                if (players.player1.turn) { // if statement used (5 points)
                    this.innerText = players.player1.icon; // used 'this' keyword (5 points)

                        //  check if user won
                    isWinner();
                    
                    // assigning turn to other player
                    players.player1.turn = false;
                    players.player2.turn = true;

                    // showing whos turn is 
                    turn.innerText = "Its O turn now"

                } else if (players.player2.turn) { // else if statement used (5 points)
                    this.innerText = players.player2.icon;

                    //  check if user won
                    isWinner();

                    // assigning turn to other player
                    players.player2.turn = false;
                    players.player1.turn = true;

                    // showing whos turn is 
                    turn.innerText = "Its X turn now";
                } else { // else statement used (5 points)
                    alert("worng move!")
                }

                // use comments throught out ( 2 points)
            })
        });

    }

    function reset() {
        elements.forEach(element => {
            element.innerText = '';
        });
    }

    function isWinner() {
        for (let i = 0; i < icons.length; i++) {  // for loop used (5 points) also used & and || operator (5 + 5 points)
            if ((elements[0].innerHTML == icons[i]) && (elements[1].innerHTML == icons[i]) && (elements[2].innerHTML == icons[i]) ||
                (elements[3].innerHTML == icons[i]) && (elements[4].innerHTML == icons[i]) && (elements[5].innerHTML == icons[i]) ||
                (elements[6].innerHTML == icons[i]) && (elements[7].innerHTML == icons[i]) && (elements[8].innerHTML == icons[i]) ||

                (elements[0].innerHTML == icons[i]) && (elements[3].innerHTML == icons[i]) && (elements[6].innerHTML == icons[i]) ||
                (elements[1].innerHTML == icons[i]) && (elements[4].innerHTML == icons[i]) && (elements[7].innerHTML == icons[i]) ||
                (elements[2].innerHTML == icons[i]) && (elements[5].innerHTML == icons[i]) && (elements[8].innerHTML == icons[i]) ||

                (elements[0].innerHTML == icons[i]) && (elements[4].innerHTML == icons[i]) && (elements[8].innerHTML == icons[i]) ||
                (elements[2].innerHTML == icons[i]) && (elements[4].innerHTML == icons[i]) && (elements[6].innerHTML == icons[i])

                ){
                    winner.innerText = icons[i] + " is winner!"
                    alert("The winner is " + icons[i])
                    // 
                    sessionStorage.setItem("won", icons[i]);

                    reset();
            }
        }
    }

    resetGame.addEventListener('click', function () {
        reset();
    })

    game();

    let owner = document.getElementById('owner');
    let getOwner = document.getElementById('getOwner');

    getOwner.onclick = function () {
        let xml = new XMLHttpRequest();  // xml object (15 points)
        xml.open("GET", "owner.txt");    // get data from file (15 points)
        xml.send();

        xml.onreadystatechange = function() {
            if (xml.readyState == 4) {
                if (xml.status == 200) {
                    owner.innerText = "Owner of the website is " + xml.responseText;
                } else {
                    xml.open("GET", "owner.txt");
                    xml.send();
                    if(xml.readyState == 4) {
                        owner.innerText = "Owner of the website is " + xml.responseText;
                    }
                }
            }
        };
    }

    document.getElementById('checkTime').onclick = function () {
        let dateTime = new Date();   // used date object (5 points)
        alert(dateTime)
    }

    document.querySelector('#lastWinner').onclick = function () {    // used querySelector (2 points)
        alert("Last match winner was '" + sessionStorage.getItem("won") + "' ");   // session used (10 points)
    }

    let goBack = document.getElementById('back');
    goBack.addEventListener('click', function () {
        window.history.back();  // history object (5 points)
    })

    let goforward = document.getElementById('forward');
    goforward.addEventListener('click', function () {
        window.history.forward();
    })

    document.getElementById('naimal').onclick = function () {
        let xml = new XMLHttpRequest();  // xml object (15 points)
        xml.open("GET", "https://dog.ceo/api/breeds/image/random");    // 3rd party api (10 points)
        xml.send();

        xml.onreadystatechange = function() {
            if (xml.readyState == 4) {
                if (xml.status == 200) {
                    let a = JSON.parse(xml.responseText)
                    console.log(a.message)
                    document.getElementById('ramdomDog').src = a.message;
                }
            }
        };
    }


})();