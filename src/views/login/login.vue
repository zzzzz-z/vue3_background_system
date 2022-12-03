<template>
    <div class="login">
      <login-pannel></login-pannel>
    </div>
</template>

<script setup lang="ts">
import loginPannel from './cpns/login-pannel.vue';
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
</style>