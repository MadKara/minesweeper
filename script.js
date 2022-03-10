import { TILE_STATUSES, createBoard, markTile, revealTile, checkWin, checkLose } from "./minesweeper.js";

const BOARD_SIZE = 10
const NUMBER_OF_MINES = 5

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
const minesCountText = document.querySelector('[data-mines-count]')
minesCountText.textContent = NUMBER_OF_MINES
const messageText = document.querySelector('.subtext')

boardElement.style.setProperty("--size", BOARD_SIZE)

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener('click', () => {
            revealTile(board, tile)
            checkGameCondition()
        })
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault()
            markTile(tile)
            leftMinesCount()
        })
    })
})

function leftMinesCount() {
    const minesCount = board.reduce((count, row) => {
        return count + row.filter(tile => tile.status === TILE_STATUSES.MARKED).length
    }, 0)

    minesCountText.textContent = NUMBER_OF_MINES - minesCount
}

function checkGameCondition() {
    const win = checkWin(board)
    const lose = checkLose(board)

    if(win || lose) {
        boardElement.addEventListener('click', stopProp, { capture: true })
        boardElement.addEventListener('contextmenu', stopProp, { capture: true })
    }

    if(win) {
        messageText.textContent = 'You Win!'
    }

    if(lose) {
        messageText.textContent = 'You Lose!'
        board.forEach(row => {
            row.forEach(tile => {
                if(tile.status === TILE_STATUSES.MARKED) markTile(tile)
                if(tile.mine) revealTile(board, tile)
            })
        })
    }
}

function stopProp(e) {
    e.stopImmediatePropagation()
}