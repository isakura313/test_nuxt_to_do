<template>
    <button class="create_button" @mouseover='iconColor = "#808080"' @mouseleave='iconColor = "#F2F2F2"'>
        <span class="create_button__text">Создать</span>
        <div class="create_button__icon">
            <PlusIcon :color="iconColor"/>
        </div>
    </button>
</template>

<script lang="ts" setup>
import {ref} from 'vue';
import PlusIcon from "~/components/icons/PlusIcon.vue";

const iconColor = ref('#F2F2F2')

</script>


<style lang="scss">
.create_button {
  background-color: #1E6F9F;
  font-family: Inter, 'serif';
  font-size: 14px;
  font-weight: 700;
  line-height: 1.6;
  top: 15%;
  padding: 16px;
  width: 54%;
  position: absolute;
  border: none;
  border-radius: 8px;
  color: #F2F2F2;
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
    color: #808080;
  }

}
</style>