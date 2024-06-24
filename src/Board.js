import React from 'react';
import Cell from './Cell';
import './Board.css';

function Board({ board, onClick, onRightClick }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            row={rowIndex}
            col={colIndex}
            isRevealed={cell.isRevealed}
            isMine={cell.isMine}
            adjacentMines={cell.adjacentMines}
            onClick={onClick}
            onRightClick={onRightClick}
            isFlagged={cell.isFlagged}
          />
        ))
      )}
    </div>
  );
}

export default Board;
