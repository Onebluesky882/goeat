import { useState } from "react";
import TableIcon from "../../assets/table-restaurant.svg?react";
import { v4 as uuidv4 } from "uuid";
import {
  DndContext,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";

// Left sidebar
const SideBar = ({ activeId }: { activeId: string | null }) => {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: "table-id",
  });

  return (
    <div>
      <h2>Objects List</h2>
      <div className="relative h-40">
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          className="p-2 cursor-pointer shadow-2xl bg-white border border-gray-200 rounded-2xl inline-block"
        >
          <TableIcon
            className={`w-10 h-10 text-blue-500 fill-current transition-all duration-200 ${
              activeId === "table-id" ? "opacity-50" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

// Grid builder
const BuildingGrids = ({
  columns,
  rows,
  onClick,
  droppedTables,
  dragOverId,
}: {
  rows: number;
  columns: number;
  onClick: (index: number) => void;
  droppedTables: { [key: number]: string };
  dragOverId: string | null;
}) => {
  const grids = [];

  for (let row = 0; row < rows; row++) {
    const rowItems = [];
    for (let col = 0; col < columns; col++) {
      const index = row * columns + col;

      const { setNodeRef } = useDroppable({
        id: index.toString(),
      });

      rowItems.push(
        <div
          key={index}
          ref={setNodeRef}
          onClick={() => onClick(index)}
          onDragOver={(e) => e.preventDefault()}
          className={`flex justify-center border items-center w-8 h-8 text-center text-[6px] rounded-full ${
            dragOverId === index.toString()
              ? "bg-green-300 border-white text-black font-bold"
              : "bg-gray-50 text-gray-500"
          } hover:bg-green-200 hover:border-white hover:text-black hover:font-bold`}
        >
          {droppedTables[index] ? (
            <TableIcon className="w-6 h-6 text-blue-500 fill-current" />
          ) : (
            index
          )}
        </div>
      );
    }

    grids.push(
      <div className="flex gap-1 m-2" key={`row-${row}`}>
        {rowItems}
      </div>
    );
  }
  return <div>{grids}</div>;
};

// Main layout
const TemTableLayout = () => {
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

export default TemTableLayout;
