import TableIcon from "../../assets/table-restaurant.svg?react";

type SideBarProps = {
  activeId: string | null;
  dragListeners?: React.HTMLAttributes<HTMLElement>;
  dragAttributes?: React.HTMLAttributes<HTMLElement>;
  dragRef?: React.Ref<any>;
};

const SideBar = ({
  activeId,
  dragListeners,
  dragAttributes,
  dragRef,
}: SideBarProps) => {
  return (
    <div role="list" aria-label="Draggable objects list">
      <h2>Objects List</h2>
      <div className="relative h-40">
        <div
          ref={dragRef}
          {...(dragListeners ?? {})}
          {...(dragAttributes ?? {})}
          className="p-2 cursor-pointer shadow-2xl bg-white border border-gray-200 rounded-2xl inline-block"
        >
          <TableIcon
            className={`w-10 h-10 text-blue-500 fill-current transition-all duration-200 ${
              activeId === "table-id" ? "opacity-50" : ""
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
