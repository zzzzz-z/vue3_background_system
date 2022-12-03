<template>
    <div class="user">
      <div class="search">
       <search @query-click="handelQueryClick" @reset-click="handleResetClick"></search>
      </div>
      <div class="content">
        <content ref="contentRef" @create-user-click="handelCreateUser" @edit-click="handelEdit"></content>
      </div>
      <modal ref="modalRef"></modal>
    </div>
</template>

<script setup lang="ts">
import Search from "./cpns/search.vue";
import Content from "./cpns/content.vue";
import Modal from "./cpns/modal.vue";
import { ref } from "vue";
const contentRef = ref<InstanceType<typeof Content >>()
const modalRef = ref<InstanceType<typeof Modal >>()
const a:number = 1
const handelQueryClick = (searchFormData: any) => {
  contentRef.value?.handelqueryClick(searchFormData)
}
const handleResetClick = () => {
  contentRef.value?.handleResetClick()
}

const handelCreateUser = () => {
  modalRef.value?.exposeFn()
}

const handelEdit = (rowData: any) => {
  modalRef.value?.exposeFn(false,rowData)
}
</script>

<style lang="less" scoped>

</style>