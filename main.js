window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const btnReset = document.getElementById('reset');
    const announcer = document.querySelector('.announcer');

    const board = ['','','','','','','','',''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const playerXWon = 'PlayerX_Won';
    const playerOWon = 'PlayerO_Won';
    const tie = 'TIE';

    /*   Index Board
        [0]  [1]  [2]
        [3]  [4]  [5]
        [6]  [7]  [8]
    */

    const conditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const updateBoard = () => {}

    const handleResultValidation = () => {}

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerHTML = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`)
    }


    const userAction = (tile,index) => {
        if(isValidAction(tile) && isGameActive) {
            tile.innerHTML = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    tiles.forEach((tile,index) => {
        tiles.addEventListener('click', () => userAction(tile,index))
    })


    btnReset.addEventListener('click', () => {

    })
})