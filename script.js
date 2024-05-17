const boardElement = document.getElementById("board");
const startBtn = document.getElementById("startBtn");
const messageElement = document.getElementById("message");

let board = [
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
  ["-", "-", "-", "-"],
];

function updateMessage(message) {
  messageElement.textContent = message;
}

function printBoard() {
  const cells = boardElement.querySelectorAll("td");
  cells.forEach((cell, index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    cell.textContent = board[row][col];

    if (board[row][col] === "X") {
      cell.classList.add("x-move");
      cell.classList.remove("o-move");
    } else if (board[row][col] === "O") {
      cell.classList.add("o-move");
      cell.classList.remove("x-move");
    } else {
      cell.classList.remove("x-move");
      cell.classList.remove("o-move");
    }
  });
}

function checkWinner() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (
        j + 2 < 4 &&
        board[i][j] === "X" &&
        board[i][j + 1] === "X" &&
        board[i][j + 2] === "X" &&
        i + 1 < 4 &&
        board[i + 1][j] === "X"
      ) {
        return "X";
      }
      if (
        j + 2 < 4 &&
        board[i][j] === "O" &&
        board[i][j + 1] === "O" &&
        board[i][j + 2] === "O" &&
        i + 1 < 4 &&
        board[i + 1][j] === "O"
      ) {
        return "O";
      }

      if (
        i + 2 < 4 &&
        board[i][j] === "X" &&
        board[i + 1][j] === "X" &&
        board[i + 2][j] === "X" &&
        j + 1 < 4 &&
        board[i][j + 1] === "X"
      ) {
        return "X";
      }
      if (
        i + 2 < 4 &&
        board[i][j] === "O" &&
        board[i + 1][j] === "O" &&
        board[i + 2][j] === "O" &&
        j + 1 < 4 &&
        board[i][j + 1] === "O"
      ) {
        return "O";
      }
    }
  }
  return null;
}

function isBoardFull() {
  for (let row of board) {
    if (row.includes("-")) {
      return false;
    }
  }
  return true;
}

function computerMove(player) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === "-") {
        board[i][j] = player;
        if (checkWinner() === player) {
          return;
        } else {
          board[i][j] = "-";
        }
      }
    }
  }

  while (true) {
    let row = Math.floor(Math.random() * 4);
    let col = Math.floor(Math.random() * 4);
    if (board[row][col] === "-") {
      board[row][col] = player;
      break;
    }
  }
}

function startGame() {
  board = [
    ["-", "-", "-", "-"],
    ["-", "-", "-", "-"],
    ["-", "-", "-", "-"],
    ["-", "-", "-", "-"],
  ];
  printBoard();

  let currentPlayer = "X";

  function performComputerMove() {
    setTimeout(() => {
      computerMove(currentPlayer);
      printBoard();
      let winner = checkWinner();
      if (winner) {
        updateMessage(`${winner} wins!`);
      } else if (isBoardFull()) {
        updateMessage("It's a tie!");
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        performComputerMove();
      }
    }, 1000);
  }

  performComputerMove();
}

function cellClicked(row, col) {
  if (board[row][col] === "-") {
    board[row][col] = "X";
    printBoard();
    let winner = checkWinner();
    if (winner) {
      updateMessage(`${winner} wins!`);
    } else if (isBoardFull()) {
      updateMessage("It's a tie!");
    } else {
      computerMove("O");
      printBoard();
      winner = checkWinner();
      if (winner) {
        updateMessage(`${winner} wins!`);
      } else if (isBoardFull()) {
        updateMessage("It's a tie!");
      }
    }
  }
}
