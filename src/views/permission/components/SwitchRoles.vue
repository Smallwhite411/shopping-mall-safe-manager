<script setup lang="ts">
import { effect, ref, watch } from "vue"
import { useUserStore } from "../../../store/modules/user"


const userStore = useUserStore()
const switchRoles = ref(userStore.roles[0])
watch(switchRoles, async (value) => {
  await userStore.changeRoles(value)
  // 既然只需要调用一下父组件传过来的change事件，不需要将子组件的数据传递给父组件的话，我觉得就没必要使用emit了，直接使用props会更好一点
  console.log("dashjvfajshvj",value)
})

effect(() => {
  console.log("switchRoles",switchRoles)
})
</script>

<template>
  <div>
    <div>你的权限：{{ userStore.roles }}</div>
    <div class="switch-roles">
      <span>切换权限：</span>
      <el-radio-group v-model="switchRoles">
        <el-radio-button label="user" />
        <el-radio-button label="administrator" />
      </el-radio-group>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.switch-roles {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
</style>
