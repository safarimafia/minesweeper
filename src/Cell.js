import React from 'react';
import './Cell.css';

function Cell({ row, col, isRevealed, isMine, adjacentMines, onClick, onRightClick, isFlagged }) {
  const handleClick = () => onClick(row, col);
  const handleRightClick = (e) => {
    e.preventDefault();
    onRightClick(row, col);
  };

  return (
    <div
      className={`cell ${isRevealed ? (isMine ? 'mine' : 'revealed') : ''} ${isFlagged ? 'flagged' : ''}`}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {isRevealed && !isMine && adjacentMines > 0 ? adjacentMines : ''}
      {isFlagged && !isRevealed ? '🚩' : ''}
    </div>
  );
}

export default Cell;
