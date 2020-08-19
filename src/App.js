import React from 'react';
import { Stage, Layer, Text } from 'react-konva';

import './App.css';

const mkLifeState = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const mkGameBoard = (width, height) => {
  const board = Array.from({ length: height }, (_, i) => Array.from({ length: width }, (_, j) => mkLifeState(2)));
  return board;
}

const printBoard = (board) => {
  console.log(`${board.map(row => row.map(i => i ? '#' : ' ').join(' ')).join('\n')}`)
}

function App() {
  const board = mkGameBoard(10, 10);
  printBoard(board);
  return (
    <div className="App">
      <Stage width={300} height={300}>
        <Layer>
          <Text text="Game of life"></Text>
        </Layer>

      </Stage>
    </div>
  );
}

export default App;
