<template>
    <div class="todo_item">
        <div class="todo_item__wrap">
            <div
                    :class="{ todo_item__icon_wrap: true, todo_icon_selected: todo.done }"
                    @click="madeDone"
            >
                <IconCompleted v-if="todo.done"/>
            </div>
            <div class="top_wrap">
                <NuxtLink :to="'todo/'+todo.id" style="text-decoration: none">
                    <h5 :class="{ todo_item__title: true, strike_text: todo.done }">
                        {{ todo.header }}
                    </h5>
                </NuxtLink>
                <div style="display: flex">
                    <div class="todo_item__wrap_dates">
                        <div class="todo_item__dates_wrap">
                            <span>Дата создания:</span>
                            <span class="todo_item__date"> {{ filterDate(todo.created_at) }}</span>
                        </div>
                        <div class="todo_item__dates_wrap">
                            <span>Дата окончания: </span>
                            <span class="todo_item__date"> {{ filterDate(todo.date_expired) }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="todo_item__wrap_icons">
                <EditIcon class="todo_item__icon_edit" @click="editTodo"/>
                <ThrashIcon class="todo_item__icon_edit" @click="deleteTodo"/>
            </div>
            <p :class="{ todo_item__text: true, strike_text: todo.done }">{{ todo.text }}</p>
        </div>

    </div>
    <ModalCreate
            :editableMode="true"
            :todoId="todo.id"
            :open="openModal"
            @closeModal="closeModal"
    />
</template>

<script lang="ts" setup>
import IconCompleted from "./icons/IconСompleted.vue";
import EditIcon from "~/components/icons/EditIcon.vue";
import ThrashIcon from "~/components/icons/ThrashIcon.vue";
import ModalCreate from "./ModalCreate.vue";
import {TodoInterface} from "~/types/todoInterface";
import {useTodoStore} from "~/store";
import filterDate from "~/helpers/formatDate";

const activeIconClass = ref("todo_icon_unselected");
const openModal = ref(false);
const store = useTodoStore();
const props = defineProps<{
    todo: TodoInterface;
}>();

function closeModal() {
    openModal.value = false;
}

function madeDone() {
    store.toggleDone(props.todo);
    activeIconClass.value === "todo_icon_selected"
        ? (activeIconClass.value = "todo_icon_unselected")
        : (activeIconClass.value = "todo_icon_selected");
}

function editTodo() {
    openModal.value = true;
}

function deleteTodo() {
    if (props.todo.id) {
        store.deleteTodos(props.todo.id);
    }
}
</script>

<style lang="scss">
.top_wrap {
  display: flex;
  justify-content: space-between;
}

.strike_text {
  text-decoration: line-through;
}

.todo_item {
  border: 1px solid #333333;
  margin-bottom: 12px;
  padding: 16px 19px;

  &__wrap {
    display: grid;
    grid-template-columns: 40px 35rem;
    grid-template-rows: 1fr 1fr;
    align-items: center;
  }

  &__icon_wrap {
    border-radius: 50%;
    width: 17.45px;
    height: 17.45px;
    grid-row: 1/2;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #4ea8de;

    &:hover {
      cursor: pointer;
    }
  }

  .todo_icon_selected {
    background: #5e60ce;
    border: 1px solid #5e60ce;
  }

  &__title {
    font-family: "Inter", "sans-serif";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 140%;
    color: #ffffff;
  }

  &__text {
    grid-column: 2/4;
  }

  &__wrap_dates {
    display: flex;
    flex-direction: column;
    color: #808080;
  }

  &__dates_wrap {
    display: flex;
    justify-content: space-between;
    line-height: 20px;
  }

  &__date {
    color: #4ea8de;
  }

  &__wrap_icons {
    display: flex;
    justify-content: space-evenly;
    width: 77px;
  }

  &__icon_edit {
    &:hover {
      cursor: pointer;
    }
  }
}
</style>
