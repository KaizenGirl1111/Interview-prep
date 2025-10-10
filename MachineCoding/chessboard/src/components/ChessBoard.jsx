import "./ChessBoard.css";
import { useState } from "react";

const boardSize = 8;

export default function ChessBoard() {
  const [pawnPosition, setPawnPosition] = useState(null); // {row, col} | null
  const [highlighted, setHighlighted] = useState([]);     // [{row, col}, ...]

  const handleMouseEnter = (row, col) => {
    setPawnPosition({ row, col });
    if (row === boardSize-2) {
      const moves = [{ row: row - 1, col },{row:row-2,col}];
      setHighlighted(moves);
    } else if (row >= 1 && row <= 5) {
      setHighlighted([{ row: row - 1, col }]);
    } else {
      setHighlighted([]);
    }
  };

  const handleMouseLeave = () => {
    setHighlighted([]);
    setPawnPosition(null);
  };

  const isHighlighted = (r, c) =>
    highlighted.some((cell) => cell.row === r && cell.col === c);

  const isHovered = (r, c) =>
    pawnPosition && pawnPosition.row === r && pawnPosition.col === c;

  return (
    <div className="board">
      {Array.from({ length: boardSize }).map((_, row) =>
        Array.from({ length: boardSize }).map((_, col) => {
          const isLight = (row + col) % 2 === 0;
          const cellClasses = [
            "cell",
            isLight ? "light" : "dark",
            isHighlighted(row, col) ? "highlight" : "",
            isHovered(row, col) ? "hovered" : "",
          ].join(" ");

          return (
            <div
              key={`${row}-${col}`}
              className={cellClasses}
              onMouseEnter={() => handleMouseEnter(row, col)}
              onMouseLeave={handleMouseLeave}
            >
              {isHovered(row, col) ? <span className="pawn">♙</span> : null}
            </div>
          );
        })
      )}
    </div>
  );
}
