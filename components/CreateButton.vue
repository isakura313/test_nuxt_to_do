<template>
    <button
            class="create_button"
            :style="{backgroundColor: backgroundColor}"
            @mouseover="iconColor = '#fff'; backgroundColor='#8284FA'"
            @mouseleave="iconColor = '#fff'; backgroundColor='#1e6f9f';"
    >
        <span class="create_button__text">{{ text }}</span>
        <span class="create_button__icon">
      <PlusIcon :color="iconColor"/>
    </span>
    </button>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import PlusIcon from "~/components/icons/PlusIcon.vue";

const iconColor = ref("#F2F2F2");
const backgroundColor = ref('#1e6f9f')
const props = defineProps({
    text: {
        type: String,
    },
});
</script>

<style lang="scss">
.create_button {
  background-color: #1e6f9f;
  font-family: Inter, "serif";
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
  padding: 16px;
  border: none;
  border-radius: 8px;
  color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;

  &__text {
    margin-right: 9.5px;
  }

  &__icon {
    width: 16px;
    height: 16px;
  }

  &:hover {
    cursor: pointer;
    color: #fff;
  }

  &:disabled {
    background-color: grey !important;
  }
}
</style>
