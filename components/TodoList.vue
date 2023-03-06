<template>
    <div class="todo_list_top_header">
        <div class="todo_list_top_header__wrap">
            <span class="todo_list_top_header__span_blue">
                  Всего задач
            </span>
            <span class="todo_list_top_header__counter">
                {{ store.todos.length }}
            </span>
        </div>

        <div class="todo_list_top_header__wrap">
            <span class="todo_list_top_header__span_purple">
                Выполнено
            </span>
            <span class="todo_list_top_header__counter">
                        {{ store.doneTodos }} из {{ store.todos.length }}
                    </span>
        </div>
    </div>

    <div class="todo_list_wrapper" v-if="store.todos.length">
        <TodoItem v-for="todo in store.todos" :todo="todo" :key="todo.id"/>
    </div>
    <div class="todo_list_empty" v-else-if="store.todos.length === 0 && store.loadingTodo ">
        <Clipboard/>
        <h5 class="todo_list_empty__h5">У Вас еще нет созданных задач</h5>
        <p class="todo_list_empty__p">Создавайте задачи и организуйте свои дела</p>
    </div>
    <Loader v-else/>

</template>

<script lang="ts" setup>
import Clipboard from "~/components/icons/Clipboard.vue";
import Loader from '~/components/Loader.vue'

import {useTodoStore} from '~/store'
import TodoItem from "~/components/TodoItem.vue";

const store = useTodoStore();
</script>

<style lang="scss">
.todo_list_top_header {
  margin-top: 4rem;
  color: white;
  display: flex;
  justify-content: space-between;
  width: 44.5rem;
  margin-bottom: 25px;

  &__wrap {
    display: flex;
    justify-content: space-around;
  }

  &__span_blue {
    font-family: 'Inter', 'sans-serif';
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #4EA8DE;
    margin-right: 16px;
  }

  &__span_purple {
    font-family: 'Inter', 'sans-serif';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    color: #8284FA;
    margin-right: 16px;
  }

  &__counter {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2px 8px;
    font-family: 'Inter', 'sans-serif';
    font-weight: 700;
    font-size: 12px;
    line-height: 15px;
    height: 19px;
    background-color: #333333;
    border-radius: 999px;
  }
}

.todo_list_wrapper {
  color: white;
}

.todo_list_empty {
  margin-top: 5.26rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  &__h5 {
    font-family: 'Inter', 'sans-serif';
    font-weight: 700;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    color: #808080;
  }

  &__p {
    font-family: 'Inter', 'sans-serif';
    font-weight: 500;
    font-size: 16px;
    line-height: 140%;
    text-align: center;
    color: #808080;
  }
}
</style>