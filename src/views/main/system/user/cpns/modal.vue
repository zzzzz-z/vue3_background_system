<template>
  <div class="modal">
    <el-dialog v-model="dialogVisible" :title="isNewControl? '新建用户' : '编辑用户'" width="30%" center>
      <div class="from">
        <el-form ref="formRef" :model="ModalForm" label-width="80px" class="form" size="large">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="ModalForm.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="ModalForm.realname" placeholder="请输入真实姓名" />
          </el-form-item>
          <el-form-item label="电话号码" prop="cellphone">
            <el-input v-model="ModalForm.cellphone" placeholder="请输入电话号码" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ModalForm.password" show-password placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="选择角色" prop="roleId">
            <el-select v-model="ModalForm.roleId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in rolesList" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="选择部门" prop="departmentId">
            <el-select v-model="ModalForm.departmentId" placeholder="请选择角色" style="width: 100%">
              <template v-for="item in departmentList" :key="item.id">
                <el-option :label="item.name" :value="item.id" />
              </template>
          </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handelConfirmClick">
            新建
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/stores/main';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';

const dialogVisible = ref(false)
const isNewControl = ref(true)
const editRowData = ref()
const ModalForm = reactive<any>({
  name:'',
  realname:'',
  cellphone:'',
  password:'',
  roleId:'',
  departmentId:''
})
const mainStore = useMainStore()
const {rolesList,departmentList} = storeToRefs(mainStore)

const exposeFn = (isNew:boolean = true, rowData?: any) => {
  dialogVisible.value = true
  isNewControl.value = isNew
  //编辑
  if (!isNew && rowData) {
    for (const key in ModalForm) {
      ModalForm[key] = rowData[key]
    }
    editRowData.value = rowData
  } else {
    for (const key in ModalForm) {
      ModalForm[key] = ''
    }
    editRowData.value = null
  }
}

//确定按钮
const handelConfirmClick = () => {
  dialogVisible.value = false
  if(!isNewControl.value && editRowData.value) {
    mainStore.fetchEditUserData(editRowData.value.id,ModalForm)
  } else {
    mainStore.fetchCreateUser(ModalForm)
  }
}

defineExpose({ exposeFn })
</script>

<style lang="less" scoped>

</style>