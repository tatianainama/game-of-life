import React, { FunctionComponent, useRef, useEffect } from 'react';

type props = {
  width: number,
  height: number,
  cellSize: number,
  board: Array<Array<number>>
}

export const SketchBoard: FunctionComponent<props> = ({ width, height, cellSize, board }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const context = canvasRef.current && canvasRef.current.getContext('2d');
    if (context !== null) {
      context.strokeStyle = '#c0c0c0';
      board.forEach((row, i) => row.forEach((status, j) => {
        context.fillStyle = status ? 'black' : 'white';
        context.strokeRect(j * cellSize, i * cellSize, cellSize, cellSize);
        context.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
      }))
    }
  }, [canvasRef, board, cellSize]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
      ></canvas>
    </div>
  )
}

export default SketchBoard;