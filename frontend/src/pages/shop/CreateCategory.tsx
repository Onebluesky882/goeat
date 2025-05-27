import { useForm } from "react-hook-form";
import { schema, type CategoryField } from "../../schema/categoryField";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateCategory = () => {
  const emptyValue = {
    name: "",
  };
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, isLoading, disabled, isSubmitting, isSubmitted },
  } = useForm<CategoryField>({
    resolver: zodResolver(schema),
    defaultValues: emptyValue,
    mode: "onChange",
  });

  const onSubmit = () => {
    console.log("click");
    reset();
  };

  return (
    <div className="outline-1 flex justify-center ">
      <div className="w-75 outline-1 h-120">
        <h1>Form </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>name</label>
          <input {...register("name")} />
          <p className="text-red-500">{errors.name?.message}</p>
          <button type="submit">submit</button>
        </form>
      </div>
    </div>
  );
};
export default CreateCategory;
