import {defineStore} from "pinia";
import {TodoInterface} from '../types/todoInterface'
import {RootState} from "~/types/RootState";

export const todoStore = defineStore('todo', {
    state: () => {
        return ({todos: [],} as RootState);
    },
    getters: {
        getTodos: (state) => state.todos
    },
    actions: {
        addTodos(todo: TodoInterface): void {
            this.todos.push(todo)
        },
        deleteTodos(id: number): void {
            this.todos = this.todos.filter((item: TodoInterface) => item.id !== id)
        }
    }
})