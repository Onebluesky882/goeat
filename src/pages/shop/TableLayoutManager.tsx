import React, { useState, useRef } from "react";
import TableLayoutManager from "@/components/TableLayout/TableLayoutManager";

const TableLayoutPage = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [droppedTables, setDroppedTables] = useState<{ [key: number]: string }>(
    {}
  );

  const dragRef = useRef<HTMLDivElement | null>(null);

  // Prepare dragListeners and dragAttributes for the draggable object in SideBar
  const dragListeners = {
    draggable: true,
    onDragStart: (e: React.DragEvent) => {
      e.dataTransfer.setData("text/plain", "table-id"); // or the id you want to drag
      onDragStart("table-id");
    },
  };

  const dragAttributes = {
    // Can add attributes like aria-grabbed or others if needed
  };

  const onDragStart = (id: string) => {
    setActiveId(id);
  };

  const onDragOver = (overId: string | null) => {
    setDragOverId(overId);
  };

  const onDragEnd = (overId: string | null, activeId: string | null) => {
    if (overId && activeId) {
      setDroppedTables((prev) => ({
        ...prev,
        [Number(overId)]: activeId,
      }));
    }
    setActiveId(null);
    setDragOverId(null);
  };

  const onClickCell = (index: number) => {
    console.log("Clicked cell:", index);
  };

  const dragOverlayStyle: React.CSSProperties = {
    position: "fixed",
    pointerEvents: "none",
    top: 0,
    left: 0,
    zIndex: 1000,
  };

  return (
    <div>
      <TableLayoutManager
        activeId={activeId}
        dragOverId={dragOverId}
        droppedTables={droppedTables}
        onClickCell={onClickCell}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
        onDragStart={onDragStart}
        dragAttributes={dragAttributes}
        dragListeners={dragListeners}
        dragRef={dragRef}
        dragOverlayStyle={dragOverlayStyle}
      />
    </div>
  );
};

export default TableLayoutPage;
