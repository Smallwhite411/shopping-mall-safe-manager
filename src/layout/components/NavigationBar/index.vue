<template>
  <div class="header">
    <!-- <img :src="logo" alt="" style="width: 332px; margin-top: -25px" /> -->
    <div class="right">
      <Screenfull v-if="showScreenfull" class="right-menu-item" />
      <Notity v-if="showNotify" class="right-menu-item" />
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon class="userFill"><UserFilled /></el-icon>
          <span class="username">{{ userStore.username }}</span></span
        >
        <template #dropdown>
          <el-dropdown-menu>
            <a target="_blank" href="https://github.com/Smallwhite411">
              <el-dropdown-item>GitHub</el-dropdown-item>
            </a>
            <el-dropdown-item divided @click="logout">
              退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from "@/assets/logo.png";
import { useAppStore } from "@/store/modules/app";
import { useSettingsStore } from "@/store/modules/setting";
import { useUserStore } from "@/store/modules/user";
import { UserFilled } from "@element-plus/icons-vue";
import { computed } from "vue";
import { useRouter } from "vue-router";
import Screenfull from "@/components/Screenfull/index.vue";
import Notity from "@/components/Notify/index.vue";

const router = useRouter();
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const userStore = useUserStore();

const sidebar = computed(() => {
  return appStore.sidebar;
});
const showNotify = computed(() => {
  return settingsStore.showNotify;
});
const showScreenfull = computed(() => {
  return settingsStore.showScreenfull;
});

const logout = () => {
  userStore.logout();
  router.push("/login");
};
</script>

<style lang="scss" scoped>
.header {
  height: 100%;
  width: 100%;
  line-height: 47px;
  .right-menu-item {
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .right {
    height: 64px;
    line-height: 64px;
    text-align: right;
    float: right;
    padding-right: 20px;
    margin-top: -20px;
    padding-top: 10px;
    display: flex;
    .bell {
      font-size: 20px;
      vertical-align: middle;
    }
    .el-dropdown {
      margin-left: 24px;
      width: 103px;
      height: 100%;
      line-height: 64px;
      padding-left: 10px;
      padding-right: 10px;
      .username {
        display: inline-block;
        width: 65px;
        text-align: left;
        font-size: 16px;
        font-weight: 600;
        color: #ffffff;
        cursor: pointer;
        vertical-align: middle;
        white-space: nowrap;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .userFill {
        font-size: 18px;
        margin-right: 10px;
        vertical-align: middle;
        width: 24px;
        height: 24px;
        background: #0076c8;
        color: #fff;
        border-radius: 50%;
        border: 2px solid #fff;
      }
    }
    .el-dropdown.is-active {
      background-color: #fff;
      .username {
        color: #0076c8;
      }
      .userFill {
        background-color: #fff;
        border: 2px solid #0076c8;
        color: #0076c8;
      }
    }
  }
}
</style>
