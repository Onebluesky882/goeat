import StoreForm from "@/components/shops/newShop/StoreForm";
import StoreSelector from "@/components/shops/newShop/StoreSelector";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Store, BarChart3, Users, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateShop = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Business Manager
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Manage your retail shops, restaurants, and bars all in one place
          </p>
        </div>

        {/* Quick Actions */}
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

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Store className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-slate-800">
                Multi-Store Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-center">
                Manage retail shops, restaurants, and bars from a single
                dashboard
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-slate-800">
                Analytics & Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-center">
                Track performance and get insights across all your business
                locations
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-xl text-slate-800">
                Team Collaboration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 text-center">
                Collaborate with your team and manage staff across all locations
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export type StoreType = "retail" | "restaurant" | "bar" | null;

const AddNewStore = () => {
  const [selectedStoreType, setSelectedStoreType] = useState<StoreType>(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Add New Store
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose your store type and set up your business profile to start
              managing your operations
            </p>
          </div>

          {/* Store Type Selection */}
          <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-slate-800">
                What type of store are you creating?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StoreSelector
                selectedType={selectedStoreType}
                onTypeSelect={setSelectedStoreType}
              />
            </CardContent>
          </Card>

          {/* Dynamic Form */}
          {selectedStoreType && (
            <div className="animate-fade-in">
              <StoreForm storeType={selectedStoreType} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateShop;
