import { localRouter } from '@/router'
import router from '@/router'
import type { RouteRecordRaw } from 'vue-router';

export let firstMenuPath:any = null
export function mapMenusToRoutes(userMenus: any[]) {
  //根据菜单去匹配需要加载的路由
  const routes: RouteRecordRaw[] = []
  console.log(localRouter);
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRouter.find(item => item.path === submenu.url)
      if (route) routes.push(route)
      if ( !firstMenuPath && route) firstMenuPath = submenu
      // console.log(firstMenuPath);
      
    }

  }
  return routes
}

export function mapcurrentPath(currentPath:string,userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === currentPath) {
        return submenu
      }
    }
  }
}

//面包屑
export function mapcurrentPathToBreadcrumb(currentPath:string,userMenus: any[]){
 const breadcrumb:any[] = []
 for (const menu of userMenus) {
  for (const submenu of menu.children) {
    if (submenu.url === currentPath) {
      breadcrumb.push({ name: menu.name, path: menu.url})
      breadcrumb.push({ name: submenu.name, path: submenu.url})
    }
  }
}
 return breadcrumb
}