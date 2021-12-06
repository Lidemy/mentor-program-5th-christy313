function countTotal(board, currentY, currentX, directionY, directionX) {
  const now = board[currentY][currentX];

  let tempX = currentX;
  let tempY = currentY;
  let total = 0;

  do {
    tempX += directionX;
    tempY += directionY;

    if (tempY === -1 || tempY === 19 || tempX === -1 || tempX === 19) break;

    if (board[tempY][tempX] === now) {
      total++;
    } else {
      break;
    }
  } while (true);
  return total;
}

export function findWinner(board, y, x) {
  if (
    countTotal(board, y, x, 1, 0) + countTotal(board, y, x, -1, 0) >= 4 ||
    countTotal(board, y, x, 0, 1) + countTotal(board, y, x, 0, -1) >= 4 ||
    countTotal(board, y, x, 1, 1) + countTotal(board, y, x, -1, -1) >= 4 ||
    countTotal(board, y, x, 1, -1) + countTotal(board, y, x, -1, 1) >= 4
  ) {
    return board[y][x];
  }

  if (board.every((row) => row.every((col) => col))) {
    return "draw";
  }
}
