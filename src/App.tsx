import React, { useState, useRef, useEffect, CSSProperties } from 'react';
import { mkNextBoardState, Board, mkBoard, mkRandomState } from 'gameOfLife';
import SketchBoard from 'SketchBoard';

export const App = () => {
  const sketchStyles: CSSProperties = {
    width: '100%',
    height: '50vh'
  }

  const ref = useRef<HTMLDivElement>(null);
  const [ size, setSize ] = useState({
    width: 0,
    height: 0
  });

  const [ board, setBoard ] = useState<Board>([[]]);

  useEffect(() => {
    if (ref.current && ref.current.offsetHeight && ref.current.offsetWidth) {
      setSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight
      });
      const b = mkBoard(Math.trunc(ref.current.offsetHeight/12), Math.trunc(ref.current.offsetWidth/12), () => mkRandomState(2));
      setBoard(b);
      console.log(b)
    }
  }, [ref]);

  const playGame = (board: Board) => {
    const next = mkNextBoardState(board);
    setBoard(next);
    if (next.toString() !== board.toString()) {
      console.log('next')
      setTimeout(() => playGame(next), 400);
    } else {
      return;
    }
  }

  return (
    <div className="App">
      <h1>Game of life</h1>
      <button type='button' onClick={() => playGame(board)}>Play!</button>
      <div ref={ref} style={sketchStyles}>
          {
            size.width !== 0 ? (
              <SketchBoard
                board={board}
                cellSize={12}
                height={size.height}
                width={size.width}
              />
            ) : null
          }
        </div>
    </div>
  );
}

export default App;