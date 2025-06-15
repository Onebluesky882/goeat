import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Plus, Trash } from "lucide-react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import useShop from "@/hooks/useShop";

// Sample menu data
const MenuItems = [
  {
    id: "1",
    name: "Tom Yum Goong",
    price: 120,
    category: "soups",
    isPromotion: false,
  },
  {
    id: "2",
    name: "Green Curry",
    price: 110,
    category: "curries",
    isPromotion: false,
  },
  {
    id: "3",
    name: "Pad Thai",
    price: 90,
    category: "noodles",
    isPromotion: false,
  },
  {
    id: "4",
    name: "Mango Sticky Rice",
    price: 80,
    category: "desserts",
    isPromotion: false,
  },
  {
    id: "5",
    name: "Thai Iced Tea",
    price: 40,
    category: "beverages",
    isPromotion: false,
  },
  {
    id: "6",
    name: "Spring Rolls",
    price: 70,
    category: "appetizers",
    isPromotion: false,
  },
];

const initialPromotions = [
  {
    id: "101",
    name: "Lunch Special: Pad Thai + Iced Tea",
    price: 120,
    regularPrice: 130,
    description: "Available weekdays 11 AM - 2 PM",
    isPromotion: true,
  },
  {
    id: "102",
    name: "Family Set: 4 Main Dishes + 2 Soups",
    price: 499,
    regularPrice: 580,
    description: "Perfect for family gathering of 4-6 people",
    isPromotion: true,
  },
];

