import { mkBoard, mkRandomState, getNeighbors, mkDelta, mkNextBoardState } from './gameOfLife';

const accumulate = (acc: number, x: number) => acc + x;

describe('mkBoard', () => {
  it('Initializes a board with empty values', () => {
    const board = mkBoard(3, 3, () => 0).flat();
    const total = board.reduce(accumulate, 0);
    expect(total).toBe(0)
  });

  it('Initializes a board with all 1', () => {
    const board = mkBoard(5, 5, () => 1).flat();
    const total = board.reduce(accumulate, 0);
    expect(total).toBe(5*5);
  });
  
});

describe('mkRandomState', () => {
  it('Returns 0 or 1 if max is 2', () => {
    expect(mkRandomState(2)).toBeLessThan(2);
  })
})

describe('getNeighbors', () => {
  it('Returns an array with only 8 elements', () => {
    const board = mkBoard(5, 5, () => mkRandomState(2));
    const x = 3, y = 3;
    expect(getNeighbors(board)(x, y)).toHaveLength(8)
  })

  it('Fills missing neighbors with 0 (corner cases)', () => {
    const board = mkBoard(2, 2, () => 1);
    const x = 0, y = 0;
    expect(getNeighbors(board)(x, y).reduce(accumulate)).toBe(3);
  })
})

describe('mkDelta', () => {
  it('Returns "newBorn" for any dead cell with at least 3 neighbors', () => {
    const xs = [1, 1, 1, 0, 0, 0, 0, 0];
    const self = 0;
    expect(mkDelta(xs, self)).toBe(1)
  });

  it('Returns "Fine" with any live cell for 2 or 3 live neighbors', () => {
    const xs = [1, 1, 0, 0, 0, 0, 0, 0];
    expect(mkDelta(xs, 1)).toBe(0)
  })

  it('Returns "Underpopulation" for any live cell with 0 or 1 live neighbors', () => {
    const xs = [0, 0, 0, 0, 0, 0, 0, 0];
    expect(mkDelta(xs, 1)).toBe(-1);
  })

  it('Returns "Overpopulation" for any live cell with more than 3 live neighbors', () => {
    const xs = [1, 1, 1, 1, 1, 1, 1, 1];
    expect(mkDelta(xs, 1)).toBe(-1)
  })
});

describe('mkNextBoardState', () => {
  
  it('Returns all 0 for a dead board', () => {
    const expected = [0, 0, 0, 0];
    const board = mkBoard(2, 2, () => 0);
    expect(mkNextBoardState(board).flat()).toEqual(
      expect.arrayContaining(expected)
    );
  });

  it('Returns all 0 for a full board', () => {
    const expected = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const board = mkBoard(3, 3, () => 1);
    expect(mkNextBoardState(board).flat()).toEqual(
      expect.arrayContaining(expected)
    );
  })

  it('Returns same board if it\'s whole status is "Fine"', () => {
    const expected = [1, 1, 1, 1];
    const board = mkBoard(2, 2, () => 1);
    expect(mkNextBoardState(board).flat()).toEqual(
      expect.arrayContaining(expected)
    )
  })
})

