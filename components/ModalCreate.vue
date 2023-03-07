<template>
    <Teleport to="body">
        <div class="modal_wrapper" v-show="open">
            <div class="modal">
                <div class="modal__header_wrap">
                    <h3 class="modal__h3">Создать задачу</h3>
                    <button class="modal__close" @click="closeMe">
                        <CloseIcon/>
                    </button>
                </div>
                <form class="modal_form">
                    <div class="modal_form__input_wrap">
                        <input
                                v-model="header"
                                type="text"
                                placeholder="Заголовок"
                                class="modal_form__input"
                                @blur="checkHeader"
                        />
                        <div class="modal_form__error_valid">{{ error_message_header }}</div>
                    </div>
                    <div class="modal_form__input_wrap">
                        <input
                                v-model="text"
                                type="text"
                                placeholder="text"
                                class="modal_form__input"
                                @blur="checkText"
                        />
                        <div class="modal_form__error_valid">{{ error_message_text }}</div>
                    </div>
                    <div class="modal_form__input_wrap">
                        <input
                                v-maska:[options]
                                v-model="date_expired"
                                type="text"
                                placeholder="Дата окончания"
                                class="modal_form__input"
                        />
                        <div class="modal_form__error_valid">{{ error_message_date }}</div>
                    </div>

                    <CreateButton
                            @click.prevent="createTodo"
                            :text="editableMode ? 'сохранить' : 'создать'"
                            style="width: 100%; background-color: #808080"
                    />
                </form>
            </div>
        </div>
    </Teleport>
</template>

<script lang="ts" setup>
import {defineEmits, watch} from "vue";
import {vMaska} from "maska"
import CloseIcon from "~/components/icons/CloseIcon.vue";
import CreateButton from "~/components/CreateButton.vue";
import {useTodoStore} from "~/store";
import {TodoInterface} from "~~/types/todoInterface";
import is from "@sindresorhus/is";
import date = is.date;

const header = ref("");
const text = ref("");
let date_expired = ref(0);
const error_message_header = ref('')
const error_message_text = ref('')
const error_message_date = ref('')
const header_error = ref(false);
const text_error = ref(false);
const date_error = ref(false);

const store = useTodoStore();
const $emits = defineEmits(["closeModal"]);

function checkHeader() {
    if (header.value.length < 4) {
        header_error.value = true
        error_message_header.value = 'Это поле обязательно'
        return;
    }
    header_error.value = false
    error_message_header.value = ''
}

const options = reactive({
    mask: "##.##.####",
    eager: true
})
watch(date_expired, () => {
    const arr = date_expired.value.split('.');
    if (arr[0] > 31) {
        arr[0] = 31
    }
    if (arr[1] > 12) {
        arr[1] = 12
    }
    if (arr[2] > Number(new Date().getFullYear())) {
        arr[2] = new Date().getFullYear()
    }
    date_expired.value = arr.join('.')
})

// date_expired.value = e.target.value
// console.log(/^\d+$/.test(e.target.value));
// if (/^\d+$/.test(e.target.value)) {
//     const arr = e.target.value.split(".")
//     if (arr[0] > 31) {
//         arr[0] = 31
//     }
//     if (arr[1] > 13) {
//         arr[1] = 12
//     }
//     if (arr[2] > Number(new Date().getFullYear())) {
//         arr[2] = Number(new Date().getFullYear())
//     }
//     date_expired.value = arr.join('.')
// }
// }


function checkText() {
    if (text.value.length < 4) {
        text_error.value = true
        error_message_text.value = 'Это поле обязательно'
        return
    }
    header_error.value = false
    error_message_header.value = ''
}

function createTodo() {
    if (header.value.length < 3) {
        header_error.value = true;
        return;
    }
    if (text.value.length < 3) {
        header_error.value = true;
        return;
    }
    if (props.editableMode) {
        store.editTodo({
            id: props.todoId,
            header: header.value,
            text: text.value,
            date_expired: String(new Date().toISOString()),
        });
        header.value = ''
        text.value = ''
        $emits("closeModal");
        return;
    }
    store.addTodos({
        header: header.value,
        text: text.value,
        created_at: String(new Date().toISOString()),
        date_expired: String(new Date().toISOString()),
        done: false,
    });
    $emits("closeModal");
}

function closeMe() {
    $emits("closeModal");
}

const props = defineProps({
    open: {
        type: Boolean,
        default: false,
    },
    editableMode: {
        type: Boolean,
    },
    todoId: {
        type: String,
    },
});
if (props.editableMode && store.todos.length) {
    console.log(props.todoId);
    console.log(store.todos);
    const todo: TodoInterface = store.todos.filter((item) => item.id == props.todoId)[0];
    if (todo) {
        header.value = todo.header;
        text.value = todo.text;
        date_expired.value = todo.date_expired;
    }
}
</script>

<style lang="scss">
.modal_wrapper {
  width: 100%;
  height: 100vh;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  top: 0;
}

.modal {
  width: 28rem;
  margin: 16rem auto 0 auto;
  background-color: #333333;
  padding: 20px;

  &_form__error_valid {
    font-family: 'Inter', 'sans-serif';
    font-weight: 400;
    font-size: 10px;
    line-height: 140%;
    color: #E25858;
    height: 6px;
  }

  &__header_wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__h3 {
    font-family: Inter, "sans-serif";
    font-weight: 700;
    color: white;
    font-size: 20px;
  }

  &__close {
    width: 23px;
    height: 23px;
    background: #e25858;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;

    &:hover {
      cursor: pointer;
      background: darken(#e25858, 30%);
    }
  }

  &_form {
    display: flex;
    flex-direction: column;

    &__input_wrap {
      padding-bottom: 20px;
    }

    &__input {
      margin-bottom: 2px;
      padding: 9px 16px;
      outline: none;
      font-family: "Inter", "sans-serif";
      font-weight: 400;
      background: #262626;
      border: none;
      color: white;
      width: 100%;

      &::placeholder {
        font-family: "Inter", "sans-serif";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
      }
    }
  }
}
</style>
