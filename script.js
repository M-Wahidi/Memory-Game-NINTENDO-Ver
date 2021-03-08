// Selectors
let body = document.getElementsByTagName("BODY")[0];
const startButton = document.querySelector('.start-button');
const startScreen = document.querySelector('.start-game-screen');
const playerName = document.querySelector('.name');
let wrongScore = document.querySelector('.score');
let blockContainer = document.querySelector('.game-block');
let flipSpeed = 1000;
let cards = document.querySelectorAll('.card');
let timer = document.querySelector('.timer span');
let bgMusic = document.getElementById('bg-music');
let LeadrBoardButton = document.querySelector('.leader-Board-Button')
let leadrBoardPage = document.querySelector('.leaderBoard');
timer.innerHTML = 60;
// function set timer

// set timer
function setTimer() {

    setInterval(() => {
        // time-out - lose
        if (timer.textContent <= 0) {
            clearInterval();
            // bgMusic.pause()
        }
        // win
        else if (timer.textContent > 0 && [...cards].every(card => card.classList.contains('correct'))) {
            clearInterval();
        }

        // during game
        else {
            timer.textContent -= 1

        }

    }, 1000);

}



// set background music
function bg_music() {
    timer.textContent > 0 ? bgMusic.play() : bgMusic.pause();
}

// win Game
function win() {
    if (timer.textContent > 0 && [...cards].every(card => card.classList.contains('correct'))) {
        document.getElementById('win-music').play();
        bgMusic.pause();
        setScoreScreen(playerName, timer, wrongScore);
        setLeadrBoard(playerName, timer, wrongScore);
        return;
    }

}

// lose Game
lose();
function lose() {
    if (timer.textContent == 0) {
        document.getElementById('lose-music').play();
        setScoreScreen(playerName, timer, wrongScore);
        setLeadrBoard(playerName, timer, wrongScore);
        return;
    }
    setTimeout(lose, 10)

}

// mute music
function muteMusice() {
    let isMute = false;
    let mute = document.querySelector('.mute');
    mute.addEventListener('click', () => {
        if (isMute === false) {
            document.getElementById('bg-music').muted = true;
            document.getElementById('lose-music').muted = true;
            document.getElementById('win-music').muted = true;
            document.getElementById('success').muted = true;
            document.getElementById('fail').muted = true;

            isMute = true;
            mute.classList.add('active');

        }
        else {
            document.getElementById('bg-music').muted = false;
            document.getElementById('lose-music').muted = false;
            document.getElementById('win-music').muted = false;
            document.getElementById('success').muted = false;
            document.getElementById('fail').muted = false;
            isMute = false;

            mute.classList.remove('active');

        };
    });



};

// start Game Screen
startButton.addEventListener('click', () => {
    let name = window.prompt('Please Enter Your Name:');
    if (name === null || name.trim().length === 0) {
        playerName.innerHTML = 'Unknown';
    }
    else {
        playerName.innerHTML = name;
    }
    // remove the start screen and strat the flip game
    startScreen.remove();
    // start counter 60 sec after we enter the name
    setTimer();
    // Set Background Music
    bg_music();
    // Mute Music
    muteMusice();
    /// flipping all the cards for one sec at the begining
    cards.forEach(card => card.classList.add('is-flipped'));
    setTimeout(() => {
        cards.forEach(card => card.classList.remove('is-flipped'));
    }, 1000)


})





//store the cards in orderRange Array
orderRange = [];
cards.forEach((_, index) => orderRange.push(index));

// suffle the cards at begining
cards.forEach((card, _) => {
    // shuffle the cards randomly
    card.style.order = orderRange[Math.floor(Math.random() * orderRange.length)];
    // add click event to open the card
    card.addEventListener('click', () => {
        flipCard(card);
        // win function
        win();
    });
});

// function to add class flip
function flipCard(selectedCard) {
    // ADD CLASS IS-FLIPPED
    selectedCard.classList.add('is-flipped');
    //COLLECT ALL FLIPPED CLASS

    let allFlippedCards = [...cards].filter(flipedCard => flipedCard.classList.contains('is-flipped'));
    //CHECK IF THERE IS TWO SELECTED BLOCKS
    if (allFlippedCards.length === 2) {
        stopClicking();
        checkMatchCards(allFlippedCards[0], allFlippedCards[1])
    };
};

// Stop Clicking
function stopClicking() {
    // Add Class no clicking on cards
    blockContainer.classList.add('no-click');
    setTimeout(() => {
        // remove class No Clicking after the duraction
        document.querySelector('.game-block').classList.remove('no-click');
    }, flipSpeed);
}

