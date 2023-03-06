import {TodoInterface} from "~/types/todoInterface";

export type RootState = {
    todos: Array<TodoInterface>;
    loadingTodo: Boolean,
    error: Boolean;
};
