import type { Task, ColumnTodoType } from "../types/column";

type TasksProps = {
  tasks: Task[];
};

export const Column = ({ label, tasks }: { label: string } & TasksProps) => {
  return (
    <div className="p-2 flex flex-col ">
      <h1 className="text-white  font-bold inline-flex text-center justify-center">
        {label}
      </h1>
      {tasks.map((task) => (
        <div className="  rounded-md  border-1 border-gray-100 bg-gray-900 p-5 m-1 ">
          <h2 className="">{task.title}</h2>
        </div>
      ))}
    </div>
  );
};
