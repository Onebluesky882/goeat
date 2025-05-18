import { GridSize, BuildingType, Building } from '../../types/buildMapping';

export const GRID_SIZE: GridSize = {
  rows: 10,
  cols: 10,
};

export const BUILDING_TYPES: BuildingType[] = [
  {
    id: 'house',
    name: 'House',
    icon: 'building',
    color: '#9b87f5',
  },
  {
    id: 'factory',
    name: 'Factory',
    icon: 'factory',
    color: '#7E69AB',
  },
  {
    id: 'tree',
    name: 'Tree',
    icon: 'tree-deciduous',
    color: '#6ED47C',
  },
  {
    id: 'building',
    name: 'Office',
    icon: 'building-2',
    color: '#6E59A5',
  },
  {
    id: 'park',
    name: 'Park',
    icon: 'tree-palm',
    color: '#8FD46E',
  },
];

export const generateEmptyGrid = (
  rows: number,
  cols: number,
): (Building | null)[][] => {
  return Array(rows)
    .fill(null)
    .map(() => Array(cols).fill(null));
};
