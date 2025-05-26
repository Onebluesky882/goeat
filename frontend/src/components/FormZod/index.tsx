import React from "react";
import {
  type FieldValues,
  type SubmitHandler,
  type UseFormHandleSubmit,
  type UseFormRegister,
  type FieldErrors,
} from "react-hook-form";

export type FormZodProps<T extends FieldValues> = {
  handleSubmit: UseFormHandleSubmit<T>;
  onSubmit: SubmitHandler<T>;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  isValid: boolean;
  isSubmitting: boolean;
  children: React.ReactNode;
};
const FormZod = <T extends FieldValues>({
  handleSubmit,
  onSubmit,
  register: _register,
  errors: _errors,
  isValid,
  isSubmitting,
  children,
}: FormZodProps<T>) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {children}
      <button type="submit" disabled={!isValid || isSubmitting}>
        {isSubmitting ? "Submitting.." : "Submit"}
      </button>
    </form>
  );
};
export default FormZod;
