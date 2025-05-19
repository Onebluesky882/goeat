import { useState } from "react";
import TableIcon from "../../assets/table-restaurant.svg?react";
import {
  DndContext,
  PointerSensor,
  useDraggable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const TableLayoutManager = () => {
  const [indexTable, setIndexTable] = useState<number[]>([]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );
  const handleGetIndexValue = (index: number) => {
    setIndexTable((prev) => [...prev, index]);
  };

  const handleDragEnd = (e: any) => {
    console.log("✅ Drag Ended:", e);
  };
  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="p-4 grid grid-cols-8 ">
        <div className="outline-1 outline-gray-50  px-2 text-center pt-2 flex flex-col col-span-1 rounded-sm mx-2 bg-white shadow-2xl items-center">
          <SideBar />
        </div>
        <div className="outline-1 bg-white outline-gray-50 rounded-sm flex flex-col justify-between col-span-7 items-center overflow-auto">
          <h2>Map </h2>
          <div className=" flex flex-col justify-between ">
            <BuildingGrids
              rows={30}
              columns={30}
              onClick={handleGetIndexValue}
            />
          </div>
        </div>
      </div>
    </DndContext>
  );
};

const BuildingGrids = ({
  columns,
  rows,
  onClick,
}: {
  rows: number;
  columns: number;
  onClick: (index: number) => void;
}) => {
  let grids = [];

  for (let row = 0; row < rows; row++) {
    const rowItems = [];
    for (let col = 0; col < columns; col++) {
      const index = row * columns + col;

      rowItems.push(
        <div
          key={index}
          onClick={() => onClick(index)}
          className="border bg-gray-50 p-1 w-5 text-center text-gray-500 text-[5px] rounded"
        >
          {index}
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

// left sidebar

const SideBar = () => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: "table-id",
    });

  const style: React.CSSProperties = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 9999,
        position: "absolute",
      }
    : {};

  return (
    <div>
      <h2>Objects List</h2>
      <div className="relative h-40">
        {" "}
        <div
          ref={setNodeRef}
          {...listeners}
          {...attributes}
          style={style}
          className="p-2 cursor-move shadow-2xl bg-white border border-gray-200 rounded-2xl inline-block"
        >
          <TableIcon className="w-10 h-10 text-blue-500 fill-current" />
        </div>
      </div>
    </div>
  );
};

export default TableLayoutManager;
