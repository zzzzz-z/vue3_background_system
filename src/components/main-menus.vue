<template>
  <div class="menus">
    <div class="logo">
      <el-icon class="icon">
        <HomeFilled />
      </el-icon>
      <h3 v-show="!IsFold">后台管理系统</h3>
    </div>

    <div class="menu">
      <el-menu :default-active="defaultActive" :collapse="IsFold">
        <template v-for="(item, index,key) in useMenu" :key="index">
          <el-sub-menu :index="item.id +''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('el-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="(subitem, index,key) in item.children">
            <el-menu-item :index="subitem.id +''" @click="handleItemClick(subitem)">{{ subitem.name }}</el-menu-item>
          </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter,useRoute } from 'vue-router';
import useLoginStore from '@/stores/login';
import { ref } from 'vue';
import { firstMenuPath,mapcurrentPath } from '@/utils/map-menus';
defineProps({
  IsFold: {
    type:Boolean,
    default: false
  }
})
const loginStore = useLoginStore()
const useMenu = loginStore.userMenus

const router = useRouter()
const handleItemClick = (subitem:any) => {
  const path = subitem.url
  router.push(path)
}
//el-menu默认显示菜单选项
// 从登录界面进来或者刷新路径，拿到当前路径去匹配路由
const route = useRoute()
const currentPath = mapcurrentPath(route.path,useMenu)
const defaultActive = ref(currentPath.id + '')


</script>

<style lang="less" scoped>
.menus {
  height: 100%;
  width: 100%;
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 5px;
    margin-bottom: 5px;
    .icon {
      font-size: 20px;
      color: #6196cc;
    }
  }

  :deep(.el-menu) {
    border-right: none;
  }
}
</style>