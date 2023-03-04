<template>
    <div class="todo_list_wrapper">
        <TodoItem/>
        {{ store.todos.length }}
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {useTodoStore} from '~/store'

const store = useTodoStore();
store.getTodos()
</script>

<style lang="scss">
.todo_list_wrapper {
  color: white;
}
</style>