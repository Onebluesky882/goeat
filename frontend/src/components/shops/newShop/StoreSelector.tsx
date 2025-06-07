import { Card, CardContent } from "@/components/ui/card";
import { Store, UtensilsCrossed, Wine } from "lucide-react";
import { StoreType } from "@/pages/AddNewStore";

interface StoreTypeSelectorProps {
  selectedType: StoreType;
  onTypeSelect: (type: StoreType) => void;
}

const StoreTypeSelector = ({
  selectedType,
  onTypeSelect,
}: StoreTypeSelectorProps) => {
  const storeTypes = [
    {
      id: "retail" as const,
      title: "Retail Shop",
      subtitle: "1-on-1 Shop to Customer",
      description:
        "Perfect for selling physical goods directly to individual customers",
      icon: Store,
      gradient: "from-blue-500 to-blue-600",
      bgGradient: "from-blue-50 to-blue-100",
    },
    {
      id: "restaurant" as const,
      title: "Restaurant",
      subtitle: "Dining & Food Service",
      description:
        "Complete solution with dining tables, food menus, and service flow",
      icon: UtensilsCrossed,
      gradient: "from-emerald-500 to-emerald-600",
      bgGradient: "from-emerald-50 to-emerald-100",
    },
    {
      id: "bar" as const,
      title: "Bar & Cocktail Restaurant",
      subtitle: "Nightlife & Beverages",
      description:
        "Focused on nightlife vibes, cocktail menus, and reservation options",
      icon: Wine,
      gradient: "from-purple-500 to-purple-600",
      bgGradient: "from-purple-50 to-purple-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {storeTypes.map((type) => {
        const Icon = type.icon;
        const isSelected = selectedType === type.id;

        return (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg border-2 ${
              isSelected
                ? `border-transparent bg-gradient-to-br ${
                    type.bgGradient
                  } shadow-lg ring-2 ring-offset-2 ring-${
                    type.gradient.split("-")[1]
                  }-400`
                : "border-slate-200 hover:border-slate-300 bg-white"
            }`}
            onClick={() => onTypeSelect(type.id)}
          >
            <CardContent className="p-6 text-center">
              <div
                className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${type.gradient} flex items-center justify-center shadow-lg`}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {type.title}
              </h3>

              <p
                className={`text-sm font-medium mb-3 ${
                  isSelected ? "text-slate-700" : "text-slate-600"
                }`}
              >
                {type.subtitle}
              </p>

              <p
                className={`text-sm leading-relaxed ${
                  isSelected ? "text-slate-600" : "text-slate-500"
                }`}
              >
                {type.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default StoreTypeSelector;
