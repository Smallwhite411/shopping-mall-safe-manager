<template>
  <div class="fx-start">
    <span class="quck-filter">快速筛选</span>
    <FilterRowX v-bind="$attrs"></FilterRowX>
    <div class="search-btn">
      <el-button @click="search" type="primary">搜索</el-button>
      <el-button class="reset" @click="reset">重置</el-button>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import FilterRowX from '../FilterRowX/index.vue'
const emit = defineEmits(["search", "reset"]);
const search = () => {
  emit("search");
};
const reset = () => {
  emit("reset");
};
</script>
<style lang="scss" scoped>
.reset,
.reset:hover {
  margin-right: 20px;
  background: #ffffff !important;
  border: 1px solid #d9d9d9;
  color: #595959;
}
</style>
