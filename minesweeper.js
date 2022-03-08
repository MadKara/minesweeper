const TILE_STATUSES = {
    HIDDEN: 'hidden',
    MINE: 'mine',
    NUMBER: 'number',
    MARKED: 'marked'
}

export function createBoard(boardSize, numberOfMines){
    const board = []
    const minesPositions = getMinesPosition(boardSize, numberOfMines)

    for(let x = 0; x < boardSize; x++){
        const row = []
        for(let y = 0; y < boardSize; y++){
            const element = document.createElement('div')
            element.dataset.status = TILE_STATUSES.HIDDEN
            const tile = {
                element,
                x,
                y,
                mine: minesPositions.some(positionMatch.bind(null, { x, y })),
                get status(){
                    return this.element.dataset.status
                }, 
                set status(value){
                    this.element.dataset.status = value
                }
            }
            row.push(tile)
        }
        board.push(row)
    }
    return board
}

export function markTile(tile){
    if(tile.status !== TILE_STATUSES.HIDDEN && tile.status !== TILE_STATUSES.MARKED){
        return
    }

    if(tile.status === TILE_STATUSES.MARKED){
        tile.status = TILE_STATUSES.HIDDEN
    } else {
        tile.status = TILE_STATUSES.MARKED
    }
}

function getMinesPosition(boardSize, numberOfMines){
    const positions = []

    while(positions.length < numberOfMines){
        const position = {
            x: randomPosition(boardSize),
            y: randomPosition(boardSize)
        }

        if(!positions.some(positionMatch.bind(null, position))){
            positions.push(position)
        }

    }
    return positions
}

function randomPosition(size){
    return Math.floor(Math.random() * size)
}

function positionMatch(a, b){
    return a.x === b.x && a.y === b.y
}