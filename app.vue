<template>
    <div class="app_wrapper">
        <Header/>
        <CreateButton @click.native="showModal = true"/>
        <ModalCreate :open="showModal"/>
        <div class="todo_list__wrapper">
            <TodoList/>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue'
import CreateButton from "~/components/CreateButton.vue";
import ModalCreate from "~/components/ModalCreate.vue";

const showModal = ref(false)
</script>


<style lang="scss">
.app_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo_list__wrapper {
  background-color: #1A1A1A;
  width: 100%;
}


</style>