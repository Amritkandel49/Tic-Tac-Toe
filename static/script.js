const boardEl = document.getElementById('board');
const statusEl = document.getElementById('status');
let board = Array(9).fill(' ');
let isPlayerTurn = true;
let gameOver = false;

function renderBoard() {
  boardEl.innerHTML = '';
  board.forEach((val, i) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = val;
    if (val === ' ') {
      cell.addEventListener('click', () => makeMove(i));
    }
    boardEl.appendChild(cell);
  });
}

function makeMove(i) {
  if (board[i] !== ' ' || gameOver || !isPlayerTurn) return;
  
  board[i] = 'X';
  isPlayerTurn = false;
  renderBoard();
  
  if (checkGameEnd()) return;
  
  statusEl.textContent = 'AI is thinking...';
  
  fetch('/ai-move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ board })
  })
  .then(res => res.json())
  .then(data => {
    board = data.board;
    isPlayerTurn = true;
    renderBoard();
    
    if (!checkGameEnd()) {
      statusEl.textContent = 'Your turn!';
    }
  });
}

function checkGameEnd() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],  // rows
    [0,3,6],[1,4,7],[2,5,8],  // columns
    [0,4,8],[2,4,6]           // diagonals
  ];
  
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] !== ' ' && board[a] === board[b] && board[b] === board[c]) {
      const winner = board[a];
      statusEl.textContent = `${winner === 'X' ? 'You' : 'AI'} wins!`;
      gameOver = true;
      highlightWinningCells(pattern);
      return true;
    }
  }
  
  if (!board.includes(' ')) {
    statusEl.textContent = `It's a draw!`;
    gameOver = true;
    return true;
  }
  return false;
}

function highlightWinningCells(winningPattern) {
  const cells = document.querySelectorAll('.cell');
  winningPattern.forEach((index, i) => {
    cells[index].classList.add('winning');
    
    // Determine the type of winning line
    if (winningPattern[0] === 0 && winningPattern[2] === 8) {
      // Main diagonal (0,4,8)
      cells[index].classList.add('diagonal-1');
    } else if (winningPattern[0] === 2 && winningPattern[2] === 6) {
      // Anti-diagonal (2,4,6)
      cells[index].classList.add('diagonal-2');
    } else if (winningPattern[0] % 3 === winningPattern[1] % 3) {
      // Vertical line
      cells[index].classList.add('vertical');
    }
    // Horizontal lines use the default ::after styling
  });
}

function makeAIMove() {
  if (gameOver) return;
  
  statusEl.textContent = 'AI is thinking...';
  
  fetch('/ai-move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ board })
  })
  .then(res => res.json())
  .then(data => {
    board = data.board;
    isPlayerTurn = true;
    renderBoard();
    
    if (!checkGameEnd()) {
      statusEl.textContent = 'Your turn!';
    }
  });
}

function initGame() {
  board = Array(9).fill(' ');
  gameOver = false;
  
  // Clear any winning cell styling
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.classList.remove('winning', 'diagonal-1', 'diagonal-2', 'vertical');
  });
  
  // Randomly decide who goes first
  const aiGoesFirst = Math.random() < 0.5;
  isPlayerTurn = !aiGoesFirst;
  
  renderBoard();
  
  if (aiGoesFirst) {
    statusEl.textContent = 'AI goes first!';
    setTimeout(() => makeAIMove(), 1000);
  } else {
    statusEl.textContent = 'Your turn!';
  }
}

// Initialize the game
initGame();

// Create Play Again button
const playAgainBtn = document.createElement('button');
playAgainBtn.textContent = 'Play Again';
playAgainBtn.addEventListener('click', initGame);
document.body.appendChild(playAgainBtn);
