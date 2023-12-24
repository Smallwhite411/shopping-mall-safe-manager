<script lang="ts" setup>
import { ref } from "vue"
import SwitchRoles from "../components/SwitchRoles.vue"

/** key 是为了能每次切换权限的时候重新初始化指令 */
const key = ref(1)
const handleRolesChange = () => {
  key.value++
}
</script>

<template>
  <div class="app-container">
    <SwitchRoles @change="handleRolesChange" />
    <div :key="key" class="margin-top">
      <div>
        <span v-permission="['administrator']" class="permission-alert">
          只有
          <el-tag>administrator</el-tag>可以看见这个
        </span>
        <el-tag v-permission="['administrator']" class="permission-code" type="info" size="large">
          v-permission="['administrator']"
        </el-tag>
      </div>
      <div>
        <span v-permission="['user']" class="permission-alert">
          只有
          <el-tag>user</el-tag>可以看见这个
        </span>
        <el-tag v-permission="['user']" class="permission-code" type="info" size="large">
          v-permission="['user']"
        </el-tag>
      </div>
      <div>
        <span v-permission="['administrator', 'user']" class="permission-alert">
          两者
          <el-tag>administrator</el-tag>和 <el-tag>user</el-tag>都可以看见这个
        </span>
        <el-tag v-permission="['administrator', 'user']" class="permission-code" type="info" size="large">
          v-permission="['administrator', 'user']"
        </el-tag>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.permission-alert {
  width: 320px;
  margin-top: 15px;
  background-color: #f0f9eb;
  color: #67c23a;
  padding: 8px 16px;
  border-radius: 4px;
  display: inline-block;
}

.permission-code {
  margin-left: 15px;
}

.margin-top {
  margin-top: 30px;
}
</style>
