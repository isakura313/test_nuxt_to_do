import {defineStore} from "pinia";
import {TodoInterface} from "~/types/todoInterface";
import {RootState} from "~/types/RootState";
import axios from "axios";

const url = "https://64037721302b5d671c502ee9.mockapi.io/api/deals";
export const useTodoStore = defineStore("todo", {
        state: () => {
            return {todos: [], error: false, showModal: false, loadingTodo: false} as RootState;
        },
        getters: {
            doneTodos: (state): number => {
                return state.todos.filter((item) => item.done == true).length
            }
        },
        actions: {
            getTodos() {
                axios.get<TodoInterface[]>(url)
                    .then((res) => {
                        this.loadingTodo = true;
                        this.todos = res.data;
                    });
            },
            addTodos(todo: TodoInterface): void {
                axios.post<TodoInterface>(url,
                    {
                        header: todo.header,
                        text: todo.text,
                        done: todo.done,
                        created_at: todo.created_at,
                        date_expired: todo.date_expired,
                    })
                    .then((res) => {
                        this.todos.push(res.data);
                    })
                    .catch((e) => {
                        this.error = true;
                    });
            },
            editTodo(todo: any) {
                axios.patch<TodoInterface>(`${url}/${todo.id}`,
                    {
                        ...todo
                    })
                    .then((res) => {
                        this.todos = this.todos.map((item) => {
                            if (item.id === todo.id) {
                                return res.data;
                            }
                            return item
                        })
                    });
            },
            toggleDone(todo: TodoInterface) {
                axios.patch<TodoInterface>(`${url}/${todo.id}`,
                    {
                        done: !todo.done,
                    }).then((res) => {
                    const el = this.todos.filter((item) => item.id == todo.id)[0];
                    el.done = !el.done;
                });
            },
            deleteTodos<TodoInterface>(id: string): void {
                axios.delete(`${url}/${id}`,
                ).then((res) => {
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
