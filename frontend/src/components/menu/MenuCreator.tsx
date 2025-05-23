export type MenuItemData = {
  name: string;
  description: string;
  category: string;
  price: number | string;
  available: boolean;
  onAddCategory: (category: string) => void;
};

export type MenuItemFormProps = {
  index: number;
  data: MenuItemData;
  onChange: (index: number, field: keyof MenuItemData, value: any) => void;
  errors: Partial<MenuItemData>;
};

const MenuCreator = () => {
  return <div>{/*  // MenuItemForm */}</div>;
};
export default MenuCreator;
