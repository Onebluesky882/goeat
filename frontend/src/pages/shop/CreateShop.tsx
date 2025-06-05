import { shopAPI } from "@/Api/shop.api";
import FromNewShop from "@/components/createNewShop/createShop";
import { newShopSchema, type FormFields } from "@/schema/newShopForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

const emptyValues = {
  name: "",
  address: "",
  phone: "",
  googleMaps: "",
  website: "",
  socials: {
    facebook: "",
    instagram: "",
  },
};

const CreateNewShop = () => {
  const [_submitted, setSubmitted] = useState<FormFields | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
    watch,
  } = useForm<FormFields>({
    resolver: zodResolver(newShopSchema), // ✅ plug in schema
    defaultValues: emptyValues,
    mode: "onChange",
  });
  const watchAll = watch();

  const shouldShowPreview = Object.values(watchAll).some((value) => {
    if (typeof value === "string") return value.trim() !== "";
    if (typeof value === "object" && value !== null) {
      return Object.values(value).some(
        (v) => typeof v === "string" && v.trim() !== ""
      );
    }
    return false;
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const socials: { [k: string]: string } = {};
    Object.entries(data.socials).forEach(([key, value]) => {
      if (value && value.trim() !== "") socials[key] = value.trim();
    });
    const preview: FormFields = {
      ...data,
      name: data.name ?? "",
      socials,
    };
    setSubmitted(preview);

    try {
      const response = await shopAPI.create(preview);
      if (response.data) {
        toast.success("✅ Shop created successfully!");
        handleReset();
        // redirect to shops/name/
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage =
        error.response?.data?.message ?? "An unknown error occurred.";

      toast.error(`❌ Failed to create shop: ${errorMessage}`);
    }
  };

  // When resetting the form
  const handleReset = () => {
    reset(emptyValues);
  };

  return (
    <div>
      <FromNewShop
        onSubmit={handleSubmit(onSubmit)}
        register={register}
        errors={errors}
        isValid={isValid}
        isSubmitting={isSubmitting}
        handleReset={handleReset}
        shouldShowPreview={shouldShowPreview}
        blank={undefined}
      />
    </div>
  );
};

export default CreateNewShop;
