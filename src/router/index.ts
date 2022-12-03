
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import LocalCache from '@/utils/cache'
import { firstMenuPath } from '@/utils/map-menus'

export const localRouter: RouteRecordRaw[] = [
  {
    path: '/main/analysis/dashboard',
    name: 'dashboard',
    component: () => import('@/views/main/analysis/dashboard/dashboard.vue'),
  },
  {
    path: '/main/analysis/overview',
    name: 'overview',
    component: () => import('@/views/main/analysis/overview/overview.vue'),
  },

  {
    path: '/main/system/department',
    name: 'department',
    component: () => import('@/views/main/system/department/department.vue'),
  },
  {
    path: '/main/system/user',
    name: 'user',
    component: () => import('@/views/main/system/user/user.vue'),
  },
  {
    path: '/main/system/menu',
    name: 'menu',
    component: () => import('@/views/main/system/menu/menu.vue'),
  },
  {
    path: '/main/system/role',
    name: 'role',
    component: () => import('@/views/main/system/role/role.vue'),
  },


  {
    path: 'main/product/category',
    name: 'category',
    component: () => import('@/views/main/product/category/category.vue'),
  },
  {
    path: '/main/product/goods',
    name: 'goods',
    component: () => import('@/views/main/product/goods/goods.vue'),
  },

  {
    path: '/main/story/chat',
    name: 'chat',
    component: () => import('@/views/main/story/chat/chat.vue'),
  },
  {
    path: '/main/story/list',
    name: 'list',
    component: () => import('@/views/main/story/list/list.vue'),
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path:'/',
      redirect:'/main'
    },
    {
      path:'/login',
      component: () => import('@/views/login/login.vue')
    },
    {
      path:'/main',
      name:'main',
      component: () => import('@/views/main/main.vue'),
    },
    {
      path:'/:pathMatch(.*)',
      component: () => import('@/views/not-found/not-found.vue')
    }
  ]
})

//动态添加路由
// router.addRoute('main',localRouter[3])

//用户进行刷新：判断用户是否登录以及是否包含所需的菜单


//导航守卫
router.beforeEach((to,from) => {
  const token = LocalCache.getCache('token')

  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  if (to.path === '/main' && token) {
    return firstMenuPath.url
  }
 
})
export default router
