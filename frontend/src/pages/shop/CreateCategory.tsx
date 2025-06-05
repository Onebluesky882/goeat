import { useForm, type SubmitHandler } from "react-hook-form";
import { schema, type CategoryField } from "../../schema/categoryField";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";

// inside your component

const CreateCategory = () => {
  const [categories, setCategories] = useState<CategoryField[]>([]);

  useEffect(() => {}, []);

  const emptyValue = {
    name: "",
  };
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<CategoryField>({
    resolver: zodResolver(schema),
    defaultValues: emptyValue,
    mode: "onChange",
  });

  const previews = (data: CategoryField) => {
    setCategories((prev) => [...prev, data]);
    reset();
  };

  //   const onSubmit = async () => {
  //     const transform: CategoryField[] = categories.map((item) => ({
  //          ...item ,
  //          shopId :  ,
  //          userId : profile ,

  //     }));
  //     await category.create(transform);
  //   };

  const popItem = (indexToRemove: number) => {
    setCategories((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="  flex justify-center mt-8 ">
      <div>
        <div className="w-full    max-w-md bg-white rounded-xl shadow-lg border border-gray-100 p-8 animate-fade-in">
          <h2 className="text-2xl  font-bold   text-gray-900 text-center tracking-tight">
            เพิ่ม category
          </h2>
          {categories.length > 0 && (
            <div className="flex flex-wrap  ">
              {categories.map((item, index) => (
                <ul className=" m-2 relative " key={index}>
                  <li className="  rounded-md p-2 border-1 border-blue-300 bg-white shadow-2xs shadow-blue-300 ">
                    <IoCloseCircle
                      onClick={() => popItem(index)}
                      className="text-gray-400 absolute top-0 right-0 -translate-y-1 translate-x-1 "
                    />
                    {item.name}
                  </li>
                </ul>
              ))}
            </div>
          )}
          <form className="space-y-5" onSubmit={handleSubmit(previews)}>
            <div>
              <input
                {...register("name")}
                type="name"
                id="name"
                autoComplete="email"
                className="w-full px-4 py-2 rounded-md border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 transition"
                placeholder="เพิ่ม category"
              />
              {errors && <p className="text-red-500">{errors.name?.message}</p>}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95"
              >
                เพิ่ม
              </button>
              <button
                onClick={() => {}}
                className="w-full flex justify-center items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95"
              >
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default CreateCategory;
