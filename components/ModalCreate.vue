<template>

    <Teleport to="body">
        <transition-scale>
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
                                    placeholder="Текст"
                                    class="modal_form__input"
                                    @blur="checkText"
                            />
                            <div class="modal_form__error_valid">{{ error_message_text }}</div>
                        </div>
                        <div class="modal_form__input_wrap">
                            <div class="modal_form__date_wrap">
                                <input
                                        v-maska:[options]
                                        v-model="date_expired"
                                        type="text"
                                        placeholder="Дата окончания"
                                        class="modal_form__input"
                                />
                                <CalendarIcon class="modal_form__calendar_icon" @click="toggleCalendar"/>
                            </div>
                            <div class="modal_form__error_valid">{{ error_message_date }}</div>
                        </div>
                        <CreateButton
                                @click.prevent="createTodo"
                                :text="editableMode ? 'сохранить' : 'создать'"
                                style="width: 100%;"
                                :disabled="button_disabled"
                        />
                        <VueDatePicker dark @update:model-value="setDate" vertical inline
                                       v-show="show_calendar"
                                       class="modal_form__dropdown_calendar"
                        />

                    </form>
                </div>
            </div>
        </transition-scale>

    </Teleport>
</template>

<script lang="ts" setup>
import {defineEmits, watch} from "vue";
import {zeroDateFix} from "~/helpers/zeroDateFix";
import {vMaska} from "maska"
import type {Ref} from 'vue'
import CloseIcon from "~/components/icons/CloseIcon.vue";
import CreateButton from "~/components/CreateButton.vue";
import {useTodoStore} from "~/store";
import {TodoInterface} from "~~/types/todoInterface";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import CalendarIcon from "~/components/icons/CalendarIcon.vue";
import {TransitionScale} from '@morev/vue-transitions';


const header = ref("");
const show_calendar = ref(false);

const text = ref("");
let date_expired: Ref<string> = ref(``);

const error_message_header = ref('')
const error_message_text = ref('')
const error_message_date = ref('')
const header_error = ref(false);
const text_error = ref(false);
const date_error = ref(false);

const store = useTodoStore();
const $emits = defineEmits(["closeModal"]);

function toggleCalendar() {
    show_calendar.value = !show_calendar.value;
}

const button_disabled = computed(() => {
    return !(header.value.length > 2 && text.value.length > 3 && date_expired.value.length > 9)
})

const setDate = (value: any) => {
    console.log(value)
    const new_date = new Date(value);
    date_expired.value = `${zeroDateFix(new Date(new_date).getDate())}.${zeroDateFix(new Date(new_date).getMonth() + 1)}
.${new Date(new_date).getFullYear()}`
    show_calendar.value = !show_calendar.value;
}

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
    console.log(date_expired);
    const arr = date_expired.value.split('.');
    if (Number(arr[0]) > 31) {
        arr[0] = '31'
    }
    if (Number(arr[1]) > 12) {
        arr[1] = '12'
    }
    date_expired.value = arr.join('.')
})


function checkText() {
    if (text.value.length < 4) {
        text_error.value = true
        error_message_text.value = 'Это поле обязательно'
        return
    }
    text_error.value = false
    error_message_text.value = ''
}

function createTodo() {
    if (header.value.length < 1) {
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
            date_expired: date_expired.value,
        });
        header.value = ''
        text.value = ''
        date_expired.value = ''
        $emits("closeModal");
        return;
    }
    store.addTodos({
        header: header.value,
        text: text.value,
        created_at: `${zeroDateFix(new Date().getDate())}.${zeroDateFix(new Date().getMonth() + 1)}.${new Date().getFullYear()}`,
        date_expired: date_expired.value,
        done: false,
    });
    header.value = ''
    text.value = ''
    date_expired.value = ''
    header_error.value = false;
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
.dp__theme_dark {
  --dp-background-color: #1E1E1E;
  --dp-border-radius: 5px;
}

.dp__cell_inner {
  border-radius: 50% !important
}

.dp__active_date {
  background-color: #8284FA;
}

.dp__button {
  display: none;
}

.dp__selection_preview {
  display: none;
}

.dp__action_buttons {
  width: 100%;
}

.dp__select {
  color: #8284FA;
}

.modal_wrapper {
  width: 100%;
  min-height: 100vh;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  top: 0;
}

.modal {
  max-width: 28rem;
  margin: 14rem auto 0 auto;
  background-color: #333333;
  padding: 20px;
  height: 100%;
  border: 1px solid #262626;
  border-radius: 10px;

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
    position: relative;

    &__dropdown_calendar {
      position: absolute;
      top: 50%;
      left: 100%;
    }

    &__calendar_icon {
      margin-right: 10px;

      &:hover {
        cursor: pointer;
      }
    }

    &__date_wrap {
      width: 100%;
      display: flex;
      background-color: #262626;
      justify-content: space-between;
      align-items: center;
    }

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


@media screen and (max-width: 416px) {
  .modal {
    width: 85%;

    &_form {
      &__dropdown_calendar {
        position: absolute;
        top: 68%;
        left: 10%;
      }
    }
  }
}
</style>
