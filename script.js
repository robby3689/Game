// Add this code in your script.js file

document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.cell');
    const gameStatus = document.getElementById('game-status');
    const restartButton = document.getElementById('restart-btn');
  
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];
  
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  
    const checkWin = () => {
      for (let i = 0; i < winPatterns.length; i++) {
        const [a, b, c] = winPatterns[i];
        if (gameState[a] !== '' && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
          gameActive = false;
          return gameState[a];
        }
      }
      if (!gameState.includes('')) {
        gameActive = false;
        return 'draw';
      }
      return null;
    };
  
    const handleCellClick = (e) => {
      const cell = e.target;
      const cellIndex = parseInt(cell.getAttribute('data-cell'));
  
      if (gameState[cellIndex] !== '' || !gameActive) return;
  
      gameState[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;
      cell.classList.add(`player-${currentPlayer}`);
  
      const result = checkWin();
  
      if (result === 'draw') {
        gameStatus.textContent = "It's a draw!";
      } else if (result) {
        gameStatus.textContent = `${result} wins!`;
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        gameStatus.textContent = `Player ${currentPlayer}'s turn`;
      }
    };
  
    const handleRestart = () => {
      currentPlayer = 'X';
      gameActive = true;
      gameState = ['', '', '', '', '', '', '', '', ''];
      gameStatus.textContent = `Player ${currentPlayer}'s turn`;
      cells.forEach((cell) => {
        cell.textContent = '';
        cell.classList.remove('player-X', 'player-O');
      });
    };
  
    cells.forEach((cell) => {
      cell.addEventListener('click', handleCellClick);
    });
  
    restartButton.addEventListener('click', handleRestart);
  });
  