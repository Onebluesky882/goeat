import React from "react";
import { useDraggable } from "@dnd-kit/core";
import type { SidebarItemProps } from "types/buildMapping";
import BuildingIcon from "./BuildingIcon";

const SidebarItem: React.FC<SidebarItemProps> = ({ buildingType }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `sidebar-${buildingType.id}`,
    data: {
      type: "building",
      building: buildingType,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="building-item mb-2"
    >
      <div
        className="w-10 h-10 flex items-center justify-center rounded-md mb-1"
        style={{ backgroundColor: `${buildingType.color}20` }}
      >
        <BuildingIcon icon={buildingType.icon} color={buildingType.color} />
      </div>
      <span className="text-xs font-medium">{buildingType.name}</span>
    </div>
  );
};

export default SidebarItem;
