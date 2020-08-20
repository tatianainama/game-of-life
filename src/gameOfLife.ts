
export type Board = Array<Array<number>>;
type Neighbors = Array<number>;

enum NeighborState {
  Underpopulated = -1,
  Fine = 0,
  Overpopulated = -1,
  NewBorn = 1
};

export const mkBoard = (rows: number, columns: number, mkValue: () => number ): Board => {
  return  Array.from(
    { length: rows },
    (_, row) => Array.from(
      { length: columns },
      (_, col) => mkValue()
    )
  );
}

export const mkRandomState = (max: number) => {
  return Math.floor(Math.random() * Math.floor(max));
}

export const printBoard = (board: Board) => {
  console.log(`${board.map(row => row.join(' ')).join('\n')}`);
}

export const printQtBoard = (board: Board) => {
  console.log(`${board.map(row => row.map(x => x ? '#' : ' ').join(' ')).join('\n')}`)
}

export const getNeighbors = (board: Board) => (x: number, y: number): Neighbors => {
  const cell = (x: number, y: number) => {
    return (board[x] && board[x][y]) || 0;
  }

  return [
    cell(x-1, y-1), cell(x-1, y), cell(x-1, y+1),
    cell(x,   y-1),               cell(x,   y+1),
    cell(x+1, y-1), cell(x+1, y), cell(x+1, y+1)
  ]
}

export const mkDelta = (neighbors: Neighbors, self: number): NeighborState => {
  const neighborhoodValue = neighbors.reduce<number>((total, x) => total + x, 0);
  if (self === 0) {
    if (neighborhoodValue === 3) {
      return NeighborState.NewBorn;
    } else {
      return NeighborState.Fine
    }
  }
  if (neighborhoodValue <= 1) {
    return NeighborState.Underpopulated;
  }
  if (neighborhoodValue === 2 || neighborhoodValue === 3) {
    return NeighborState.Fine
  }
  if (neighborhoodValue > 3) {
    return NeighborState.Overpopulated;
  }
  return NeighborState.Fine;
}

export const mkNextBoardState = (board: Board): Board => {
  const mkNeighborhood = getNeighbors(board);
  return board.map((_, row) => {
    return board[row].map((_, col) => {
      const current = board[row][col];
      const neighbors = mkNeighborhood(row, col);
      return current + mkDelta(neighbors, current);
    })
  })
} 

export default {
  mkBoard,
  mkRandomState,
  printBoard,
  getNeighbors,
  mkDelta,
  mkNextBoardState,
  printQtBoard
}