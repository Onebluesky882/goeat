import React, { useState } from "react";

import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageUpload from "@/components/features/imageUploader";
import RestaurantPreviewCard from "@/components/createNewRestaurant/PreviewCard";
import { toast } from "sonner";
import { schema } from "@/schema/createShop";
import type { RestaurantData } from "../../../types/createShop";
import { Button } from "@/components/ui/button";

export type FormFields = z.infer<typeof schema>;

const emptyValues: FormFields = {
  name: "",
  address: "",
  phone: "",
  googleMaps: "",
  website: "",
  socials: { facebook: "", instagram: "" },
};

const CreateShop: React.FC = () => {
  const [submitted, setSubmitted] = useState<RestaurantData | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: emptyValues,
    mode: "onChange",
  });

  const watchAll = watch();

  const livePreview: RestaurantData & { images?: string[] } = {
    name: watchAll.name ?? "",
    address: watchAll.address,
    phone: watchAll.phone,
    googleMaps: watchAll.googleMaps,
    website: watchAll.website,
    socials: Object.fromEntries(
      Object.entries(watchAll.socials ?? {}).filter(
        ([, value]) => value && value.trim() !== ""
      )
    ),
    images: images.map((img) => URL.createObjectURL(img)),
  };

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    // Validate image count
    if (images.length < 3 || images.length > 5) {
      setImageError("Please upload between 3 and 5 images.");
      return;
    }
    setImageError(null);

    // Clean up empty socials
    const socials: { [k: string]: string } = {};
    Object.entries(data.socials).forEach(([key, value]) => {
      if (value && value.trim() !== "") socials[key] = value.trim();
    });
    const preview: RestaurantData & { images?: string[] } = {
      ...data,
      name: data.name ?? "",
      socials,
      images: images.map((img) => img.name),
    };
    setSubmitted(preview);

    toast(
      <div>title: "Submitted!", description: "Restaurant details captured.</div>
    );
  };

  // When resetting the form, clear images too
  const handleReset = () => {
    console.log("click");
    reset(emptyValues);
    setSubmitted(null);
    setImages([]);
    setImageError(null);
  };

  console.log("Submitted :", submitted);
  return (
    <div className="flex flex-col lg:flex-row gap-8 w-full max-w-3xl mx-auto">
      <form
        onSubmit={handleSubmit(onSubmit)}
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
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
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
          <ImageUpload
            images={images}
            setImages={setImages}
            error={imageError ?? undefined}
          />
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
        <div className="flex items-center gap-4 pt-2">
          <Button
            type="submit"
            className="w-full font-semibold bg-primary text-white text-base px-5 py-2 rounded-lg"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          <Button
            variant="secondary"
            className="w-full text-base px-5 py-2 rounded-lg"
            onClick={handleReset}
            asChild={false}
          >
            Reset
          </Button>
        </div>
      </form>
      <div className="flex-1 min-w-[280px]">
        <RestaurantPreviewCard data={livePreview} />
      </div>
    </div>
  );
};

export default CreateShop;
