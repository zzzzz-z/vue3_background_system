<template>
  <div class="account">
    <el-form
    label-width="60px"
    :rules="rules"
    :model="accountForm"
    ref="formRef"
  >
    <el-form-item label="账号" prop="name">
      <el-input v-model="accountForm.name" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input show-password v-model="accountForm.password" />
    </el-form-item>
  </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue';
import type { FormRules } from 'element-plus'
import type { FormInstance } from 'element-plus'
import useLoginStore from '@/stores/login';

import LocalCache from '@/utils/cache'

interface IAccount {
  name: string,
  password: string
}
const accountForm = reactive<IAccount>({
  name:LocalCache.getCache('name') ?? '',
  password:LocalCache.getCache('password') ?? '',
})
const rules:FormRules = {
  name:[
    {required: true, pattern:/^[a-z0-9]{6,10}$/, message: '必须是6-10位长度', trigger: 'blur'},
  ],
  password:[
  {required: true, message: 'Please input account password', trigger: 'blur'}
  ]
}

//登录
const formRef = ref<FormInstance>()
const loginStore = useLoginStore()
const loginAction = (isRemember:boolean) => {
  formRef.value?.validate((valid) => {
    if(valid) {
      if(isRemember) {
        LocalCache.setCache('name',accountForm.name)
        LocalCache.setCache('password',accountForm.password)
      }else {
        LocalCache.removeCache('name')
        LocalCache.removeCache('password')
      }
      const name = accountForm.name;
      const password = accountForm.password;
      loginStore.fetchLoginAccount({name,password})
    } else {
      console.log(444444);
      
    }
    
  })
  

  
}
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>

</style>