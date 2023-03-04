<template>
    <div class="app_wrapper">
        <Header/>
        <ModalCreate :open="showModal" @closeModal="showModal=false"/>
        <div class="todo_list__wrapper">
            <CreateButton @click.native="showModal = true"

                          style="width: 56%;
                        margin-top: -1.78%;"/>
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
  min-height: 90vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}


</style>