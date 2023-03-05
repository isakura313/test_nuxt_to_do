<template>
    <div class="todo_item">
        <div class="todo_item__wrap">
            <div class="todo_item__icon_wrap">
                <IconCompleted v-if="todo.done"/>
            </div>
            <div class="top_wrap">
                <h5 class="todo_item__title">{{ todo.header }}</h5>
                <div style="display: flex">
                    <div class="todo_item__wrap_dates">
                        <span>{{ filterDate(todo.created_at) }}</span>
                        <span>{{ filterDate(todo.date_expired) }}</span>
                    </div>
                    <div class="todo_item__wrap_icons">
                        <EditIcon class="todo_item__icon_edit"/>
                        <ThrashIcon class="todo_item__icon_edit"/>
                    </div>
                </div>
            </div>

            <p class="todo_item__text">{{ todo.text }}</p>
        </div>
    </div>
</template>


<script lang="ts" setup>
import IconCompleted from './icons/IconСompleted.vue'
import EditIcon from "~/components/icons/EditIcon.vue";
import ThrashIcon from "~/components/icons/ThrashIcon.vue";
import {TodoInterface} from "~/types/todoInterface";
import {zeroDateFix} from "~/helpers/zeroDateFix";

const props = defineProps<{
    todo: TodoInterface
}>()

function filterDate(date: any) {
    const newDate = new Date(date);
    return `${zeroDateFix(newDate.getDate())}:${zeroDateFix(newDate.getMonth())}:${newDate.getFullYear()}`
}
</script>


<style lang="scss">
.top_wrap {
  display: flex;
  justify-content: space-between;

}

.todo_item {

  border: 1px solid #333333;
  margin-bottom: 12px;
  padding: 16px 19px;


  &__wrap {
    display: grid;
    grid-template-columns: 40px 30rem 60px;
    grid-template-rows: 1fr 1fr;
    align-items: center;
  }

  &__icon_wrap {
    border-radius: 50%;
    width: 17.45px;
    height: 17.45px;
    border: 1px solid #4EA8DE;
    grid-row: 1/2;

    &:hover {
      cursor: pointer;
    }
  }

  &__title {
    font-family: 'Inter', 'sans-serif';
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 140%;
    color: #FFFFFF;
  }

  &__text {
    grid-column: 2/4;
  }

  &__wrap_dates {
    display: flex;
    flex-direction: column;
  }

  &__wrap_icons {
    display: flex;
  }
}
</style>