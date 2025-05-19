import TableIcon from "../../assets/table-restaurant.svg?react";
import BuildingGrids from "./BuildingGrid";
import SideBar from "./SideBar";

type TableLayoutManagerProps = {
  activeId: string | null;
  dragOverId: string | null;
  droppedTables: { [key: number]: string };
  onClickCell: (index: number) => void;

  onDragStart: (id: string) => void;
  onDragOver: (overId: string | null) => void;
  onDragEnd: (overId: string | null, activeId: string | null) => void;

  dragListeners?: React.HTMLAttributes<HTMLElement>;
  dragAttributes?: React.HTMLAttributes<HTMLElement>;
  dragRef?: React.Ref<HTMLElement>;
  dragOverlayStyle?: React.CSSProperties;
};

const TableLayoutManager = ({
  activeId,
  dragOverId,
  droppedTables,
  onClickCell,
  onDragStart,
  onDragOver,
  onDragEnd,
  dragListeners,
  dragAttributes,
  dragRef,
  dragOverlayStyle,
}: TableLayoutManagerProps) => {
  return (
    <div className="p-4 grid grid-cols-8">
      <div className="col-span-1 mx-2 bg-white rounded-sm shadow-2xl px-2 pt-2 text-center">
        <SideBar
          activeId={activeId}
          dragListeners={dragListeners ?? {}}
          dragAttributes={dragAttributes ?? {}}
          dragRef={dragRef}
        />
      </div>
      <div className="col-span-7 bg-white rounded-sm flex flex-col items-center overflow-auto">
        <h2>Map</h2>
        <BuildingGrids
          rows={30}
          columns={30}
          droppedTables={droppedTables}
          dragOverId={dragOverId}
          onClickCell={onClickCell}
          dragRefs={dragRef}
          onDragOver={onDragOver}
        />
      </div>

      {activeId === "table-id" && (
        <div style={dragOverlayStyle}>
          <TableIcon className="w-6 h-6 text-blue-500 fill-current" />
        </div>
      )}
    </div>
  );
};

export default TableLayoutManager;
