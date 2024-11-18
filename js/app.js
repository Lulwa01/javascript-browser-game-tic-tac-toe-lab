/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

/*---------------------------- Variables (state) ----------------------------*/
let board = ['', '', '', '', '', '', '', '', '']
let turns = 'X'
let winner = false
let tie = false
let player1Score = 0
let player2Score = 0


// console.log(board)


/*------------------------ Cached Element References ------------------------*/
const squaresEls = document.querySelectorAll('.sqr')
let messageEl = document.querySelector('#message')
const resetBtnEl = document.querySelector('#reset')
const player1ScoreEl = document.querySelector('#player1-score')
const player2ScoreEl = document.querySelector('#player2-score')
const malak = document.querySelector('#malak-illustration')
const malakMad = document.querySelector('#malak-illustration-mad')




/*-------------------------------- Functions --------------------------------*/
function init () {
    board = ['', '', '', '', '', '', '', '', '']
    turns = 'X'
    winner = false
    tie = false
    malakMad.style.opacity = '0'
    malak.style.opacity = '1' 
    render()
    messageEl.textContent = "ready? lulwa start"
    // console.log(init)
}

function render () {
    updateBoard()
    updateMessage()
}

function placePiece (index){
    if (board[index] === '' && winner === false && tie === false){
        board[index] = turns
    } 
    // console.log(board)
}

function checkForWinner () {
    if (board[0] !== '' && board[0] === board[1] && board[0] === board[2]){
        winner = true 
    } 
    if (board[3] !== '' && board[3] === board[4] && board[3] === board[5]){
        winner = true
    } 
    if (board[6] !== '' && board[6] === board[7] && board[6] === board[8]){
        winner = true
    } 
    if (board[0] !== '' && board[0] === board[3] && board[0] === board[6]){
        winner = true
    } 
    if (board[1] !== '' && board[1] === board[4] && board[1] === board[7]){
        winner = true
    } 
    if (board[2] !== '' && board[2] === board[5] && board[2] === board[8]){
        winner = true
    } 
    if (board[2] !== '' && board[2] === board[4] && board[2] === board[6]){
        winner = true
    } 
    if (board[0] !== '' && board[0] === board[4] && board[0] === board[8]){
        winner = true
    }
    }
    // console.log('The winner is' + turns)

// console.log(winner)

function updateScore () {
    if (winner === true && turns === 'X'){
       player1Score +=1
       player1ScoreEl.textContent = player1Score 
       malakMad.style.opacity = '1'
       malak.style.opacity = '0'
    } else if (winner === true && turns === 'O'){
       player2Score +=1
       player2ScoreEl.textContent = player2Score
       malakMad.style.opacity = '0'
       malak.style.opacity = '1'
    } 
    } 

function updateBoard () {
    board.forEach((value, index) => {
        squaresEls[index].textContent = value
        if (value === 'X'){
            squaresEls[index].style.color = '#ff779f'
        } else {
            squaresEls[index].style.color = '#7e7acc'
        }
    })
}

function updateMessage () {
    if (winner === false && tie === false){
        if (turns === 'X'){
        messageEl.textContent = `lulwa, its your turn`
    } else {
        messageEl.textContent = `malak, its your turn`
    }
    } else if (winner === false && tie === true) {
        messageEl.textContent = `its a tie!`
    } else {
        if (turns === 'X'){
        messageEl.textContent = `yayy, lulwa won!`
    } else {
        messageEl.textContent = `yayy, malak won!`
    }
}
}

// render (messageEl)

function handleClick (squareIndex) {
    placePiece(squareIndex)
    checkForWinner()
    checkForTie()
    switchPlayerTurn()
    updateScore ()
    render()
}
// console.log(handleClick)

function switchPlayerTurn () {
    if (winner === true){
        return
    } 
    if (turns === 'X') {
        turns = 'O' 
    } else if (turns === 'O'){
        turns = 'X'
    }
    // console.log(`Current turn is ${turns}`)
    }

function checkForTie () {
    if (winner === true){
        return
    } else if (!board.includes('')){
        tie = true
    } else {
        tie = false
    }
    // console.log(`Is there a tie: ${tie}`)
}

/*----------------------------- Event Listeners -----------------------------*/
squaresEls.forEach((squaresEl, squareIndex) => {
    squaresEl.addEventListener('click', () => handleClick(squareIndex))
})

resetBtnEl.addEventListener('click', init) 
init()