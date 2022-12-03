<template>
  <div class="search">
    <el-form ref="formRef" :model="searchForm" label-width="80px" class="form" size="large">
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="searchForm.name" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="真实姓名" prop="realname">
            <el-input v-model="searchForm.realname" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="手机号码" prop="cellphone">
            <el-input v-model="searchForm.cellphone" type="text" autocomplete="off" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select v-model="searchForm.enable" placeholder="请选择帐号的状态" style="width: 100%">
              <el-option label="启用" :value="1" />
              <el-option label="禁用" :value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker v-model="searchForm.createAt" type="daterange" range-separator="-" start-placeholder="开始时间"
              end-placeholder="结束时间" />
          </el-form-item>
        </el-col>

      </el-row>
    </el-form>
    <div class="btn">
      <el-button round @click="handlereset">重置</el-button>
      <el-button round @click="handelquery">查询</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { ElForm,  } from 'element-plus'
const emit = defineEmits(['queryClick', 'resetClick'])
const formRef = ref<InstanceType<typeof ElForm>>()

const searchForm = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: '',
  createAt:''
})
const handlereset = () => {
  formRef.value?.resetFields()
  emit('resetClick')
}
const handelquery = () => {
  console.log(searchForm);
  emit('queryClick',searchForm)
  
}


</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 0 20px;
  border-radius: 5px;

  .form {
    .el-form-item {
      padding: 20px;
      margin-bottom: 0px;
    }
  }
  .btn {
    display: flex;
    justify-content: end;
    padding-bottom: 5px;
    
  }


}
</style>