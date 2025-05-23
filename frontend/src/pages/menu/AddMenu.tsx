import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { FormField } from "../../schema/formAddMenu";
import { schema } from "@/schema/formAddMenu";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { BsImage } from "react-icons/bs";

const MenuCreator = () => {
  const [selected, setSelected] = useState<number>(1);
  const {
    control,
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormField>({
    resolver: zodResolver(schema),
    defaultValues: {
      menuItems: [
        {
          name: "",
          price: 0,
          description: "",
          category: "",
          page: "",
          available: true,
        },
      ],
    },
    mode: "onChange",
  });
  const watchAll = watch() as FormField;

  // 1 card form
  // 2 number of bulk menus
  const arrayMenu = (num: number) => {};
  const handleReset = () => {
    return;
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  return (
    <div>
      <Label htmlFor="menuCount">How many menus?</Label>
      <select
        id="menuCount"
        value={selected}
        onChange={(e) => setSelected(Number(e.target.value))}
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <option>{num}</option>
        ))}
      </select>
      <form
        onSubmit={handleSubmit((data) => console.log(data))}
        className="bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100"
        noValidate
      >
        <h2 className="text-xl font-bold text-gray-900 mb-2">Menu Details</h2>
        {Array.from({ length: selected }).map(() => (
          <>
            {fields.map((item, index) => (
              <div
                key={item.id}
                className="grid grid-cols-2 gap-4 border-t pt-4"
              >
                <div className="flex flex-col">
                  <div className="flex justify-center border-dotted border-2 bg-gray-100 p-2 rounded-md mb-2">
                    <BsImage
                      // todo later
                      onClick={() => {}}
                      className="text-gray-500 w-6 h-6"
                    />
                  </div>
                  <Label
                    htmlFor={`menuItems.${index}.name`}
                    className="font-medium"
                  >
                    Name <span className="text-red-500">*</span>
                    <Input
                      id={`menuItems.${index}.name`}
                      {...register(`menuItems.${index}.name`)}
                      placeholder=" name  "
                      className="mt-1"
                      aria-invalid={!!errors.menuItems?.[index]?.name}
                    />
                    {errors.menuItems?.[index]?.name && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.menuItems[index]?.name?.message}
                      </p>
                    )}
                  </Label>
                  <Label
                    htmlFor={`menuItems.${index}.name`}
                    className="font-medium"
                  >
                    price <span className="text-red-500">*</span>
                    <Input
                      id={`menuItems.${index}.name`}
                      {...register(`menuItems.${index}.price`)}
                      placeholder=" price  "
                      className="mt-1"
                      aria-invalid={!!errors.menuItems?.[index]?.name}
                    />
                    {errors.menuItems?.[index]?.name && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.menuItems[index]?.name?.message}
                      </p>
                    )}
                  </Label>
                  <Label
                    htmlFor={`menuItems.${index}.name`}
                    className="font-medium"
                  >
                    description <span className="text-red-500">*</span>
                    <Input
                      id={`menuItems.${index}.name`}
                      {...register(`menuItems.${index}.name`)}
                      placeholder=" name  "
                      className="mt-1"
                      aria-invalid={!!errors.menuItems?.[index]?.name}
                    />
                    {errors.menuItems?.[index]?.name && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.menuItems[index]?.name?.message}
                      </p>
                    )}
                  </Label>
                  <Label
                    htmlFor={`menuItems.${index}.name`}
                    className="font-medium"
                  >
                    category <span className="text-red-500">*</span>
                    <Input
                      id={`menuItems.${index}.name`}
                      {...register(`menuItems.${index}.name`)}
                      placeholder=" name  "
                      className="mt-1"
                      aria-invalid={!!errors.menuItems?.[index]?.name}
                    />
                    {errors.menuItems?.[index]?.name && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.menuItems[index]?.name?.message}
                      </p>
                    )}
                  </Label>
                  <Label
                    htmlFor={`menuItems.${index}.name`}
                    className="font-medium"
                  >
                    page <span className="text-red-500">*</span>
                    <Input
                      id={`menuItems.${index}.name`}
                      {...register(`menuItems.${index}.name`)}
                      placeholder=" name  "
                      className="mt-1"
                      aria-invalid={!!errors.menuItems?.[index]?.name}
                    />
                    {errors.menuItems?.[index]?.name && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.menuItems[index]?.name?.message}
                      </p>
                    )}
                  </Label>
                </div>
              </div>
            ))}
          </>
        ))}
        <div className="flex items-center justify-center gap-4 pt-2">
          <Button
            type="submit"
            className="font-semibold bg-blue-500 text-white text-base px-5 py-2 rounded-lg"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="text-base px-5 py-2 rounded-lg"
            onClick={() => reset({ menuItems: [] })}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};
export default MenuCreator;
