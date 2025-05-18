import clsx from "clsx";

interface BranchScrollerProps {
  branches: string[];
  selected: string;
  onSelect: (branch: string) => void;
}

export const BranchScroller: React.FC<BranchScrollerProps> = ({
  branches,
  selected,
  onSelect,
}) => {
  return (
    <div className="mb-6">
      <div className="flex gap-4 overflow-x-auto scroll-horizontal pb-2 sm:pb-0">
        {branches.map((branch) => (
          <button
            key={branch}
            className={clsx(
              "whitespace-nowrap px-6 py-2 rounded-lg font-semibold transition-all duration-200",
              branch === selected
                ? "bg-brand text-white shadow-md scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-brand/20"
            )}
            onClick={() => onSelect(branch)}
          >
            {branch}
          </button>
        ))}
      </div>
    </div>
  );
};
