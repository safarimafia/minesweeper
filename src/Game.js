import React, { useState } from 'react';
import Board from './Board';
import './Game.css';

const generateBoard = (rows, cols, mines) => {
  const board = Array(rows)
    .fill(null)
    .map(() => Array(cols).fill({ isRevealed: false, isMine: false, adjacentMines: 0, isFlagged: false }));

  let placedMines = 0;
  while (placedMines < mines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    if (!board[row][col].isMine) {
      board[row][col] = { ...board[row][col], isMine: true };
      placedMines += 1;
    }
  }

  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1], /*[0, 0],*/ [0, 1],
    [1, -1], [1, 0], [1, 1]
  ];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (!board[row][col].isMine) {
        let minesCount = 0;
        directions.forEach(([dx, dy]) => {
          const newRow = row + dx;
          const newCol = col + dy;
          if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol].isMine) {
            minesCount++;
          }
        });
        board[row][col] = { ...board[row][col], adjacentMines: minesCount };
      }
    }
  }

  return board;
};

const revealCell = (board, row, col) => {
  if (board[row][col].isRevealed || board[row][col].isFlagged) return board;

  let newBoard = board.slice();
  newBoard[row][col] = { ...newBoard[row][col], isRevealed: true };

  if (newBoard[row][col].adjacentMines === 0 && !newBoard[row][col].isMine) {
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (newRow >= 0 && newRow < newBoard.length && newCol >= 0 && newCol < newBoard[0].length) {
        newBoard = revealCell(newBoard, newRow, newCol);
      }
    });
  }

  return newBoard;
};

const checkWin = (board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (!board[row][col].isRevealed && !board[row][col].isMine) {
        return false;
      }
    }
  }
  return true;
};

function Game() {
  const [board, setBoard] = useState(generateBoard(10, 10, 10));
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const handleClick = (row, col) => {
    if (gameOver || gameWon) return;

    const newBoard = revealCell(board, row, col);

    if (newBoard[row][col].isMine) {
      setGameOver(true);
    } else if (checkWin(newBoard)) {
      setGameWon(true);
    }

    setBoard(newBoard);
  };

  const handleRightClick = (row, col) => {
    if (gameOver || gameWon) return;

    const newBoard = board.slice();
    newBoard[row][col] = { ...newBoard[row][col], isFlagged: !newBoard[row][col].isFlagged };

    setBoard(newBoard);
  };

  const resetGame = () => {
    setBoard(generateBoard(10, 10, 10));
    setGameOver(false);
    setGameWon(false);
  };

  return (
    <div className="game">
      <h1>Minesweeper</h1>
      <Board board={board} onClick={handleClick} onRightClick={handleRightClick} />
      {gameOver && <p>Game Over!</p>}
      {gameWon && <p>Congratulations, You Won!</p>}
      <button onClick={resetGame}>Restart Game</button>
    </div>
  );
}

export default Game;
