import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";

const QuickOpenShop = ({ navigate }: { navigate: (to: string) => void }) => {
  return (
    <div className="max-w-4xl mx-auto mb-12">
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-800">
            Quick Actions
          </CardTitle>
          <CardDescription>
            Get started by adding your first store
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => navigate("/add-store")}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Store
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
export default QuickOpenShop;
