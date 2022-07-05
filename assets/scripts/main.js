window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const btnReset = document.getElementById('reset');
    const announcer = document.querySelector('.announcer');

    let board = ['','','','','','','','',''];
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

    const handleResultValidation = () => {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = conditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break; 
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? playerXWon : playerOWon);
            isGameActive = false;
            return;
        }
        if (!board.includes('')) {
            announce(tie);
        }
    }

    const announce = (type) => {
        switch(type) {
            case playerOWon:
                announcer.innerHTML = 'Player O Wins';
                break;
            case playerXWon:
                announcer.innerHTML = 'Player X Wins';
                break;
            case tie:
                announcer.innerHTML = 'Tie';
        }
        announcer.classList.remove('hide');
    }   

    const isValidAction = (tile) => {
        if (tile.innerHTML === 'X' || tile.innerHTML === 'O') {
            return false;
        }

        return true;
    }

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

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
        tile.addEventListener('click', () => userAction(tile,index))
    })

    btnReset.addEventListener('click', () => {
        board = ['','','','','','','','',''];
        isGameActive = true;
        announcer.classList.add('hide');
        
        if (currentPlayer === 'O') {
            changePlayer()
        }

        tiles.forEach(tile => {
            tile.innerHTML = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    });
})