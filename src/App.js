import React, { useState } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  function handleClick(index) {
    if (winner || board[index]) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = xIsNext ? 'X' : 'O';

    setBoard(newBoard);
    setXIsNext(!xIsNext);
  }

  function renderSquare(index) {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  }

  function calculateWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const line of lines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  function renderStatus() {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (!board.includes(null)) {
      return 'It\'s a draw!';
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  }

  return (
    <>
    <h1>Tic-Tac-Toe</h1>
    <div className="game">
      <div className="game-board">
        {board.map((value, index) => (
          <div key={index} className="square-container">
            {renderSquare(index)}
          </div>
        ))}
      </div>
      <div className="game-info">
        <div>{renderStatus()}</div>
        <button className="restart-button" onClick={() => setBoard(Array(9).fill(null))}>
          Restart
        </button>
      </div>
    </div>
    </>
  );
}

export default App;
