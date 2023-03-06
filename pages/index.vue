<template>

    <ModalCreate :open="showModal" @closeModal="showModal=false"/>
    <div class="todo_list__wrapper">
        <CreateButton @click.native="showModal = true"
                      text="Создать"
                      style="width: 56%;
                        margin-top: -1.78%;"/>
        <TodoList/>
    </div>
</template>


<script setup lang="ts">
import {ref} from 'vue'
import CreateButton from "~/components/CreateButton.vue";
import ModalCreate from "~/components/ModalCreate.vue";

const showModal = ref(false)
</script>


<style lang="scss">

.todo_list__wrapper {
  //min-height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}


</style>