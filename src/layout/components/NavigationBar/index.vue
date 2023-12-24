<template>
    <div class="navigation-bar">
      <div class="right-menu">
        <iframe scrolling="no" src="https://tianqiapi.com/api.php?style=yd&skin=pitaya" frameborder="0" width="100%" height="30" allowtransparency="true"></iframe>
        <Screenfull v-if="showScreenfull" class="right-menu-item" />
        <Notity v-if="showNotify" class="right-menu-item" />
        <el-dropdown class="right-menu-item">
          <div class="right-menu-avatar">
            <el-avatar :icon="UserFilled" :size="30" />
            <span>{{  userStore.username }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <a target="_blank" href="https://github.com/Smallwhite411">
                <el-dropdown-item>GitHub</el-dropdown-item>
              </a>
              <el-dropdown-item divided @click="logout">
                <span style="display: block" >退出登录</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </template>

<script setup lang="ts">
import { useAppStore } from '@/store/modules/app'
import { useSettingsStore } from '@/store/modules/setting'
import { useUserStore } from '@/store/modules/user'
import { UserFilled } from "@element-plus/icons-vue"
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Screenfull from '@/components/Screenfull/index.vue'
import Notity from '@/components/Notify/index.vue'

const router = useRouter()
const appStore = useAppStore()
const settingsStore = useSettingsStore()
const userStore = useUserStore()

const sidebar = computed(() => {
  return appStore.sidebar
})
const showNotify = computed(() => {
  return settingsStore.showNotify
})
const showScreenfull = computed(() => {
  return settingsStore.showScreenfull
})

const logout = () => {
  userStore.logout()
  router.push("/login")
}
</script>


<style lang="scss" scoped>
.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}

.navigation-bar {
  height: 50px;
  overflow: hidden;
  background: #fff;

  .hamburger {
    display: flex;
    align-items: center;
    height: 100%;
    float: left;
    padding: 0 15px;
    cursor: pointer;
  }

  .breadcrumb {
    float: left;

    // 参考 Bootstrap 的响应式设计 WIDTH = 576
    @media screen and (max-width: 576px) {
      display: none;
    }
  }

  .right-menu {
    float: right;
    margin-right: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    color: #606266;

    .right-menu-item {
      padding: 0 10px;
      cursor: pointer;

      .right-menu-avatar {
        display: flex;
        align-items: center;

        .el-avatar {
          margin-right: 10px;
        }

        span {
          font-size: 16px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>