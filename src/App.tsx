import React, { useState } from 'react';
import { printQtBoard, mkNextBoardState } from 'gameOfLife';
import Board from 'Board';

export const App = () => {
  const [ board, setBoard ] = useState(
    [
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 1, 0, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 1, 0],
      [0, 0, 1, 1, 1, 0],
      [0, 0, 0, 0, 0, 0]
    ]
  );

  printQtBoard(board);
  const board2 = mkNextBoardState(board);
  printQtBoard(board2);
  printQtBoard(mkNextBoardState(board2));
  return (
    <div className="App">
      <h1>Game of life</h1>
      <button type='button' onClick={() => setBoard(mkNextBoardState(board))}>Next state</button>
      <Board board={board} />
    </div>
  );
}

export default App;