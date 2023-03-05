import { TodoInterface } from "~/types/todoInterface";

export type RootState = {
  todos: Array<TodoInterface>;
  error: Boolean;
};
