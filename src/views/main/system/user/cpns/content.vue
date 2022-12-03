<template>
  <div class="content">
    <div class="header">
      <h3>用户列表</h3>
      <el-button @click="handleCreateUserClick">新建用户</el-button>
    </div>
    <div class="tables">
      <el-table :data="userList" border style="width: 100%">
        <el-table-column type="selection" width="50"  align="center" />
        <el-table-column type="index" label="序号" width="55" align="center" />
        <el-table-column prop="name" label="用户名" width="120" align="center" />
        <el-table-column prop="realname" label="真实姓名" width="120" align="center" />
        <el-table-column prop="cellphone" label="手机号码" width="120" align="center" />
        <el-table-column prop="enable" label="状态" width="120" align="center" />
        <el-table-column prop="createAt" label="创建时间" align="center" />
        <el-table-column prop="updateAt" label="更新时间" align="center" />
        <el-table-column label="操作" align="center" >
          <template #default="scope">
            <el-button @click="handleEditBtnClick(scope.row)">编辑</el-button>
            <el-button @click="handleDeleteBtnClick(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      small="small"
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 15, 20]"
      :total="totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    </div>

  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/stores/main';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const emit = defineEmits(['CreateUserClick', 'editClick'])

let currentPage = ref(1)
const pageSize = ref(5)
const mainStore = useMainStore()
const {userList, totalCount} = storeToRefs(mainStore)

//1 用于发送网络请求
function featchUserListData(searchFormData:any = {}) {
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const info = { size,offset }
  mainStore.featchUserList({...info, ...searchFormData})
}

//1-1第一次进入页面发送网络请求
featchUserListData()
const handleSizeChange = () => {
  //每页显示个数发生变化
  console.log(pageSize.value);
  featchUserListData()
}
const handleCurrentChange = () => {
  //页码发生变化
  featchUserListData()
  console.log(currentPage.value);
}
//重置
function handleResetClick() {
  currentPage.value = 1
  pageSize.value = 5
  featchUserListData()
}
// 搜索过后current-page 绑定的数据变了，但是页面当前页码并没有变的问题
function handelqueryClick(searchFormData:any = {}) {
  currentPage.value = 1
  featchUserListData(searchFormData)
}
//删除用户
const handleDeleteBtnClick = (id:number) => {
  mainStore.fetchDeleteUserById(id)
}
//新建用户item
const handleCreateUserClick = () => {
  emit('CreateUserClick')
}
//编辑
const handleEditBtnClick = (rowData: any) => {
  emit('editClick',rowData)
  
}
defineExpose({
  handleResetClick,
  handelqueryClick
})
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  padding: 0 20px;
  border-radius: 5px;
  margin: 20px 0;
  padding: 5px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .tables {
    margin: 10px;
  }
  .footer {
    display: flex;
    justify-content: end;
  }

}
</style>