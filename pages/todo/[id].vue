<template>
    <div class="todo_item_page" v-if="todo">
        <h3 class="todo_item_page__h3">
            Главная/заголовок </h3>
        <div class="todo_item_page__wrap">
            <h5 class="todo_item_page__h5">{{ todo.header }}</h5>
            <p class="todo_item_page__p">{{ todo.text }}</p>
        </div>
        <div class="todo_item_page__dates_wrap">
            <div class="date_wrap">
                <span>Дата создания:</span>
                <span class="todo_item_page__date">{{ todo.created_at }}</span>
            </div>
            <div class="date_wrap">
                <span>Дата окончания:</span>
                <span class="todo_item_page__date">
                    {{ todo.date_expired }}</span>
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import {TodoInterface} from "~/types/todoInterface";

const route = useRoute();
const {data: todo} = await useFetch<TodoInterface>(`https://64037721302b5d671c502ee9.mockapi.io/api/deals/${route.params.id}`)
if (todo.value !== null) {
    useHead({
        title: todo.value.header,
        meta: [{
            name: 'description',
            content: todo.value.text
        }]
    })
}


</script>

<style lang="scss">
.todo_item_page {
  margin-top: 31px;
  width: 44.5rem;

  &__h3 {
    font-family: 'Inter', 'sans-serif';
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #808080;
    margin-bottom: 8px;
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

  &__date {
    color: #4EA8DE;
  }

  .date_wrap {
    margin-top: 8px;
    color: #808080;
    display: flex;
    justify-content: space-between;
    width: 12em;
  }

}

@media screen and (max-width: 416px) {
  .todo_item_page {
    padding: 8px;
    width: 100%;
  }

}
</style>