<template>
  <div class="main">
    <el-container class="container">
      <el-aside :width="IsFold ? '60px':'250px'" class="aside">
        <main-menus :IsFold="IsFold"></main-menus>
      </el-aside>
      <el-container>
        <el-header class="header">
          <main-header @fold-change="handelFoldChange"></main-header>
        </el-header>
        <el-main>
          <RouterView></RouterView>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import MainMenus from '@/components/main-menus.vue';
import MainHeader from '@/components/main-header.vue';
const IsFold = ref(false)
const handelFoldChange = (fold:boolean) => {
  IsFold.value = fold
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  .container {
    height: 100%;
    :deep(.el-aside) {
      overflow: hidden;
    }
    .el-main {
      background-color: #f9f9f9;
    }
    .aside {
      box-sizing: border-box;
      border-right: 1px solid #dcdef6;
    }

    .header {
      display: flex;
      align-items: center;

    }
  }
}
</style>