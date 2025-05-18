import React from "react";
import type { Building } from "types/buildMapping";
import GridCell from "./GridCell";

interface GridProps {
  grid: (Building | null)[][];
  onRemoveBuilding: (row: number, col: number) => void;
}

const Grid: React.FC<GridProps> = ({ grid, onRemoveBuilding }) => {
  return (
    <div className="grid-container p-4 flex-1 overflow-auto">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${grid[0].length}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${grid.length}, minmax(0, 1fr))`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <GridCell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              building={cell}
              onRemoveBuilding={onRemoveBuilding}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
