import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock, Key, ShieldCheck, LogOut } from "lucide-react";

const passwordSchema = z
  .object({
    oldPassword: z.string().min(6, "Enter current password"),
    newPassword: z.string().min(8, "Minimum 8 characters"),
    confirmNew: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNew, {
    message: "Passwords do not match",
    path: ["confirmNew"],
  });

type PasswordFormType = z.infer<typeof passwordSchema>;

const AccountSettingsCard: React.FC = () => {
  const [tfaEnabled, setTfaEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<PasswordFormType>({
    resolver: zodResolver(passwordSchema),
  });

  const onChangePassword = (v: PasswordFormType) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast(<div> Password changed!</div>);
      reset();
    }, 1300);
  };

  const handleTfa = (checked: boolean) => {
    setTfaEnabled(checked);
    toast(<div> checked ? "2FA Enabled" : "2FA Disabled",</div>);
  };

  const handleSignOutAll = () => {
    setSigningOut(true);
    setTimeout(() => {
      setSigningOut(false);
      toast(
        <div>
          <p className="font-semibold">Signed out everywhere</p>
          <p className="text-sm text-gray-500">
            All your sessions have been signed out.
          </p>
        </div>,
        {
          duration: 2300,
        }
      );
    });
  };

  return (
    <div className="bg-white/80 dark:bg-[#1A1F2C]/80 shadow rounded-2xl px-4 py-6 flex flex-col gap-7">
      <h2 className="font-semibold text-xl flex items-center gap-2 text-[#7E69AB] dark:text-white mb-2">
        <ShieldCheck className="h-5 w-5" />
        Account Settings
      </h2>
      {/* Change Password */}
      <form
        onSubmit={handleSubmit(onChangePassword)}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1">
            <label className="font-semibold flex items-center gap-1 text-[#6E59A5] dark:text-white">
              <Lock className="h-4 w-4" /> Old Password
            </label>
            <Input
              {...register("oldPassword")}
              type="password"
              autoComplete="current-password"
              className="mt-1"
            />
            {errors.oldPassword && (
              <span className="text-xs text-red-500">
                {errors.oldPassword.message}
              </span>
            )}
          </div>
          <div className="flex-1">
            <label className="font-semibold flex items-center gap-1 text-[#6E59A5] dark:text-white">
              <Key className="h-4 w-4" /> New Password
            </label>
            <Input
              {...register("newPassword")}
              type="password"
              className="mt-1"
            />
            {errors.newPassword && (
              <span className="text-xs text-red-500">
                {errors.newPassword.message}
              </span>
            )}
          </div>
          <div className="flex-1">
            <label className="font-semibold flex items-center gap-1 text-[#6E59A5] dark:text-white">
              <Key className="h-4 w-4" /> Confirm New
            </label>
            <Input
              {...register("confirmNew")}
              type="password"
              className="mt-1"
            />
            {errors.confirmNew && (
              <span className="text-xs text-red-500">
                {errors.confirmNew.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <Button
            type="submit"
            disabled={isSubmitting || loading || !isDirty}
            className="bg-[#7e69ab] hover:bg-[#8B5CF6] text-white px-8 py-2"
          >
            {loading || isSubmitting ? (
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
              "Change Password"
            )}
          </Button>
        </div>
      </form>
      {/* 2FA + Sign Out All */}
      <div className="flex gap-8 flex-wrap pt-2">
        <div className="flex items-center gap-3">
          <Switch checked={tfaEnabled} onCheckedChange={handleTfa} />
          <span className="font-medium text-[#403E43] dark:text-white">
            Two-factor authentication (2FA)
          </span>
        </div>
        <div>
          <Button
            variant="outline"
            onClick={handleSignOutAll}
            disabled={signingOut}
            className="flex items-center gap-2 border-red-300 text-[#d946ef] border-2 hover:bg-[#FAE5F7]"
          >
            <LogOut className="h-4 w-4" />
            {signingOut ? (
              <svg
                className="animate-spin h-4 w-4 text-[#d946ef]"
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
                  fill="#d946ef"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            ) : (
              "Sign out from all devices"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default AccountSettingsCard;
