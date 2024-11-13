const hangManImage = document.querySelector(".hangMan img")
const wordDsiplay = document.querySelector(".word-display")
const guessesText = document.querySelector(".guess-text b")
const KeyboardDiv = document.querySelector(".keyboard")
const gameModal = document.querySelector(".game-modal")
const playAgainBtn = document.querySelector(".play-again")

let currentWord, correctLetters,  worngGuessCount
const maxGuesses = 6

const resetGame = () => {
    correctLetters = []
    worngGuessCount = 0
    hangManImage.src = `images/hangman-${worngGuessCount}.svg`
    guessesText.innerHTML = `${worngGuessCount} / ${maxGuesses}`
    KeyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    wordDsiplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show")
}

const getRandomWord = () => {
    const {word, hint} = wordList[Math.floor(Math.random() * wordList.length)]
    currentWord = word
    
    document.querySelector(".hint-text b").innerHTML = hint;
    resetGame()
    
}

const gameOver = (isVictory) => {
    setTimeout(() => {
        const modalText  = isVictory ? `You found the word:` : `The correct word was:`;
        gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`
        gameModal.querySelector("h4").innerText = `${isVictory ? 'Congrats!!!' : 'Game Over'}`
        gameModal.querySelector("p").innerHTML = `${modalText} <b> ${currentWord}</b>`
        gameModal.classList.add("show")
    }, 300)
}


const initGame = (button, clickedLetter ) => {
    if(currentWord.includes(clickedLetter)){
        [...currentWord].forEach((letter, index) =>{
            if(letter === clickedLetter){
                correctLetters.push(letter)
                wordDsiplay.querySelectorAll("li")[index].innerText = letter
                wordDsiplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }else{
        worngGuessCount++
        hangManImage.src = `images/hangman-${worngGuessCount}.svg`
    }
    button.disabled = true
    guessesText.innerHTML = `${worngGuessCount} / ${maxGuesses}`

    if(worngGuessCount === maxGuesses) return gameOver(false)
    if(correctLetters.length === currentWord.length) return gameOver(true)
}

for(let i = 97; i <= 122; i++){
    const button = document.createElement("button")
    button.innerHTML = String.fromCharCode(i) 
    KeyboardDiv.appendChild(button)
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)  ))
}
getRandomWord()
playAgainBtn.addEventListener("click", getRandomWord)