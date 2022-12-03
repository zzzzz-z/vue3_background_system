<template>
  <div class="main-header">
    <div class="icon" @click="handleMenuIconFold">
      <!-- <el-icon v-if="!IsFold"><Expand /></el-icon>
        <el-icon v-else><Fold /></el-icon> -->
      <el-icon>
        <component :is="IsFold ? 'Fold' : 'Expand'"></component>
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">
        <el-breadcrumb separator="/">
          <template v-for="item in breadcrumbs" :key="item.name">
            <el-breadcrumb-item :to="item.path">{{item.name}}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </div>
      <div class="info">
        <div class="iconList">
          <el-icon>
            <Bell />
          </el-icon>
          <el-icon>
            <ChatLineSquare />
          </el-icon>
          <el-icon>
            <ZoomOut />
          </el-icon>
        </div>
        <div class="control">
          <el-dropdown>
            <span class="el-dropdown-link">
              <el-avatar :size="30" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import useLoginStore from '@/stores/login';
import { useRouter,useRoute } from 'vue-router';
import { mapcurrentPathToBreadcrumb } from '@/utils/map-menus';
const emit = defineEmits(['foldChange'])
const IsFold = ref(false)
const handleMenuIconFold = () => {

  IsFold.value = !IsFold.value
  emit('foldChange', IsFold.value)
}

const loginStore = useLoginStore()
const userName = loginStore.name
const useMenu = loginStore.userMenus
const route = useRoute()
const breadcrumbs =  computed(() => {
  return mapcurrentPathToBreadcrumb(route.path, useMenu)
})
</script>

<style lang="less" scoped>
.main-header {
  display: flex;
  align-items: center;
  flex: 1;

  .content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-left: 10px;

    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>