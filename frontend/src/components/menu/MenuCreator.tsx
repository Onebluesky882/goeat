import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { FormField } from "../../schema/formAddMenu";
import { schema } from "@/schema/formAddMenu";
import { useState } from "react";
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
      {/*  // MenuItemForm */}
      <form
        onSubmit={() => {}}
        className="flex-1 bg-white rounded-xl shadow-md p-6 space-y-6 border border-gray-100"
        autoComplete="off"
        noValidate
      >
        <h2 className="text-xl font-bold text-gray-900 mb-2">menu Details</h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="font-medium">
              Restaurant Name <span className="text-red-500">*</span>
            </Label>
            {fields.map((item, index) => (
              <div key={item.id}>
                <Input
                  id="name"
                  {...register(`menuItems.${index}.name`)}
                  placeholder="Awesome Diner"
                  className="mt-1"
                  aria-invalid={!!errors.menuItems?.[index]?.name}
                />
                {errors.menuItems?.[index]?.name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.menuItems?.[index].name.message}
                  </p>
                )}
              </div>
            ))}
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
  );
};
export default MenuCreator;
