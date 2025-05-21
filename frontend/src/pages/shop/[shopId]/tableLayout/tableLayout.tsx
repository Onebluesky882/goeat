import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import SideBar from "@/components/TableLayout/SideBar";
import BuildingGrids from "@/components/TableLayout/BuildingGrid";
import TableIcon from "../../../../assets/table-restaurant.svg?react";

// Main layout
const TableLayout = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dragOverlayStyle] = useState<React.CSSProperties>({});
  const [_indexTable, setIndexTable] = useState<number[]>([]);
  const [droppedTables, setDroppedTables] = useState<{ [key: number]: string }>(
    {}
  );
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleGetIndexValue = (index: number) => {
    setIndexTable((prev) => [...prev, index]);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActiveId(active.id as string);
      }}
      onDragEnd={({ over, active }) => {
        if (over) {
          const index = Number(over.id);
          const updated = {
            ...droppedTables,
            [index]: String(active.id),
          };
          setDroppedTables(updated);

          const tableRecords = Object.entries(updated).map(
            ([gridIndex, id]) => ({
              id: uuidv4(),
              gridPosition: Number(gridIndex),
              name: "Table 1",
            })
          );
          console.log("Ready for DB insert:", tableRecords);
        }
        setActiveId(null);
        setDragOverId(null);
      }}
      onDragOver={({ over }) => {
        setDragOverId((over?.id as string) ?? null);
      }}
    >
      <div className="p-4 grid grid-cols-8">
        <div className="outline-1 outline-gray-50 px-2 text-center pt-2 flex flex-col col-span-1 rounded-sm mx-2 bg-white shadow-2xl items-center">
          <SideBar activeId={activeId} />
        </div>

        <div className="outline-1 bg-white outline-gray-50 rounded-sm flex flex-col justify-between col-span-7 items-center overflow-auto">
          <h2>Map</h2>
          <div className="flex flex-col justify-between">
            <BuildingGrids
              rows={30}
              columns={30}
              onClick={handleGetIndexValue}
              droppedTables={droppedTables}
              dragOverId={dragOverId}
            />
          </div>
        </div>
      </div>

      <DragOverlay
        adjustScale={false}
        dropAnimation={null}
        style={dragOverlayStyle}
      >
        {activeId === "table-id" && (
          <div>
            <TableIcon className="w-6 h-6 text-blue-500 fill-current" />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
};

export default TableLayout;
