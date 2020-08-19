import React from 'react';
import { mkBoard, mkRandomState, printBoard, mkNextBoardState } from 'gameOfLife';

export const App = () => {
  const board = mkBoard(5, 5, () => mkRandomState(2));
  printBoard(board);
  const board2 = mkNextBoardState(board);
  printBoard(board2);
  return (
    <div className="App">
      <h1>Game of life</h1>
    </div>
  );
}

export default App;