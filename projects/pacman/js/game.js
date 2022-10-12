'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const POWER = '💉'
const CHERRY= '🍺'

var gGame = {
    score: 0,
    isOn: false
}
var gBoard

var foodCount = 0
var cherryInterval

function init() {
    console.log('hello')

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)

    renderBoard(gBoard, '.board-container')
    gGame.isOn = true
    cherryInterval = setInterval(createCherry, 15000)//;laskdf;lkas;dfl
}

function buildBoard() {
    const SIZE = 10
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([board.length - 2])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
            }
            if (i === 1 && j === 1 ||
                i === 1 && j === SIZE - 2 ||
                i === SIZE - 2 && j === 1 ||
                i === SIZE - 2 && j === SIZE - 2) {
                board[i][j] = POWER

            }
            if (board[i][j] === FOOD) foodCount++
        }
    }
    foodCount--//for the place of the PACKMAN
    return board
}
function createCherry() {
    var emptyPoses = []
    // console.log('asldkfjsadf');
    for(var i=1; i<gBoard.length-2; i++){
        for(var j=1; j<gBoard.length-2; j++){
            // console.log(gBoard[i][j])
            if(gBoard[i][j]===EMPTY)emptyPoses.push({i,j})

        }
    }
    // console.log(emptyPoses);
    // update the model
    var randEmptyPos = emptyPoses.splice(getRandomIntInclusive(0,emptyPoses.length-1),1)
    // console.log(randEmptyPos);
    var i = randEmptyPos[0].i
    var j = randEmptyPos[0].j
    
    gBoard[i][j]='🍺'
    console.log(gBoard[i][j]);
    console.log(gGame.score);
    
    // update the dom
    renderCell(randEmptyPos[0],'🍺')

}

function startPowerMode() {
    gPacman.isSuper = true
    setTimeout(() => {
        gPacman.isSuper = false
        gGhosts.push(...gEatenGhosts)
        gEatenGhosts = []
    }, 5000);
    console.log(gPacman.isSuper);

}


function updateScore(diff,isUnderGhost) {
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
    if(diff===1&&!isUnderGhost)foodCount--
    
}

function gameOver() {
    console.log('Game Over')
    foodCount = 0
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(cherryInterval)
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    var elModalText = document.querySelector('.modal h2')
    elModalText.innerText = 'Game Over'
}
function gameWon() {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(cherryInterval)
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'block'
    var elModalText = document.querySelector('.modal h2')
    elModalText.innerText = 'CONGRETULATIONS! YOU WON!!'
}
function onNewGame() {
    gGame.score = 0
    gGame.isOn = true
    init()
    var elScore = document.querySelector('h2 span')
    elScore.innerText = 0
    var elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
}