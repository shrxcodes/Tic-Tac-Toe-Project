let currentPlayer = 'X';
let board = Array(9).fill(null);
const winAudio = new Audio('win.wav'); // Make sure win.mp3 is in the public folder
const xSound = new Audio('x.mp3');
const oSound = new Audio('o.mp3');
const drawSound = new Audio('draw.mp3');


// Function to create the Tic Tac Toe board
function createBoard() {
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';
  board.forEach((value, i) => {
    const cell = document.createElement('div');
    cell.classList.add('square');
    cell.innerText = value || '';
    cell.onclick = () => handleClick(i);
    boardDiv.appendChild(cell);
  });
}

// Handle click event on the board
function handleClick(index) {
    if (board[index] || checkWinner()) return;
    board[index] = currentPlayer;
  
    if (currentPlayer === 'X') {
      xSound.play();
    } else {
      oSound.play();
    }
  
    createBoard();
  
    const winner = checkWinner();
    if (winner) {
      document.getElementById('winner').innerText = `${winner} wins! 🎉`;
      winAudio.play(); // This will play the win sound
      saveGame(winner);
    } else if (!board.includes(null)) {
      // It's a draw!
      document.getElementById('winner').innerText = `It's a draw! 🤝`;
      drawSound.play(); // <-- Play draw sound
      saveGame('Draw');
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
  

// Check for a winner
function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winner ('X' or 'O')
    }
  }
  return null; // No winner yet
}

// Reset the game
function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  document.getElementById('winner').innerText = '';
  createBoard();

  // Stop and reset all audio
  winAudio.pause();
  winAudio.currentTime = 0;

  drawSound.pause();
  drawSound.currentTime = 0;

  xSound.pause();
  xSound.currentTime = 0;

  oSound.pause();
  oSound.currentTime = 0;
}


// Save the game winner (send to server)
function saveGame(winner) {
  fetch('/save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ winner })
  });
}

// Play the win sound and show the celebration video
function playWinEffect() {
    winAudio.play();
  }
  
// Initialize the game
createBoard();
