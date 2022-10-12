'use strict'

function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j]
            // console.log(currCell);
            var elCell = document.querySelector(`.cell-${i}-${j} span`)
            currCell.mineNegs = countActiveNegs(gBoard, i, j)
            if (currCell.mineNegs && !currCell.isMine) {
                elCell.innerText = currCell.mineNegs
            }
        }
    }
}

function countActiveNegs(board, rowIdx, colIdx) {
    var count = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= board.length) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (i === rowIdx && j === colIdx) continue
            if (j < 0 || j >= board[0].length) continue
            var currCell = board[i][j]
            // console.log('currCell.content',currCell.content);
            if (currCell.isMine === true) count++
        }
    }
    return count
}


function createMines(board, row, col) {
    // and mining
    if (gLevel.MINES > 0) {
        var emptyPos = []
        for (var i = 0; i < board.length; i++) {
            for (var j = 0; j < board[0].length; j++) {

                if (i === row && j === col) continue
                emptyPos.push({ i, j }) 
            }
        }
        for (var h = 0; h < gLevel.MINES; h++) {
            var randPos = getRandomInt(0, emptyPos.length)
            var minePos = emptyPos.splice(randPos, 1)
            // UPDATE THE MODEL
            board[minePos[0].i][minePos[0].j].isMine = true
            // UPDATE THE DOM
            var elCell= document.querySelector(`.cell-${[minePos[0].i]}-${[minePos[0].j]} span`)
            elCell.innerText=MINE
            
        }
    }
}

function renderBoard(mat, selector) {

    var strHTML = '<table><tbody>'
    for (var i = 0; i < mat.length; i++) {

        strHTML += '<tr>'
        for (var j = 0; j < mat[0].length; j++) {
       
            const className = 'cell cell-' + i + '-' + j
            strHTML += `<td onclick="onCellClicked(this)" oncontextmenu="onCellMarked(this);return false;" 
            class="${className}"><span></span><span class="flag"></span></td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>'
    const elContainer = document.querySelector(selector)
    elContainer.innerHTML = strHTML

}

function buildBoard(boardSize) {
    const table = []
    for (var i = 0; i < boardSize; i++) {
        table.push([])
        for (var j = 0; j < boardSize; j++) {
            table[i][j] = {
                 i, j,
                 isMine:false,
                 mineNegs: 0,
                  isMarked: false, 
                  isShown: false }
        }
    }
    return table
}


