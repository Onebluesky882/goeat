import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, type QuickAddMenu } from "@/schema/addMenuSchema";
import { LuImagePlus } from "react-icons/lu";
import { RiCloseCircleFill } from "react-icons/ri";
import { FaCloudArrowUp } from "react-icons/fa6";
import { Edit, Trash } from "lucide-react";
import clsx from "clsx";
import { menuApi } from "@/Api/menu.api";
import { promise } from "zod";
import useShop from "@/hooks/useShop";
import { transformKeysToSnakeCase } from "../../../../utils/string";
export type Menu = {
  name: string;
  price: number;
};

const initialMenuItems = [
  {
    id: "1",
    name: "Green Curry Chicken",
    price: 80,
    category: "Main Dish",
  },
  {
    id: "2",
    name: "Thai Milk Tea",
    price: 35,
    category: "Beverage",
  },
  {
    id: "3",
    name: "Fried Spring Rolls",
    price: 50,
    category: "Appetizer",
  },
  {
    id: "4",
    name: "Mango Sticky Rice",
    price: 60,
    category: "Dessert",
  },
];

const MenuManagement = () => {
  const [addItems, setAddItems] = useState<Menu[]>([]);
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [tempItem, setTempItem] = useState({ name: "", price: 0 });
  const { selectedShop } = useShop();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<QuickAddMenu>({ resolver: zodResolver(schema) });

  const handleInsert = async () => {
    const shopId = selectedShop?.id;
    setLoading(true);
    try {
      const results = await Promise.allSettled(
        addItems.map((item) =>
          menuApi.create({
            ...transformKeysToSnakeCase(item),
            shopId,
          })
        )
      );

      const rejected = results.filter((res) => res.status === "rejected");

      if (rejected.length > 0) {
        rejected.forEach((error, idx) => {
          console.error(`Item ${idx + 1} failed:`, error);
        });

        toast.error(`${rejected.length} menu item(s) failed to save.`);
      } else {
        toast.success("All menu items saved successfully.");
      }
    } catch (error) {
      toast.error(<div className="text-red-500">Failed to save menus </div>);
    } finally {
      setLoading(false);
      setAddItems([]);
    }
  };

  const handleSaveItem = (data: QuickAddMenu) => {
    setAddItems([...addItems, data]);

    toast.success("adding");
  };

  const onSubmit = (data: QuickAddMenu) => {
    handleSaveItem(data);
    reset();
  };

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
          <TabsTrigger value="desserts">Dessert</TabsTrigger>
          <TabsTrigger value="drinks"> Drink</TabsTrigger>
          <TabsTrigger value="promotions">Special Promotions</TabsTrigger>
        </TabsList>

        {addItems && (
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {addItems.map((menu, index) => (
                <div
                  key={index}
                  className="relative flex flex-col p-4 rounded-2xl shadow-md border border-gray-200 bg-white hover:shadow-lg transition-shadow"
                >
                  {/* ปุ่มลบ */}
                  <button className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors">
                    <RiCloseCircleFill size={20} />
                  </button>

                  {/* ชื่อเมนู */}
                  <p className="text-lg font-semibold text-gray-800">
                    {menu.name}
                  </p>

                  {/* ราคา */}
                  <p className="text-sm text-gray-500">{menu.price} ฿</p>

                  {/* อัปโหลดรูป */}
                  <button className="mt-4 flex items-center gap-1 text-blue-600 hover:text-blue-800 transition-colors">
                    <FaCloudArrowUp size={18} />
                    <span className="text-sm font-medium">อัปโหลดรูป</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Save All Button */}
            {addItems.length > 0 && (
              <div className="mt-6 text-center">
                <button
                  disabled={loading}
                  onClick={handleInsert}
                  className={`${
                    loading
                      ? "bg-blue-600/30  px-6 py-2   text-white rounded-full shadow   transition-colors"
                      : "px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition-colors"
                  }`}
                >
                  Save All Menu
                </button>
              </div>
            )}
          </div>
        )}
        <TabsContent value="menu">
          {/* Form */}
          <Card className="mb-6 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">
                Add New Menu Item
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <div className="md:col-span-2">
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter menu name"
                    className="focus-visible:ring-1 focus-visible:ring-blue-500  focus:border-none mt-2 focus:ring-2 focus:ring-blue-500 focus:outline-none "
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="item-price">Price (฿)</Label>
                  <Input
                    type="number"
                    placeholder="0"
                    {...register("price", {
                      required: "Price is required",
                      valueAsNumber: true,
                    })}
                    className="focus-visible:ring-1 focus-visible:ring-blue-500 placeholder:text-gray-400 focus:border-none mt-2"
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="flex items-end">
                  <Button type="submit" className="w-full">
                    Add Menu
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Menu List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menuItems.map((item) => (
              <Card
                key={item.id}
                className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <CardContent className="p-4">
                  {editingItemId === item.id ? (
                    <div className="space-y-3">
                      <Label>Name</Label>
                      <Input
                        value={tempItem.name}
                        onChange={(e) =>
                          setTempItem({ ...tempItem, name: e.target.value })
                        }
                      />

                      <Label>Price (฿)</Label>
                      <Input
                        type="number"
                        value={tempItem.price}
                        onChange={(e) =>
                          setTempItem({
                            ...tempItem,
                            price: Number(e.target.value),
                          })
                        }
                      />

                      <div className="flex justify-end space-x-2 mt-3">
                        <Button
                          variant="outline"
                          onClick={() => setEditingItemId(null)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={() => {}}>Save</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">
                          {item.name}
                        </h3>
                        <p className="text-orange-600 font-semibold mt-1">
                          {item.price} ฿
                        </p>
                        {item.category && (
                          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-600 mt-2 inline-block">
                            {item.category}
                          </span>
                        )}
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {}}
                          className="text-gray-600 hover:text-blue-600"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => {}}
                          className="text-red-500 hover:text-red-600"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
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
            {/* <CardContent>
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
            </CardContent> */}
          </Card>

          {/* Promotions list */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* {promotions.map((promo) => (
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
            ))} */}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MenuManagement;
