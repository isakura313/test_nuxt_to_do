<template>
    <Teleport to="body">
        <div class="modal_wrapper" v-show="open">
            <div class="modal">
                <button class="modal__close">
                    <CloseIcon/>
                </button>
                <h3 class="modal__h3">Создать задачу</h3>
                <form class="modal__form">
                    <input type="text" placeholder="заголовок"/>
                    <input type="text" placeholder="text"/>
                    <input type="date" placeholder="Дата окончания"/>
<!--                    <CreateButton/>-->
                </form>

                <div></div>
            </div>
        </div>
    </Teleport>

</template>


<script lang="ts" setup>
import CloseIcon from "~/components/icons/CloseIcon.vue";

const props = defineProps({
    open: {
        type: Boolean,
        default: false
    }
})
</script>

<style>
.modal_wrapper {
    width: 100%;
    height: 100vh;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1;
}

.modal {

}
</style>