import {defineStore} from "pinia";
import {TodoInterface} from "~/types/todoInterface";
import {RootState} from "~/types/RootState";
import axios from "axios";

const url = "/api/deals";
export const useTodoStore = defineStore("todo", {
        state: () => {
            return {todos: [], error: false, showModal: false, loadingTodo: false} as RootState;
        },
        getters: {
            doneTodos: (state) => {
                return state.todos.filter((item) => item.done == true).length
            }
        },
        actions: {
            getTodos() {
                axios({
                    method: "GET",
                    url: url,
                }).then((res: any) => {
                    this.loadingTodo = true;
                    this.todos = res.data;
                });
            },
            addTodos(todo: TodoInterface): void {
                axios({
                    method: "POST",
                    url: url,
                    data: {
                        header: todo.header,
                        text: todo.text,
                        done: todo.done,
                        created_at: todo.created_at,
                        date_expired: todo.date_expired,
                    },
                })
                    .then((res) => {
                        this.todos.push(res.data);
                    })
                    .catch((e) => {
                        this.error = true;
                    });
            },
            editTodo(todo: any) {
                axios({
                    method: "PATCH",
                    url: `${url}/${todo.id}`,
                    data: {
                        ...todo
                    },
                }).then((res: any) => {
                    this.todos = this.todos.map((item) => {
                        if (item.id === todo.id) {
                            item = res.data;
                            return item
                        }
                        return item
                    })
                });
            },
            toggleDone(todo: TodoInterface) {
                axios({
                    method: "PATCH",
                    url: `${url}/${todo.id}`,
                    data: {
                        done: !todo.done,
                    },
                }).then((res: any) => {
                    const el = this.todos.filter((item) => item.id == todo.id)[0];
                    el.done = !el.done;
                });
            },
            deleteTodos(id: string): void {
                axios({
                    method: "DELETE",
                    url: `${url}/${id}`,
                }).then((res) => {
                    this.todos = this.todos.filter((item) => item.id !== id);
                });
            },
            setDone(id: string): void {
                let todo = this.todos.find((item) => item.id === id);
                if (todo !== undefined) {
                    todo.done = !todo.done;
                }
            },
        },
    })
;
