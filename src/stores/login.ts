import { defineStore } from 'pinia'
import { accountLoginRequst, getUserInfoById, getUserMenuByRoleId } from '@/servece/login/login'
import LocalCache from '@/utils/cache'
import router from '@/router'
import { mapMenusToRoutes } from '@/utils/map-menus'
import useMainStore from './main'


interface IAccount {
  name: string,
  password: string
}
interface IState {
  name: string,
  token: string
  userInfo: any,
  userMenus: any
}
const useLoginStore = defineStore('login', {
  state: (): IState => ({
    name: localStorage.getItem('name') ?? '',
    token: '',
    userInfo: {},
    userMenus: []
  }),
  actions: {
    async fetchLoginAccount(account: IAccount) {
      const loginRes = await accountLoginRequst(account)
      const id = loginRes.data.id;
      this.name = loginRes.data.name;
      this.token = loginRes.data.token;
      LocalCache.setCache('name', this.name)
      LocalCache.setCache('token', this.token)
      //获取登录用户的详细信息
      const userInfoRes = await getUserInfoById(id)
      this.userInfo = userInfoRes.data
      LocalCache.setCache('userInfo', this.userInfo)
      //根据登录用户的角色获取菜单
      this.userInfo = userInfoRes.data
      const userMenuRes = await getUserMenuByRoleId(this.userInfo.role.id)
      this.userMenus = userMenuRes.data
      LocalCache.setCache('userMenus', this.userMenus)

      const mainStore = useMainStore()
      mainStore.fetchFullRoles()
      mainStore.fetchFullDepartment()

      //动态的添加路由
      const routes = mapMenusToRoutes(this.userMenus)
      routes.forEach(route => {
        router.addRoute('main', route)
      });
      //跳转到main页面
      router.push('/main')
    },
    loadingLocalData() {
      const token = localStorage.getItem('token')
      const userInfo = LocalCache.getCache('userInfo')
      const userMenus = LocalCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        const mainStore = useMainStore()
        mainStore.fetchFullRoles()
        mainStore.fetchFullDepartment()

        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus
        const routes = mapMenusToRoutes(this.userMenus)
        routes.forEach(route => {
          router.addRoute('main', route)
        });
      }
    }
  }
})

export default useLoginStore