<template>
    <div>
        <TodoItem/>
    </div>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import {useTodoStore} from '~/store'

const store = useTodoStore();
</script>