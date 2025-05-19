import TableIcon from "../../assets/table-restaurant.svg?react";

type BuildingGridsProps = {
  rows: number;
  columns: number;
  droppedTables: { [key: number]: string };
  dragOverId?: string | null;
  dragRefs: { [key: number]: React.Ref<any> };
  onClickCell: (index: number) => void;
  onDragOver: (overId: string | null) => void;
};

const BuildingGrids = ({
  rows,
  columns,
  droppedTables,
  dragOverId,
  onClickCell,
  dragRefs,
  onDragOver,
}: BuildingGridsProps) => {
  const grid = [];

  for (let row = 0; row < rows; row++) {
    const rowItems = [];

    for (let col = 0; col < columns; col++) {
      const index = row * columns + col;

      rowItems.push(
        <div
          key={index}
          ref={dragRefs[index]}
          onClick={() => onClickCell(index)}
          onDragOver={(e) => {
            e.preventDefault();
            onDragOver(String(index));
          }}
          className={`flex justify-center border items-center w-8 h-8 text-center text-[6px] rounded-full ${
            dragOverId === index.toString()
              ? "bg-green-300 border-white text-black font-bold"
              : "bg-gray-50 text-gray-500"
          } hover:bg-green-200 hover:border-white hover:text-black hover:font-bold hover:text-[6px]`}
        >
          {droppedTables?.[index] ? (
            <TableIcon className="w-6 h-6 text-blue-500 fill-current" />
          ) : (
            index
          )}
        </div>
      );
    }

    grid.push(
      <div className="flex gap-1 m-2" key={`row-${row}`}>
        {rowItems}
      </div>
    );
  }

  return <div>{grid}</div>;
};

export default BuildingGrids;
