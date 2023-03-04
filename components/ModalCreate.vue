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
                    <input v-model="header" type="text" placeholder="Заголовок" class="modal_form__input"/>
                    <input v-model="text" type="text" placeholder="text" class="modal_form__input"/>
                    <input v-model="date" type="date" placeholder="Дата окончания" class="modal_form__input"/>
                    <CreateButton
                            @click.prevent="createTodo"
                            style="width: 100%; background-color:#808080"
                    />
                </form>

                <div></div>
            </div>
        </div>
    </Teleport>

</template>


<script lang="ts" setup>
import {defineEmits} from 'vue'
import CloseIcon from "~/components/icons/CloseIcon.vue";
import CreateButton from "~/components/CreateButton.vue";
import {useTodoStore} from '~/store';

const header = ref('')
const text = ref('')
const date = ref(0)
const header_error = ref(false)
const text_error = ref(false)
const date_error = ref(false)

const store = useTodoStore();
const $emits = defineEmits([
    'closeModal'
])

function createTodo() {
    if (header.value.length < 3) {
        header_error.value = true
        return;
    }
    if (text.value.length < 3) {
        header_error.value = true
        return;
    }
    store.addTodos({
        header: header.value,
        text: text.value,
        date_created: String(new Date().toISOString()),
        date_expired: String(new Date().toISOString()),
        done: false,
    })
    $emits('closeModal');
}

function closeMe() {
    $emits('closeModal')
}

const props = defineProps({
    open: {
        type: Boolean,
        default: false
    }
})
</script>

<style lang="scss">
.modal_wrapper {
  width: 100%;
  height: 100vh;
  position: absolute;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;


}

.modal {
  width: 28rem;
  margin: 16rem auto 0 auto;
  background-color: #333333;
  padding: 20px;

  &__header_wrap {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  &__h3 {
    font-family: Inter, 'sans-serif';
    font-weight: 700;
    color: white;
    font-size: 20px;
  }

  &__close {
    width: 23px;
    height: 23px;
    background: #E25858;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;

    &:hover {
      cursor: pointer;
      background: darken(#E25858, 30%);
    }
  }

  &_form {
    display: flex;
    flex-direction: column;

    &__input {
      margin-bottom: 10px;
      padding: 9px 16px;
      outline: none;
      font-family: 'Inter', 'sans-serif';
      font-weight: 400;
      background: #262626;
      border: none;
      color: white;

      &::placeholder {
        font-family: 'Inter', 'sans-serif';
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
      }
    }
  }

}
</style>