'use strict'

var gBoardSize = 16
var gGameNumbers = []
var nextNumber = 1

var seconds = 0;
var tens = 0;
var appendTens = document.getElementById("tens")
var appendSeconds = document.getElementById("seconds")
var Interval;


function init() {
    generateNumbers(gBoardSize)
    renderBoard(gGameNumbers)
    // console.log(gGameNumbers);
}

function onCellclick(elCell){
    
    if(nextNumber===1)startTime()
    if(+elCell.id===nextNumber){
        elCell.classList.add('pressed')
        nextNumber++
    }
    console.log(nextNumber,gBoardSize);
    
    if(nextNumber>gBoardSize)GameWon()
}

function onNewGame(){
    resetTime()
    stopTime()
    init()
    
    var elCells = document.querySelectorAll('.cell')
    for(var i=0;i<elCells.length; i++ ){
        elCells[i].classList.remove('pressed')
        console.log(elCells[i]);
        
    }
    nextNumber=1
}

function onlevelChoise(elLevelBtn){
    resetTime()
    stopTime()
    gBoardSize = elLevelBtn.id
    generateNumbers(gBoardSize)
    console.log(gBoardSize);
    console.log(gGameNumbers);
    renderBoard(gGameNumbers)
    nextNumber=1
}

function GameWon(){
    stopTime()
}


function generateNumbers(boardSize) {

    for (var i = 1; i <= boardSize; i++) {
        gGameNumbers.push(i)
    }
}

function renderBoard(nums) {
    var elBoard = document.querySelector('.board')
    var boardLength = nums.length
    var HTMLStr =''
    for (var i = 0; i < boardLength**0.5; i++) {
        HTMLStr+='<tr>'
        for (var j = 0; j < boardLength**0.5; j++){
            var num = nums.splice(getRandomIntInclusive(0,nums.length-1),1)
            HTMLStr+=`<td onclick="onCellclick(this)" class='cell' id='${num}'>${num}</td>`
        }
        HTMLStr+='</tr>'
    }
    elBoard.innerHTML=HTMLStr
}