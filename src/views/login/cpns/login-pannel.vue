<template>
  <div class="pannel">
    <h3 class="title">后台管理系统</h3>
    <el-tabs stretch v-model="currentTab" type="border-card">
      <el-tab-pane name="account">
        <template #label>
          <span class="label">
            <el-icon><User /></el-icon>
            <span class="text">帐号登录</span>
          </span>
        </template>
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>

      <el-tab-pane name="phone">
        <template #label>
          <span class="label">
            <el-icon><Cellphone /></el-icon>
            <span class="text">手机登录</span>
          </span>
        </template>
        <login-phone></login-phone>
      </el-tab-pane>
    </el-tabs>

    <div class="control">
      <el-checkbox v-model="isRemember" label="记住密码" />
      <el-link type="primary">忘记密码</el-link>
    </div>
      <el-button type="primary" class="btn" size="large" @click="clickLogin">登录</el-button>

  </div>
</template>

<script setup lang="ts">
import loginAccount from './login-account.vue';
import loginPhone from './login-phone.vue';
import { ref } from 'vue';
import type { FormInstance } from 'element-plus'
const accountRef = ref<InstanceType<typeof loginAccount>>()
const formRef = ref<FormInstance>()
const isRemember = ref<boolean>(true)
const currentTab = ref('account')

const clickLogin = () => {
  if(currentTab.value === "account") {
    accountRef.value?.loginAction(isRemember.value)
  } else {
    console.log("手机");   
  }
  
}
</script>

<style lang="less" scoped>
.pannel {
  width: 330px;
  .title {
    text-align: center;
    margin-bottom: 8px;
  }
  .label {
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      margin: 0 3px;
    }
  }
  .control {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 8px 0;
  }
  .btn {
    width: 100%;
  }
}
</style>