const MenuManagement = () => {
  const [menuItems, setMenuItems] = useState(MenuItems);
  const [promotions, setPromotions] = useState(initialPromotions);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingPromoId, setEditingPromoId] = useState<string | null>(null);

  const [tempItem, setTempItem] = useState({
    name: "",
    price: 0,
    category: "main",
    isPromotion: false,
  });

  const [tempPromo, setTempPromo] = useState({
    name: "",
    price: 0,
    regularPrice: 0,
    description: "",
    isPromotion: true,
  });

  const handleEditItem = (item: any) => {
    setEditingItemId(item.id);
    setTempItem({
      name: item.name,
      price: item.price,
      category: item.category,
      isPromotion: item.isPromotion,
    });
  };

  const handleSaveItem = (id: string) => {
    if (!tempItem.name.trim() || tempItem.price <= 0) {
      toast.error("Please enter valid name and price");
      return;
    }

    setMenuItems(
      menuItems.map((item) =>
        item.id === id
          ? {
              ...item,
              name: tempItem.name,
              price: tempItem.price,
              category: tempItem.category,
            }
          : item
      )
    );

    setEditingItemId(null);
    toast.success("Menu item updated successfully");
  };

  const handleAddItem = () => {
    if (!tempItem.name.trim() || tempItem.price <= 0) {
      toast.error("Please enter valid name and price");
      return;
    }

    const newItem = {
      id: `item_${Date.now()}`,
      name: tempItem.name,
      price: tempItem.price,
      category: tempItem.category,
      isPromotion: false,
    };

    setMenuItems([...menuItems, newItem]);
    setTempItem({ name: "", price: 0, category: "main", isPromotion: false });
    toast.success("Menu item added successfully");
  };

  const handleDeleteItem = (id: string) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
    toast.success("Menu item deleted");
  };

  const handleEditPromo = (promo: any) => {
    setEditingPromoId(promo.id);
    setTempPromo({
      name: promo.name,
      price: promo.price,
      regularPrice: promo.regularPrice,
      description: promo.description,
      isPromotion: true,
    });
  };

  const handleSavePromo = (id: string) => {
    if (!tempPromo.name.trim() || tempPromo.price <= 0) {
      toast.error("Please enter valid name and price");
      return;
    }

    setPromotions(
      promotions.map((promo) =>
        promo.id === id
          ? {
              ...promo,
              name: tempPromo.name,
              price: tempPromo.price,
              regularPrice: tempPromo.regularPrice,
              description: tempPromo.description,
            }
          : promo
      )
    );

    setEditingPromoId(null);
    toast.success("Promotion updated successfully");
  };

  const handleAddPromo = () => {
    if (
      !tempPromo.name.trim() ||
      tempPromo.price <= 0 ||
      tempPromo.regularPrice <= tempPromo.price
    ) {
      toast.error("Please enter valid promotion details");
      return;
    }

    const newPromo = {
      id: `promo_${Date.now()}`,
      name: tempPromo.name,
      price: tempPromo.price,
      regularPrice: tempPromo.regularPrice,
      description: tempPromo.description,
      isPromotion: true,
    };

    setPromotions([...promotions, newPromo]);
    setTempPromo({
      name: "",
      price: 0,
      regularPrice: 0,
      description: "",
      isPromotion: true,
    });
    toast.success("Promotion added successfully");
  };

  const handleDeletePromo = (id: string) => {
    setPromotions(promotions.filter((promo) => promo.id !== id));
    toast.success("Promotion deleted");
  };

  useForm();
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Menu & Promotions
      </h1>
      <p className="text-gray-600 mb-6">
        Manage your restaurant menu items and special promotions
      </p>

      <Tabs defaultValue="menu" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="menu">Regular Menu</TabsTrigger>
          <TabsTrigger value="desserts"> Dessert</TabsTrigger>
          <TabsTrigger value="drinks"> Drink</TabsTrigger>
          <TabsTrigger value="promotions">Special Promotions</TabsTrigger>
        </TabsList>

        <TabsContent value="menu">
          {/* Add new menu item form */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Add New Menu Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input
                    id="item-name"
                    value={tempItem.name}
                    onChange={(e) =>
                      setTempItem({ ...tempItem, name: e.target.value })
                    }
                    placeholder="e.g., Pad Thai"
                  />
                </div>
                <div>
                  <Label htmlFor="item-price">Price (฿)</Label>
                  <Input
                    id="item-price"
                    type="number"
                    value={tempItem.price || ""}
                    onChange={(e) =>
                      setTempItem({
                        ...tempItem,
                        price: Number(e.target.value),
                      })
                    }
                    placeholder="99"
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={handleAddItem}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Menu items list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <Card key={item.id} className="border border-gray-200">
                <CardContent className="p-4">
                  {editingItemId === item.id ? (
                    <div className="space-y-3">
                      <Label htmlFor={`edit-name-${item.id}`}>Name</Label>
                      <Input
                        id={`edit-name-${item.id}`}
                        value={tempItem.name}
                        onChange={(e) =>
                          setTempItem({ ...tempItem, name: e.target.value })
                        }
                      />

                      <Label htmlFor={`edit-price-${item.id}`}>Price (฿)</Label>
                      <Input
                        id={`edit-price-${item.id}`}
                        type="number"
                        value={tempItem.price || ""}
                        onChange={(e) =>
                          setTempItem({
                            ...tempItem,
                            price: Number(e.target.value),
                          })
                        }
                      />

                      <div className="flex justify-end space-x-2 mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setEditingItemId(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => handleSaveItem(item.id)}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium">{item.name}</h3>
                          <p className="text-orange-600 font-medium mt-1">
                            {item.price} ฿
                          </p>
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 mt-2 inline-block">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEditItem(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="promotions">
          {/* Add new promotion form */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Create New Promotion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="promo-name">Promotion Name</Label>
                  <Input
                    id="promo-name"
                    value={tempPromo.name}
                    onChange={(e) =>
                      setTempPromo({ ...tempPromo, name: e.target.value })
                    }
                    placeholder="e.g., Lunch Special: Pad Thai + Drink"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="promo-price">Special Price (฿)</Label>
                    <Input
                      id="promo-price"
                      type="number"
                      value={tempPromo.price || ""}
                      onChange={(e) =>
                        setTempPromo({
                          ...tempPromo,
                          price: Number(e.target.value),
                        })
                      }
                      placeholder="149"
                    />
                  </div>
                  <div>
                    <Label htmlFor="regular-price">Regular Price (฿)</Label>
                    <Input
                      id="regular-price"
                      type="number"
                      value={tempPromo.regularPrice || ""}
                      onChange={(e) =>
                        setTempPromo({
                          ...tempPromo,
                          regularPrice: Number(e.target.value),
                        })
                      }
                      placeholder="180"
                    />
                  </div>
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="promo-description">Description</Label>
                  <Input
                    id="promo-description"
                    value={tempPromo.description}
                    onChange={(e) =>
                      setTempPromo({
                        ...tempPromo,
                        description: e.target.value,
                      })
                    }
                    placeholder="Available weekdays from 11 AM to 2 PM"
                  />
                </div>
                <div className="md:col-span-2">
                  <Button
                    onClick={handleAddPromo}
                    className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700"
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Promotion
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Promotions list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {promotions.map((promo) => (
              <Card
                key={promo.id}
                className="border border-orange-100 bg-orange-50"
              >
                <CardContent className="p-4">
                  {editingPromoId === promo.id ? (
                    <div className="space-y-3">
                      <Label htmlFor={`edit-promo-name-${promo.id}`}>
                        Name
                      </Label>
                      <Input
                        id={`edit-promo-name-${promo.id}`}
                        value={tempPromo.name}
                        onChange={(e) =>
                          setTempPromo({ ...tempPromo, name: e.target.value })
                        }
                      />

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`edit-promo-price-${promo.id}`}>
                            Special Price (฿)
                          </Label>
                          <Input
                            id={`edit-promo-price-${promo.id}`}
                            type="number"
                            value={tempPromo.price || ""}
                            onChange={(e) =>
                              setTempPromo({
                                ...tempPromo,
                                price: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor={`edit-regular-price-${promo.id}`}>
                            Regular Price (฿)
                          </Label>
                          <Input
                            id={`edit-regular-price-${promo.id}`}
                            type="number"
                            value={tempPromo.regularPrice || ""}
                            onChange={(e) =>
                              setTempPromo({
                                ...tempPromo,
                                regularPrice: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                      </div>

                      <Label htmlFor={`edit-promo-description-${promo.id}`}>
                        Description
                      </Label>
                      <Input
                        id={`edit-promo-description-${promo.id}`}
                        value={tempPromo.description}
                        onChange={(e) =>
                          setTempPromo({
                            ...tempPromo,
                            description: e.target.value,
                          })
                        }
                      />

                      <div className="flex justify-end space-x-2 mt-4">
                        <Button
                          variant="outline"
                          onClick={() => setEditingPromoId(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => handleSavePromo(promo.id)}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="inline-block px-2 py-1 bg-orange-200 text-orange-800 text-xs font-medium rounded-md mb-2">
                            Special Offer
                          </div>
                          <h3 className="text-lg font-medium">{promo.name}</h3>
                          <div className="mt-1 flex items-baseline">
                            <span className="text-orange-600 font-medium">
                              {promo.price} ฿
                            </span>
                            <span className="ml-2 text-gray-500 line-through text-sm">
                              {promo.regularPrice} ฿
                            </span>
                            <span className="ml-2 text-green-600 text-sm">
                              Save {promo.regularPrice - promo.price} ฿
                            </span>
                          </div>
                          {promo.description && (
                            <p className="text-sm text-gray-600 mt-2">
                              {promo.description}
                            </p>
                          )}
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEditPromo(promo)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeletePromo(promo.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuManagement;
