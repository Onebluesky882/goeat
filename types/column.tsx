export type ColumnTodoType = {
  id: string;
  title: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
};
