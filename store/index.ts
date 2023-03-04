import {defineStore} from "pinia";
import {TodoInterface} from '../types/todoInterface'
import {RootState} from "~/types/RootState";
import axios from 'axios';

const url = 'https://64037721302b5d671c502ee9.mockapi.io/api/todos'
export const useTodoStore = defineStore('todo', {
    state: () => {
        return ({todos: [], error: false} as RootState);
    },
    getters: {
        // getTodos: (state) => state.todos
    },
    actions: {
        getTodos() {
            axios({
                method: "GET",
                url: 'https://64037721302b5d671c502ee9.mockapi.io/api/todos',
            }).then((res: any) => {
                console.log(res);
                this.todos = res.data;
            })
        },
        addTodos(todo: TodoInterface): void {
            console.log(todo);
            axios({
                method: "POST",
                url: 'https://64037721302b5d671c502ee9.mockapi.io/api/todos',
                data: {
                    header: todo.header,
                    text: todo.text,
                    done: todo.done,
                    date_created: todo.date_created,
                    date_expired: todo.date_expired
                }
            }).then((res) => {
                this.todos.push(res.data);
            }).catch((e) => {
                this.error = true;
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