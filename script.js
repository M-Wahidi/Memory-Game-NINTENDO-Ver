// Selectors
const startButton = document.querySelector('.start-button');
const startScreen = document.querySelector('.start-game-screen');
const playerName = document.querySelector('.name');
let wrongScore = document.querySelector('.score');
let blockContainer = document.querySelector('.game-block');
let flipSpeed = 1000;
let cards = document.querySelectorAll('.card');
let timer = document.querySelector('.timer span');
timer.innerHTML = 30;


// function set timer
function setTimer() {
    setInterval(() => {
        timer.textContent <= 0 ? clearInterval() : timer.textContent -= 1;

    }, 1000);
}

// set background music
function bg_music() {
    timer.innerHTML >= 0 ? document.getElementById('bg-music').play() : document.getElementById('bg-music').pause()
}

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
    // start counter after we enter the name
    setTimer()
    bg_music()

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
        document.getElementById('success').play();
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
