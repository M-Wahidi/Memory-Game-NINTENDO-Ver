// Selectors
const startButton = document.querySelector('.start-button');
const startScreen = document.querySelector('.start-game-screen');
const playerName = document.querySelector('.name');
const cards = document.querySelectorAll('.card');
let score = document.querySelector('.score');
let correctAudio = document.getElementById('correctAudio');
let wrongAudio = document.getElementById('wrongAudio');
const shuffleSpeed = 1000;
// shuffle the cards
cards.forEach((card) => {
    let random_number = Math.floor(Math.random() * cards.length);
    card.style.order = random_number;
})
document.addEventListener('DOMContentLoaded', flipAllTheCardAtTheBeginning)


startButton.addEventListener('click', () => {
    start_game()
});




let counter = 0
// FLIP THE CARD ON CLICK
cards.forEach(card => card.addEventListener('click', (e) => {
    let currentTarget = e.currentTarget
    card.classList.add("is-flipped");
    //check if the card matching remove is-flipping class and add correct class
    if (currentTarget.classList.contains('correct')) {
        counter = 0;
        currentTarget.classList.remove('is-flipped')
    }

    // flip back 2 cards at same time after one second - (function - flip-back-the-cards)
    if (currentTarget.classList.contains("is-flipped")) {
        currentTarget.style.pointerEvents = 'none'
        counter += 1
    }
    if (counter === 2) {
        counter = 0;
        flipBackTheCards();
    }

    check_flip_amount()

    correctTries()

    playCorrectAudio(e)
    playWrongAudio(e)
}))


//functions 

// start the game open all the cards for 1 sec
function flipAllTheCardAtTheBeginning() {
    cards.forEach(card => card.classList.add('is-flipped'));
    setTimeout(function () {
        cards.forEach(card => card.classList.remove('is-flipped'));
    }, 1000)
}

// flip back the card after 1 second
function flipBackTheCards() {
    cards.forEach((card, _) => {
        setTimeout(function () {
            card.classList.remove("is-flipped")
        }, 1000)

    })
}

// give permission to open 2 cards at the same time and disable other
function check_flip_amount() {
    let countFlip = 0

    // if the card matcing stop the count on click and remove the class is-flipped
    cards.forEach((card, _) => {
        if (card.classList.contains('correct')) {
            countFlip = 0;
            card.classList.remove('is-flipped')
        }

    })

    // each time u flip the card the count increase one
    cards.forEach((card, _) => {
        if (card.classList.contains('is-flipped')) {
            countFlip += 1
        }

    })

    // check if the count reach 2 (opening 2 cards at the same time then disable the other cards)
    if (countFlip === 2) {
        cards.forEach(card => card.style.pointerEvents = 'none');
        countFlip = 0;
    }
    // check if the card reach 0 again enable all cards to choose between them after 1 sec 
    if (countFlip === 0) {
        setTimeout(() => {
            cards.forEach(card => card.style.pointerEvents = 'auto');
        }, 1000);

    }
}
// check if the choosen card matching
function correctTries() {
    // create array and put the choosen card inside it
    let choices = []
    cards.forEach((card, index, _) => {
        if (card.classList.contains('is-flipped')) {
            choices.push(card)
        }

    })
    // check the choices array when it reach 2 len in the array and the cards matching dont flip the card
    choices.forEach((card, index, arr) => {
        if (arr.length === 2) {
            if (arr[0].getAttribute('data-char') === arr[1].getAttribute('data-char')) {
                cards.forEach((card, index, _) => {
                    // remove the class is-flipping and add the correct class
                    if (card.classList.contains('is-flipped')) {
                        card.classList.add('correct');
                    }

                })
            }

        }
    })
}
// play correct audio when u got a match between two cards
function playCorrectAudio(event) {
    let currnetTarget = event.currentTarget;
    if (currnetTarget.classList.contains('is-flipped') && currnetTarget.classList.contains('correct')) {
        correctAudio.play()
    }
}

let arr = []

// play wrong audio when u fail to find a mtach + update the score
function playWrongAudio(event) {
    let currnetTarget = event.currentTarget;
    if (currnetTarget.classList.contains('is-flipped')) {
        arr.push(currnetTarget)
    }

    if (arr.length === 2)
        if (arr[0].innerHTML !== arr[1].innerHTML) {
            score.innerHTML++
            wrongAudio.play()
            arr = []
        }


    if (arr.length === 2)
        if (arr[0].innerHTML === arr[1].innerHTML) {
            arr = []
        }
}




// set the name and enter the game
function start_game() {
    let name = prompt('Whats Your Name?');
    playerName.innerHTML = name;
    if (playerName.innerHTML.trim() !== '') {
        startScreen.style.display = 'none';
    } else if (playerName.innerHTML.trim() === '') {
        alert('you Cannot enter empty name')

    }
};