import RestaurantForm from "@/components/shops/newShop/RestaurantForm/RestaurantForm";
import useShop from "@/hooks/useShop";
import { newShopSchema, type NewShopFormField } from "@/schema/newShopForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const ShopDetailForm = () => {
  const { updateShopDetail } = useShop();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<NewShopFormField>({
    resolver: zodResolver(newShopSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<NewShopFormField> = async (data) => {
    const updated = await updateShopDetail(data);
    if (updated) {
      console.log("data :", data);
      reset();
      navigate(`/shops/${updated.id}`);
    }
  };

  return (
    <div>
      <RestaurantForm
        register={register}
        errors={errors}
        onSubmit={handleSubmit(onSubmit)}
        isValid={isValid}
        isSubmitting={isSubmitting}
        handleReset={reset}
      />
    </div>
  );
};

export default ShopDetailForm;
