import {defineStore} from "pinia";
import {TodoInterface} from '../types/todoInterface'
import {RootState} from "~/types/RootState";
import axios from 'axios';

export const useTodoStore = defineStore('todo', {
    state: () => {
        return ({todos: [],} as RootState);
    },
    getters: {
        // getTodos: (state) => state.todos
    },
    actions: {
        getTodos() {
            axios({
                method: "GET",
                url: 'https://63ffa7b79f8449102982a4fc.mockapi.io/api/todo'
            }).then((res: any) => {
                this.todos = res.data;
            })
        },
        addTodos(todo: TodoInterface): void {
            axios({
                method: "POST",
                url: 'https://63ffa7b79f8449102982a4fc.mockapi.io/api/todo',
                data: {
                    text: todo.text,
                    done: todo.done,
                    date_created: todo.date_created,
                    date_expired: todo.date_expired
                }
            })
        },
        deleteTodos(id: string): void {
            axios({
                method: "DELETE",
                url: 'https://63ffa7b79f8449102982a4fc.mockapi.io/api/todo',

            })
        },
        setDone(id: string): void {
            const todo = this.todos.find(item => item.id === id);
            if (todo !== undefined) {
                todo.done = !todo.done
            }
        },
    }
})