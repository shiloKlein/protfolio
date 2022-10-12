'use strict'

const PACMAN = '😷';
var gPacman;

function createPacman(board) {
    gPacman = {
        location: {
            i: 3,
            j: 5
        },
        isSuper: false,
        // currCellContent: PACMAN
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {

    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev)

    if (!nextLocation) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === POWER) {
        if (gPacman.isSuper) {
            return
        } else startPowerMode()
    } else if (nextCell === CHERRY) updateScore(15)
    else if (nextCell === FOOD) {
        updateScore(1)
        if (foodCount === 0) gameWon()
    }
    else if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            eatGhost(nextLocation)
        } else {
            gameOver()
            renderCell(gPacman.location, EMPTY)
            return
        }
    }
    console.log('foodCount', foodCount);


    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN

    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--;
            break;
        case 'ArrowDown':
            nextLocation.i++;
            break;
        case 'ArrowLeft':
            nextLocation.j--;
            break;
        case 'ArrowRight':
            nextLocation.j++;
            break;
        default:
            return null;
    }
    return nextLocation;
}

function eatGhost(pos) {
    var idx
    var eatenGhost

    // find the ghost and its idx
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i]
        if (ghost.location.i === pos.i && ghost.location.j === pos.j) {
            eatenGhost = ghost
            if (eatenGhost.currCellContent === FOOD){
                eatenGhost.currCellContent=EMPTY
                updateScore(1)
            console.log(eatenGhost.currCellContent);
            if(foodCount===0)gameWon()
            }
            idx = i
        }
    }

    gEatenGhosts.push(eatenGhost)
    gGhosts.splice(idx, 1)

}