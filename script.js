import { createBoard, markTile } from "./minesweeper.js";

const BOARD_SIZE = 5
const NUMBER_OF_MINES = 2

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector('.board')
const minesCountText = document.querySelector('[data-mines-count]')
minesCountText.textContent = NUMBER_OF_MINES

boardElement.style.setProperty("--size", BOARD_SIZE)

board.forEach(row => {
    row.forEach(tile => {
        boardElement.append(tile.element)
        tile.element.addEventListener('click', () => {

        })
        tile.element.addEventListener('contextmenu', e => {
            e.preventDefault()
            markTile(tile)
            console.log(tile)
        })
    })
})
