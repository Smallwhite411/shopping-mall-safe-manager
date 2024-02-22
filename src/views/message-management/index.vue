<template>
  <div class="system-style message-management">
    <HeaderTitle :headTitleInfo="headTitleInfo" />
    <div class="content">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="noResponse">未回复</el-menu-item>
        <el-menu-item index="response">已回复</el-menu-item>
      </el-menu>
      <div>
        <replyEdit />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HeaderTitle from "@/components/HeadTitle/index.vue";
import replyEdit from "./reply-edit.vue";
const headTitleInfo = ref([{ path: null, title: "留言管理" }]);
const activeIndex = ref("noResponse");
const handleSelect = () => {};
</script>

<style lang="scss" scoped>
.message-management {
  .content {
    padding: 0;
    .el-menu {
    .el-menu-item {
      padding: 0 20px;
      font-weight: 600;
      color: #999999;
      font-size: 16px;
    }
    .el-menu-item.is-active {
      color: #0076c8;
    }
  }
  }
}
</style>
