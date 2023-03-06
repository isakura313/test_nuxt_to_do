<template>
    <div class="todo_item_page" v-if="todo_item">
        <h3 class="todo_item_page__h3">
            Главная/заголовок </h3>
        <div class="todo_item_page__wrap">
            <h5 class="todo_item_page__h5">{{ todo_item.header }}</h5>
            <p class="todo_item_page__p">{{ todo_item.text }}</p>
        </div>
        <div class="todo_item_page__dates_wrap">
            <div class="date_wrap">
                <span>Дата создания</span>
                <span class="todo_item_page__date">{{ filterDate(todo_item.created_at) }}</span>
            </div>
            <div class="date_wrap">
                <span>Дата окончания</span> <span class="todo_item_page__date">{{
                filterDate(todo_item.date_expired)
                }}</span>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import {useTodoStore} from '~/store'
import {TodoInterface} from "~/types/todoInterface";
import {ref, computed} from 'vue';
import filterDate from "~/helpers/formatDate";


const route = useRoute();
const store = useTodoStore()
store.getTodos()

const todo_item = computed<TodoInterface>((): TodoInterface => {
    return store.todos.filter((item) => item.id === route.params.id)[0]
})

</script>

<style lang="scss">
.todo_item_page {
  margin-top: 31px;
  width: 44.5rem;

  &__h3 {
    font-family: 'Inter';
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #808080;
  }

  &__wrap {
    border-radius: 10px;
    background: #262626;
    padding: 10px;
  }

  &__h5 {
    font-family: 'Inter', 'sans-serif';
    font-weight: 700;
    font-size: 20px;
    line-height: 140%;
    color: #FFFFFF;
  }

  &__p {
    font-family: 'Inter', 'sans-serif';
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;
    color: #F2F2F2;
  }


}
</style>