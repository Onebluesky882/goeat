import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const RestaurantInfoFields = ({ register, errors }: any) => (
  <div className="space-y-4">
    <div>
      <Label htmlFor="name" className="font-medium">
        Restaurant Name <span className="text-red-500">*</span>
      </Label>
      <Input
        {...register("name")}
        id="name"
        placeholder="Awesome Diner"
        className="mt-1"
      />
      {errors.name && (
        <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
      )}
    </div>
    <div>
      <Label htmlFor="address" className="font-medium">
        Address
      </Label>
      <Input
        {...register("address")}
        id="address"
        placeholder="123 Main St, City"
        className="mt-1"
      />
      {errors.address && (
        <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>
      )}
    </div>
  </div>
);

export const ContactFields = ({ register, errors }: any) => {
  return (
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
          className="mt-1 focus:border-none "
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone.message}</p>
        )}
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
          <p className="text-xs text-red-500 mt-1">{errors.website.message}</p>
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
  );
};

export const SocialLinks = ({ register, errors }: any) => {
  return (
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
  );
};

export const FormActions = ({ isValid, isSubmitting, handleReset }: any) => {
  return (
    <div className="flex items-center justify-center gap-4 pt-2">
      <Button
        type="submit"
        className="font-semibold bg-blue-500 text-white text-base px-5 py-2 rounded-lg"
        disabled={!isValid || isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </Button>
      <Button
        variant="outline"
        className="text-base px-5 py-2 rounded-lg"
        onClick={handleReset}
        type="button"
      >
        Reset
      </Button>
    </div>
  );
};
