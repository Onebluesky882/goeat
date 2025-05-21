import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { CalendarIcon, Pen, Mail, User, Phone, Shield } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import ImageUploader from "./ImageUploader";
import { toast } from "sonner";

const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

// Props for ProfileForm (can expand later with API integration)
interface ProfileFormProps {
  emailEditable?: boolean;
}

const schema = z.object({
  name: z.string().min(2, "Full name is required"),
  username: z.string().min(3, "At least 3 characters"),
  email: z.string().email("Invalid email"),
  phone: z
    .string()
    .regex(/^\+?\d{7,16}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
  gender: z.enum(["male", "female", "other"], {
    required_error: "Select gender",
  }),
  dob: z.date({ required_error: "Date of birth required" }),
  avatar: z.any(),
});

type ProfileFormType = z.infer<typeof schema>;

const defaultAvatar =
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=facearea&w=256&h=256";

const ProfileForm: React.FC<ProfileFormProps> = ({ emailEditable }) => {
  const [uploading, setUploading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { errors, isSubmitting, isDirty },
    reset,
  } = useForm<ProfileFormType>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "Sarah Connor",
      username: "sarah.c",
      email: "sarah.connor@example.com",
      phone: "+1234567890",
      gender: "female",
      dob: new Date("1995-06-13"),
      avatar: defaultAvatar,
    },
  });

  const onSubmit = async (data: ProfileFormType) => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      toast(<div> title: "Profile updated!",</div>);

      reset(data);
    }, 1200);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 py-6 px-4 rounded-2xl bg-white/80 dark:bg-[#1A1F2C]/80 shadow-md relative overflow-hidden md:flex-row"
    >
      <div className="flex flex-col items-center md:w-1/3 md:items-start gap-3">
        <ImageUploader
          value={watch("avatar")}
          onChange={(fileOrUrl) => setValue("avatar", fileOrUrl)}
        />
      </div>
      <div className="flex-1 flex flex-col gap-5">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="font-semibold flex items-center gap-1 text-[#6E59A5] dark:text-white">
              <User className="h-4 w-4" /> Full Name
            </label>
            <Input {...register("name")} className="mt-1" />
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="flex-1">
            <label className="font-semibold flex items-center gap-1 text-[#6E59A5] dark:text-white">
              <Pen className="h-4 w-4" /> Username
            </label>
            <Input {...register("username")} className="mt-1" />
            {errors.username && (
              <span className="text-xs text-red-500">
                {errors.username.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="font-semibold flex items-center gap-1 text-[#6E59A5] dark:text-white">
              <Mail className="h-4 w-4" /> Email
            </label>
            <Input
              readOnly={!emailEditable}
              {...register("email")}
              className={`mt-1 ${
                !emailEditable ? "bg-gray-100 dark:bg-[#222236]" : ""
              }`}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex-1">
            <label className="font-semibold flex items-center gap-1 text-[#6E59A5] dark:text-white">
              <Phone className="h-4 w-4" /> Phone
            </label>
            <Input {...register("phone")} className="mt-1" />
            {errors.phone && (
              <span className="text-xs text-red-500">
                {errors.phone.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="font-semibold flex items-center gap-1 text-[#6E59A5] dark:text-white">
              <Shield className="h-4 w-4" /> Gender
            </label>
            <select
              {...register("gender")}
              className="mt-1 w-full px-3 py-2 rounded-md border border-gray-200 dark:border-[#222236] bg-white dark:bg-[#1A1F2C] focus:ring-[#9b87f5]"
              defaultValue=""
            >
              <option value="" disabled>
                Select
              </option>
              {genderOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {errors.gender && (
              <span className="text-xs text-red-500">
                {errors.gender.message}
              </span>
            )}
          </div>
          <div className="flex-1">
            <label className="font-semibold flex items-center gap-1 text-[#6E59A5] dark:text-white">
              <CalendarIcon className="h-4 w-4" /> Date of Birth
            </label>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between font-normal mt-1"
                    >
                      <span>
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span className="text-gray-400">Pick a date</span>
                        )}
                      </span>
                      <CalendarIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                      className="p-3 pointer-events-auto"
                      disabled={true}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.dob && (
              <span className="text-xs text-red-500">
                {errors.dob.message as string}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            disabled={isSubmitting || uploading || !isDirty}
            className="bg-[#7e69ab] hover:bg-[#8B5CF6] text-white px-8 py-2"
          >
            {uploading || isSubmitting ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                />
                <path
                  className="opacity-80"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
};
export default ProfileForm;
