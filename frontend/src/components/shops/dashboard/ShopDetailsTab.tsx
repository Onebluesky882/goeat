import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  MapPin,
  Phone,
  Globe,
  Instagram,
  Facebook,
  Twitter,
  Store,
} from "lucide-react";
import { toast } from "sonner";

interface ShopDetails {
  name: string;
  address: string;
  phone: string;
  mapsLink: string;
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
  description: string;
}

export const ShopDetailsTab = () => {
  const [shopDetails, setShopDetails] = useState<ShopDetails>({
    name: "My Coffee Shop",
    address: "123 Main Street, City, State 12345",
    phone: "+1 (555) 123-4567",
    mapsLink: "https://maps.google.com",
    website: "https://mycoffeeshop.com",
    instagram: "@mycoffeeshop",
    facebook: "mycoffeeshop",
    twitter: "@mycoffeeshop",
    description:
      "A cozy coffee shop serving the best coffee in town with freshly baked pastries and a warm atmosphere.",
  });

  const handleInputChange = (field: keyof ShopDetails, value: string) => {
    setShopDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    toast('"Your shop information has been updated successfully.",');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Form Section */}
      <Card>
        <CardHeader>
          <CardTitle>Shop Information</CardTitle>
          <CardDescription>
            Update your shop details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="shop-name">Shop Name</Label>
            <Input
              id="shop-name"
              value={shopDetails.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter shop name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={shopDetails.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Enter full address"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={shopDetails.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="maps-link">Google Maps Link</Label>
            <Input
              id="maps-link"
              type="url"
              value={shopDetails.mapsLink}
              onChange={(e) => handleInputChange("mapsLink", e.target.value)}
              placeholder="https://maps.google.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              type="url"
              value={shopDetails.website}
              onChange={(e) => handleInputChange("website", e.target.value)}
              placeholder="https://yourwebsite.com"
            />
          </div>

          <div className="space-y-4">
            <Label>Social Media</Label>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center space-x-2">
                <Instagram size={20} className="text-pink-500" />
                <Input
                  value={shopDetails.instagram}
                  onChange={(e) =>
                    handleInputChange("instagram", e.target.value)
                  }
                  placeholder="@username"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Facebook size={20} className="text-blue-600" />
                <Input
                  value={shopDetails.facebook}
                  onChange={(e) =>
                    handleInputChange("facebook", e.target.value)
                  }
                  placeholder="facebook.com/username"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Twitter size={20} className="text-blue-400" />
                <Input
                  value={shopDetails.twitter}
                  onChange={(e) => handleInputChange("twitter", e.target.value)}
                  placeholder="@username"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={shopDetails.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Tell customers about your shop..."
              rows={4}
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Shop Preview</CardTitle>
          <CardDescription>
            How your shop information will appear to customers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store size={32} className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{shopDetails.name}</h3>
              <p className="text-muted-foreground mt-2">
                {shopDetails.description}
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-muted-foreground mt-1" />
                <span className="text-sm">{shopDetails.address}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-muted-foreground" />
                <span className="text-sm">{shopDetails.phone}</span>
              </div>

              <div className="flex items-center space-x-3">
                <Globe size={16} className="text-muted-foreground" />
                <a
                  href={shopDetails.website}
                  className="text-sm text-primary hover:underline"
                >
                  Visit Website
                </a>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-4">
                {shopDetails.instagram && (
                  <div className="flex items-center space-x-2">
                    <Instagram size={16} className="text-pink-500" />
                    <span className="text-sm">{shopDetails.instagram}</span>
                  </div>
                )}
                {shopDetails.facebook && (
                  <div className="flex items-center space-x-2">
                    <Facebook size={16} className="text-blue-600" />
                    <span className="text-sm">{shopDetails.facebook}</span>
                  </div>
                )}
                {shopDetails.twitter && (
                  <div className="flex items-center space-x-2">
                    <Twitter size={16} className="text-blue-400" />
                    <span className="text-sm">{shopDetails.twitter}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
