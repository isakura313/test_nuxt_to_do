<template>
    <header class="header">
        <nav class="nav">
            <RocketIcon/>
            <h1 class="header__title"> Nu<span class="header__title_blue">xt </span>to<span class="header__title_blue">do</span>
            </h1>
        </nav>
    </header>
</template>
<script setup lang="ts">
import RocketIcon from "~/components/icons/RocketIcon.vue";
</script>

<style lang="scss">
.header {
  background-color: #0D0D0D;
  display: flex;
  justify-content: center;
  padding: 2em;
  width: 100%;
}

.nav {
  display: flex;
  width: 230px;
  justify-content: space-between;
  align-items: center;
}

.header__title {
  color: #4EA8DE;
  font-size: 40px;
  font-family: Inter, serif;
  font-weight: 900;

  &_blue {
    color: #5E60CE;
  }
}
</style>