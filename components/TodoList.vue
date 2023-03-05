<template>
    <div class="todo_list_wrapper" v-if="store.todos.length">
        <TodoItem v-for="todo in store.todos" :todo="todo" :key="todo.id"/>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import type {Ref} from 'vue';

import {useTodoStore} from '~/store'
import TodoItem from "~/components/TodoItem.vue";

const store = useTodoStore();
store.getTodos()
</script>

<style lang="scss">
.todo_list_wrapper {
  margin-top: 4rem;
  color: white;
}
</style>