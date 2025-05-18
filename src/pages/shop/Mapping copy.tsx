import React, { useState, useCallback } from "react";
import { DndContext, type DragEndEvent, DragOverlay } from "@dnd-kit/core";
import type { Building, BuildingType } from "../../../types/buildMapping";
import GameInfo from "@/components/MapTables/GameInfo";
import Sidebar from "@/components/MapTables/Sidebar";
import Grid from "@/components/MapTables/Grid";
import BuildingIcon from "@/components/MapTables/BuildingIcon";
import { generateEmptyGrid, GRID_SIZE } from "@/utils/contants";

const Mapping: React.FC = () => {
  const [grid, setGrid] = useState(
    generateEmptyGrid(GRID_SIZE.rows, GRID_SIZE.cols)
  );
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [activeBuildingType, setActiveBuildingType] =
    useState<BuildingType | null>(null);

  const handleDragStart = useCallback((event: any) => {
    const { active } = event;
    if (active.data.current?.type === "building") {
      setActiveBuildingType(active.data.current.building);
    }
  }, []);
  const idGrid = "";
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      setActiveBuildingType(null);

      if (!over || active.data.current?.type !== "building") return;

      const cellData = over.data.current;
      if (
        cellData?.type === "cell" &&
        grid[cellData.row][cellData.col] === null
      ) {
        const { row, col } = cellData;
        const buildingType = active.data.current.building.id;

        // Create a new building
        const newBuilding: Building = {
          id: idGrid,
          type: buildingType,
          position: { row, col },
        };

        // Update the grid
        const newGrid = [...grid];
        newGrid[row][col] = newBuilding;

        // Update state
        setGrid(newGrid);
        setBuildings([...buildings, newBuilding]);
      }
    },
    [grid, buildings]
  );

  const handleRemoveBuilding = useCallback(
    (row: number, col: number) => {
      if (!grid[row][col]) return;

      const buildingIdToRemove = grid[row][col]?.id;

      // Update the grid
      const newGrid = [...grid];
      newGrid[row][col] = null;

      // Update buildings list
      const newBuildings = buildings.filter((b) => b.id !== buildingIdToRemove);

      setGrid(newGrid);
      setBuildings(newBuildings);
    },
    [grid, buildings]
  );

  return (
    <div className="flex flex-col h-screen">
      <GameInfo buildings={buildings} />
      <div className="flex flex-1 overflow-hidden">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <Sidebar />
          <Grid grid={grid} onRemoveBuilding={handleRemoveBuilding} />

          <DragOverlay>
            {activeBuildingType && (
              <div className="building-item opacity-80">
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-md mb-1"
                  style={{ backgroundColor: `${activeBuildingType.color}20` }}
                >
                  <BuildingIcon
                    icon={activeBuildingType.icon}
                    color={activeBuildingType.color}
                  />
                </div>
                <span className="text-xs font-medium">
                  {activeBuildingType.name}
                </span>
              </div>
            )}
          </DragOverlay>
        </DndContext>
      </div>
    </div>
  );
};

export default Mapping;
