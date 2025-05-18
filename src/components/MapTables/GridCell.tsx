import React from "react";
import { useDroppable } from "@dnd-kit/core";
import BuildingIcon from "./BuildingIcon";
import { BUILDING_TYPES } from "@/utils/contants";
import type { GridCellProps } from "types/buildMapping";

const GridCell: React.FC<GridCellProps> = ({
  row,
  col,
  building,
  onRemoveBuilding,
}) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `cell-${row}-${col}`,
    data: {
      type: "cell",
      row,
      col,
    },
  });

  const buildingType = building
    ? BUILDING_TYPES.find((type) => type.id === building.type)
    : null;

  const handleClick = () => {
    if (building) {
      onRemoveBuilding(row, col);
    }
  };

  return (
    <div
      ref={setNodeRef}
      className={`grid-cell aspect-square ${isOver ? "can-drop" : ""}`}
      onClick={handleClick}
    >
      {building && buildingType && (
        <div
          className="building"
          style={{ backgroundColor: `${buildingType.color}30` }}
        >
          <BuildingIcon icon={buildingType.icon} color={buildingType.color} />
        </div>
      )}
    </div>
  );
};

export default GridCell;
