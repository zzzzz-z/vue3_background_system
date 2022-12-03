import { getUserList,deleteUserById,getFullRoles,getFullDepartment,createUser,editUserData } from '@/servece/main/main'
import { defineStore } from 'pinia'
 
interface IMainState {
  userList: any[],
  totalCount: number,
  rolesList: any[],
  departmentList: any[]
}

const useMainStore = defineStore('main', {
  state: ():IMainState => ({
    userList: [],
    totalCount: 0,
    rolesList:[],
    departmentList:[]
  }),
  actions: {
    async featchUserList(queryInfo:any) {
      const res = await getUserList(queryInfo)
      const { totalCount, list } = res.data
      this.userList = list
      this.totalCount = totalCount  
    },
    async fetchDeleteUserById(id: number) {
      const deleteRes = await deleteUserById(id)
      this.featchUserList({size:5,offset:0})
      
    },

    async fetchFullRoles() {
      const rolesRes = await getFullRoles()
      this.rolesList = rolesRes.data.list
    },
    async fetchFullDepartment() {
      const departmentRes = await getFullDepartment()
      this.departmentList = departmentRes.data.list
    },
    async fetchCreateUser(userInfo: any) {
      const newResult = await createUser(userInfo)
      console.log(newResult);
      
      this.featchUserList({size:5,offset:0})
    },
    async fetchEditUserData(id:number,userInfo: any) {
      const editResult = await editUserData(id, userInfo)
      this.featchUserList({size:5,offset:0})
      
    }
  }
})

export default useMainStore