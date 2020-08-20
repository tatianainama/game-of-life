import React, { CSSProperties } from 'react';
import { Board as BoardType } from 'gameOfLife';

type BoardProps = {
  board: BoardType
}

export const Board: React.FunctionComponent<BoardProps> = ({ board }) => {
  const rowStyle: CSSProperties = {
    display: 'flex',
    height: '64px'
  };

  const cellStyle = (col: number): CSSProperties => ({
    width: '64px',
    backgroundColor: col ? 'black' : 'white'
  });

  return (
    <div>
      {
        board.map((row, i) => (
          <div key={i} style={rowStyle}>
            {
              row.map((col, j) => (
                <div key={j} style={cellStyle(col)}></div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default Board;