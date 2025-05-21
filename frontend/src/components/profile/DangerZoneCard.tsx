import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash, X } from "lucide-react";

const DangerZoneCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setDeleting(false);
  };

  const handleDelete = () => {
    setDeleting(true);
    setTimeout(() => {
      setDeleting(false);
      setDeleted(true);
      setIsOpen(false);
    }, 1200);
  };

  return (
    <div className="bg-white/80 dark:bg-[#1A1F2C]/80 shadow rounded-2xl px-4 py-6 flex flex-col gap-4 border-2 border-red-100 dark:border-red-400/20">
      <h2 className="font-semibold text-xl flex items-center gap-2 text-[#ea384c]">
        <AlertTriangle className="h-5 w-5" /> Danger Zone
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        Delete your account and all data. This action is{" "}
        <span className="font-bold text-red-500">irreversible</span>.
      </p>
      {deleted ? (
        <span className="text-red-500 font-semibold">Account deleted.</span>
      ) : (
        <Button
          onClick={openModal}
          variant="destructive"
          className="flex items-center gap-2 border-2 border-red-400 bg-red-500/90 hover:bg-red-500 text-white rounded px-7 py-2 w-fit"
        >
          <Trash className="h-4 w-4" />
          Delete Account
        </Button>
      )}

      {/* Confirmation Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#222222cc] dark:bg-[#000000cc]">
          <div className="bg-white dark:bg-[#1A1F2C] rounded-xl shadow-xl p-7 max-w-xs w-full relative flex flex-col items-center">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <AlertTriangle className="text-red-500 mb-2" size={32} />
            <h3 className="font-bold text-lg mb-1 text-red-500">
              Are you sure?
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm text-center mb-6">
              This will permanently delete your account and all your data. You
              can't undo this action.
            </p>
            <div className="flex w-full gap-3 justify-center">
              <Button
                onClick={closeModal}
                variant="outline"
                className="border-gray-300 text-gray-700 px-5 border"
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 text-white"
                disabled={deleting}
              >
                {deleting ? (
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
                  "Delete"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default DangerZoneCard;
