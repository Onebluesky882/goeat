export type GridSize = {
  rows: number;
  cols: number;
};

export type BuildingType = {
  id: string;
  name: string;
  icon: string;
  color: string;
};

export type Building = {
  id: string;
  type: string;
  position: {
    row: number;
    col: number;
  };
};

export type GridCellProps = {
  row: number;
  col: number;
  building: Building | null;
  onRemoveBuilding: (row: number, col: number) => void;
};

export type SidebarItemProps = {
  buildingType: BuildingType;
};
