import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Camera,
  Plus,
  X,
  Users,
  Menu as MenuIcon,
} from "lucide-react";
import { toast } from "sonner";
import type { StoreType } from "frontend/types/shop.types";
type StoreFormProps = {
  storeType: StoreType | null;
};

const StoreForm = ({ storeType }: StoreFormProps) => {
  const [formData, setFormData] = useState({
    storeName: "",
    description: "",
    address: "",
    phone: "",
    email: "",
    openingHours: "",
    closingHours: "",
    coverPhoto: null as File | null,
    menuCategories: [] as string[],
    tableCount: "",
    capacity: "",
  });

  const [newCategory, setNewCategory] = useState("");

  const removeMenuCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      menuCategories: prev.menuCategories.filter((cat) => cat !== category),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.storeName.trim()) {
      toast.error("Store name is required");
      return;
    }

    console.log("Submitting store data:", { storeType, ...formData });

    toast.success(
      `${getStoreTypeLabel(storeType)} "${
        formData.storeName
      }" has been created successfully.`
    );
  };

  const getStoreTypeLabel = (type: StoreFormProps) => {
    switch (storeType) {
      case "retail":
        return "Retail Shop";
      case "restaurant":
        return "Restaurant";
      case "bar":
        return "Bar & Cocktail Restaurant";
      default:
        return "Store";
    }
  };

  const showMenuSection = storeType === "restaurant" || storeType === "bar";
  const showTableSection = storeType === "restaurant" || storeType === "bar";

  return (
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-slate-800 flex items-center gap-3">
          {(() => {
            const storeLabel = getStoreTypeLabel(storeType);
            return (
              <>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">
                    {storeLabel.charAt(0)}
                  </span>
                </div>
                {storeLabel} Details
              </>
            );
          })()}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2">
              Basic Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="storeName"
                  className="text-slate-700 font-medium"
                >
                  Store Name *
                </Label>
                <Input
                  id="storeName"
                  value={formData.storeName}
                  onChange={() => {}}
                  placeholder="Enter your store name"
                  className="border-slate-300 focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="address"
                  className="text-slate-700 font-medium flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Address
                </Label>
                <Input
                  id="address"
                  value={formData.address}
                  placeholder="Store address"
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-slate-700 font-medium"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={() => {}}
                placeholder="Tell customers about your store..."
                className="border-slate-300 focus:border-blue-500 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="coverPhoto"
                className="text-slate-700 font-medium flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Cover Photo
              </Label>
              <Input
                id="coverPhoto"
                type="file"
                accept="image/*"
                className="border-slate-300 focus:border-blue-500"
              />
              <p className="text-sm text-slate-500">
                Upload a high-quality image that represents your store
              </p>
            </div>
          </div>

          <Separator />

          {/* Contact & Hours */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2">
              Contact & Hours
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="phone"
                  className="text-slate-700 font-medium flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  placeholder="+1 (555) 123-4567"
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-slate-700 font-medium flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  placeholder="store@example.com"
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="openingHours"
                  className="text-slate-700 font-medium flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Opening Time
                </Label>
                <Input
                  id="openingHours"
                  type="time"
                  value={formData.openingHours}
                  onChange={() => {}}
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="closingHours"
                  className="text-slate-700 font-medium flex items-center gap-2"
                >
                  <Clock className="w-4 h-4" />
                  Closing Time
                </Label>
                <Input
                  id="closingHours"
                  type="time"
                  value={formData.closingHours}
                  onChange={() => {}}
                  className="border-slate-300 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Menu Categories (Restaurant & Bar) */}
          {showMenuSection && (
            <>
              <Separator />
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 flex items-center gap-2">
                  <MenuIcon className="w-5 h-5" />
                  Menu Categories
                </h3>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newCategory}
                      placeholder={`Add ${
                        storeType === "bar" ? "cocktail" : "food"
                      } category...`}
                      className="border-slate-300 focus:border-blue-500"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addMenuCategory())
                      }
                    />
                    <Button
                      type="button"
                      onClick={addMenuCategory}
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  {formData.menuCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.menuCategories.map((category) => (
                        <Badge
                          key={category}
                          variant="secondary"
                          className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1"
                        >
                          {category}
                          <button
                            type="button"
                            onClick={() => removeMenuCategory(category)}
                            className="ml-2 hover:text-red-600"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Table Layout (Restaurant & Bar) */}
          {showTableSection && (
            <>
              <Separator />
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-slate-700 border-b border-slate-200 pb-2 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Seating Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="tableCount"
                      className="text-slate-700 font-medium"
                    >
                      Number of Tables
                    </Label>
                    <Input
                      id="tableCount"
                      type="number"
                      value={formData.tableCount}
                      onChange={() => {}}
                      placeholder="10"
                      className="border-slate-300 focus:border-blue-500"
                      min="1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="capacity"
                      className="text-slate-700 font-medium"
                    >
                      Total Capacity
                    </Label>
                    <Input
                      id="capacity"
                      type="number"
                      value={formData.capacity}
                      onChange={() => {}}
                      placeholder="40"
                      className="border-slate-300 focus:border-blue-500"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Create {getStoreTypeLabel(storeType)}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StoreForm;
