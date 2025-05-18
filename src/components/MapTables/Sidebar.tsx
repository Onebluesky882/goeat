import React from "react";
import { BUILDING_TYPES } from "../../../backend/utils/contants";
import SidebarItem from "./SidebarItem";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-white border-r p-4 w-24 shrink-0 flex flex-col items-center">
      <h2 className="font-bold mb-4 text-sm">Buildings</h2>
      <div className="flex flex-col items-center">
        {BUILDING_TYPES.map((type) => (
          <SidebarItem key={type.id} buildingType={type} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
