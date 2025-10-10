# React + Vite

## optimised solution
```
import "./ChessBoard.css";
import { useMemo, useState, useRef } from "react";

const boardSize = 8;

export default function ChessBoard() {
  const [pawnPosition, setPawnPosition] = useState(null);
  const lastKeyRef = useRef(null);

  const onMouseOver = (e) => {
    const el = e.target.closest("[data-row][data-col]");
    if (!el) return;
    const row = +el.dataset.row;
    const col = +el.dataset.col;
    const key = `${row}-${col}`;
    if (lastKeyRef.current !== key) {
      lastKeyRef.current = key;
      setPawnPosition({ row, col });
    }
  };

  const onMouseOut = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      lastKeyRef.current = null;
      setPawnPosition(null);
    }
  };

  const highlighted = useMemo(() => {
    if (!pawnPosition) return [];
    const { row, col } = pawnPosition;
    if (row === boardSize - 2) return [{ row: row - 1, col }, { row: row - 2, col }];
    if (row >= 1 && row <= 5) return [{ row: row - 1, col }];
    return [];
  }, [pawnPosition]);

  const isHighlighted = (r, c) =>
    highlighted.some((cell) => cell.row === r && cell.col === c);

  const isHovered =
    pawnPosition && ((r, c) => pawnPosition.row === r && pawnPosition.col === c);

  return (
    <div className="board" onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
      {Array.from({ length: boardSize }).map((_, row) =>
        Array.from({ length: boardSize }).map((_, col) => {
          const isLight = (row + col) % 2 === 0;
          const cls = [
            "cell",
            isLight ? "light" : "dark",
            isHighlighted(row, col) ? "highlight" : "",
            isHovered && isHovered(row, col) ? "hovered" : "",
          ].join(" ");
          return (
            <div
              key={`${row}-${col}`}          {/* <-- also fix your template string */}
              data-row={row}
              data-col={col}
              className={cls}
            >
              {isHovered && isHovered(row, col) && <span className="pawn">♙</span>}
            </div>
          );
        })
      )}
    </div>
  );
}
```