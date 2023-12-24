<script lang="ts" setup>
import { ref, watch } from "vue"
import { useUserStore } from "@/store/modules/user"
import AdminDashboard from "./administrator/index.vue"
import UserDashboard from "./user/index.vue"
import RootDashboard from './root/index.vue'

type CurrentRoleType = "root" | "administrator" | "user"
// 定义 CurrentRoleType 的类型只能是 admin和editor 这两种

const userStore = useUserStore()

const currentRole = ref<CurrentRoleType>("user")
// 默认值就是 admin
// 通过判断 getInfo 中拿到的用户信息修改用户的身份
// 也就是说 哪怕getInfo传过来的用户的 roles 是一个空数组，那么DEFAULT_ROLE 最终的身份也是 editor
if (!userStore.roles.includes("root") && !userStore.roles.includes("administrator")) {
  currentRole.value = "user"
}

</script>
  <!-- 使用了component 动态组件 -->
<template>
  <component :is="userStore.roles[0] === 'user' ? UserDashboard : (userStore.roles[0] === 'administrator' ? AdminDashboard : RootDashboard)" />
</template>
