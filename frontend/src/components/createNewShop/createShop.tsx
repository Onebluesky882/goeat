import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import RestaurantPreviewCard from "./PreviewCard";
import type { FormFields } from "@/pages/shop/CreateShop";

type CreateShopProps = {
  onSubmit: (e?: React.BaseSyntheticEvent) => void;
  register: UseFormRegister<FormFields>;
  errors: FieldErrors<FormFields>;
  isValid: boolean;
  isSubmitting: boolean;
  handleReset: () => void;
  livePreview: any;
  shouldShowPreview: any;
};
// will fixed sparate component
const FromNewShop = ({
  onSubmit,
  register,
  errors,
  isValid,
  isSubmitting,
  handleReset,
  livePreview,
  shouldShowPreview,
}: CreateShopProps) => {
  return (
    <div className="flex justify-center flex-col lg:flex-row gap-2 w-full max-w-3xl mx-auto">
      {shouldShowPreview && (
        <div className="flex-1  min-w-[260px]  -translate-x-0 -translate-y-0  max-sm:-mt-8 ">
          <RestaurantPreviewCard data={livePreview} />
        </div>
      )}
      <div className="">
        <form
          onSubmit={onSubmit}
          className="flex-1 bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100"
          autoComplete="off"
          noValidate
        >
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Restaurant Details
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="font-medium">
                Restaurant Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="Awesome Diner"
                className="mt-1"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="address" className="font-medium">
                Address
              </Label>
              <Input
                id="address"
                {...register("address")}
                placeholder="e.g. 123 Main St, City"
                className="mt-1"
              />
              {errors.address && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-6 mb-2">
            Contact & Links
          </h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone" className="font-medium">
                Phone Number
              </Label>
              <Input
                id="phone"
                {...register("phone")}
                type="tel"
                placeholder="e.g. (123) 456-7890"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="googleMaps" className="font-medium">
                Google Maps Link
              </Label>
              <Input
                id="googleMaps"
                {...register("googleMaps")}
                type="url"
                placeholder="https://maps.google.com/..."
                className="mt-1"
              />
              {errors.googleMaps && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.googleMaps.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="website" className="font-medium">
                Website
              </Label>
              <Input
                id="website"
                {...register("website")}
                type="url"
                placeholder="https://yourrestaurant.com"
                className="mt-1"
              />
              {errors.website && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.website.message}
                </p>
              )}
            </div>
            <div>
              <Label className="font-medium">Social Media Links</Label>
              <div className="flex gap-2 mt-1 flex-col sm:flex-row">
                <div className="flex-1">
                  <Input
                    {...register("socials.facebook")}
                    type="url"
                    placeholder="Facebook URL"
                    className="mb-2 sm:mb-0"
                  />
                  {errors.socials?.facebook && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.socials.facebook.message}
                    </p>
                  )}
                </div>
                <div className="flex-1">
                  <Input
                    {...register("socials.instagram")}
                    type="url"
                    placeholder="Instagram URL"
                  />
                  {errors.socials?.instagram && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.socials.instagram.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center gap-4 pt-2  ">
            <Button
              type="submit"
              className=" font-semibold bg-blue-500 text-white text-base px-5 py-2 rounded-lg"
              disabled={!isValid || isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
            <Button
              variant="outline"
              className=" text-base px-5 py-2 rounded-lg"
              onClick={handleReset}
              asChild={false}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FromNewShop;
