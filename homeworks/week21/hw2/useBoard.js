import { useState, useRef, useEffect, useCallback } from "react";
import { findWinner } from "./utils.js";

export default function useBoard() {
  const [board, setBoard] = useState(Array(19).fill(Array(19).fill(null)));

  const updateBoard = useCallback((y, x, newValue) => {
    setBoard((board) =>
      board.map((row, currentY) => {
        if (currentY !== y) return row;

        return row.map((col, currentX) => {
          if (currentX !== x) return col;
          return newValue;
        });
      })
    );
  }, []);

  const isBlackNext = useRef(true);
  const lastRow = useRef();
  const lastCol = useRef();

  const handlePieceClick = (row, col, value) => {
    if (!winner) {
      if (value) return;
      lastRow.current = row;
      lastCol.current = col;
      updateBoard(row, col, isBlackNext.current ? "black" : "white");
      isBlackNext.current = !isBlackNext.current;
    }
  };

  const [winner, setWinner] = useState();

  useEffect(() => {
    if (lastRow.current === undefined || lastCol.current === undefined) return;
    setWinner(findWinner(board, lastRow.current, lastCol.current));
  }, [board]);

  const playAgain = useCallback(() => {
    window.location.reload();
  }, []);

  return {
    board,
    winner,
    handlePieceClick,
    playAgain,
  };
}
