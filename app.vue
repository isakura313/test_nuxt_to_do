<template>
    <div class="app_wrapper">
        <Header/>
        <NuxtPage/>
    </div>
</template>


<script lang="ts" setup>
import {useTodoStore} from '~/store';
const store = useTodoStore();
store.getTodos()

</script>

<style lang="scss">
.app_wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #1A1A1A;
    min-height: 100vh;
}

</style>