// checkMatch
function checkMatchCards(firstBlock, secondBlock) {
    //  Match Cards
    if (firstBlock.dataset.char === secondBlock.dataset.char) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');
        firstBlock.classList.add('correct');
        secondBlock.classList.add('correct');
        document.getElementById('success').play()

    }
    //  Un-Match Cards
    else {
        wrongScore.innerHTML = parseInt(wrongScore.innerHTML) + 1;
        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, flipSpeed);
        document.getElementById('fail').play();

    };
};


function setScoreScreen(name, time, wrongScore) {
    let scoreScreen = document.createElement('div');
    scoreScreen.classList.add('scoreScreen');
    blockContainer.style.pointerEvents = 'none';

    // Score Screen Window Content



    // create Close Button adn close the window

    let closeButton = document.createElement('div');
    closeButton.innerHTML = '';
    closeButton.classList.add('closeButton');
    scoreScreen.appendChild(closeButton);

    // close the score screen after click on the close button or the body outside
    closeButton.addEventListener('click', () => {
        scoreScreen.style.display = 'none';
        document.querySelector('.game-block').style.opacity = "1";
        document.querySelector('.info-container').style.opacity = "1";
    });


    // create rpeate button
    let restartButton = document.createElement('li');
    restartButton.classList.add('fa-redo');
    scoreScreen.appendChild(restartButton);

    // restart game the game on click
    restartButton.addEventListener('click', () => {
        location.reload();
    });


    // Show PlayerName Time WrongScore

    // time score
    let timeScore = document.createElement('h1');
    timeScore.style.fontSize = '1.4rem'
    timeScore.innerHTML = `Time Left: ${time.textContent}`;
    scoreScreen.appendChild(timeScore);


    // player name
    let Pname = document.createElement('h1');
    Pname.innerHTML = `Name: ${name.textContent}`;
    Pname.style.fontSize = '1.4rem';
    scoreScreen.appendChild(Pname);

    // wrongTires
    let PwrongScore = document.createElement('h1');
    PwrongScore.innerHTML = `Wrong Tries: ${wrongScore.textContent}`;
    PwrongScore.style.fontSize = '1.4rem'
    scoreScreen.appendChild(PwrongScore);

    //  blur the backround when item reaches on win or lose
    scoreScreen.classList.add('open');
    document.querySelector('.game-block').style.opacity = "0.5";
    document.querySelector('.info-container').style.opacity = "0.5";
    body.appendChild(scoreScreen);

}





// leader Board Page
LeadrBoardButton.addEventListener('click', () => {
    // leaderBoard();

    // check if the game still playing disable leadrbaord page

    console.log(timer.textContent)
    // opacity of the background
    // let game_block_opa = document.querySelector('.game-block');
    // let game_info_opa = document.querySelector('.info-container')

    // if (game_block_opa.style.opacity == '1' && game_info_opa.style.opacity == '1') {
    //     game_block_opa.style.opacity = "0.5"
    //     game_info_opa.style.opacity = "0.5"
    // }
    // else {
    //     game_block_opa.style.opacity = "1"
    //     game_info_opa.style.opacity = "1"

    // }

    leadrBoardPage.classList.toggle('open-LeadrBoard');

})

// Set Leadear Board Score on Local Storage
function setLeadrBoard(name, time, WrongTries) {
    // set results in local storage
    let keyid = '' + localStorage.length;
    let PlayerData = { 'PlayerName': name.innerHTML, 'TimeLeft': time.innerHTML, 'WrongPick': WrongTries.innerHTML }
    localStorage.setItem(keyid, JSON.stringify(PlayerData))

    // get all local storage results


    let values = [],
        id = Object.keys(localStorage),
        i = id.length;

    while (i--) {
        values.push(localStorage.getItem(id[i]));
    }


    // add tr and td to the table in leadrboard page

    let tableBody = document.querySelector('.t-body')

    for (let i = 0; i < values.length; i++) {

        let tr = document.createElement('tr');
        let obj = JSON.parse(values[i])


        let tdNo = document.createElement('td')
        tdNo.innerHTML = i;


        let tdName = document.createElement('td')
        tdName.innerHTML = obj.PlayerName;


        let tdTime = document.createElement('td');
        tdTime.innerHTML = obj.TimeLeft;


        let tdWrongTries = document.createElement('td')
        tdWrongTries.innerHTML = obj.WrongPick;


        tr.appendChild(tdNo);
        tr.appendChild(tdName);
        tr.appendChild(tdTime);
        tr.appendChild(tdWrongTries);

        tableBody.appendChild(tr);
    }

}


// SORT LEADERBOARD
function sortLeadrBoard(table, column) {
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll('tr'));

    //sort each row;
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column})`).textContent.trim();
        return aColText > bColText ? -1 : 1

    });
    //REMOVE ALL EXITING TRS FROM THE TABLE

    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows

    tBody.append(...sortedRows);

}

//CALL LEADEARBOARD
LeadrBoardButton.addEventListener('click', () => {
    sortLeadrBoard(document.querySelector('table'), 3);
})

