<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAppStore } from "@/store/modules/app";
import { usePermissionStore } from "@/store/modules/permission";
import { useSettingsStore } from "@/store/modules/setting";
import SidebarItem from "./SidebarItem.vue";
import SidebarLogo from "./SidebarLogo.vue";

const route = useRoute();
const appStore = useAppStore();
const permissionStore = usePermissionStore();
const settingsStore = useSettingsStore();

const { showSidebarLogo } = storeToRefs(settingsStore); //解构

//当前激活的菜单项是通过检查当前路由的 meta 属性获得的，如果不存在，则使用路由路径。侧边栏的折叠状态通过检查 appStore 中的 sidebar 对象的 opened 属性来确定。
const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta?.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});
// 这里的permissionStore.routes 获取到了路由数据，根据路由的children 来创建多级路由

//使用计算属性来确定当前激活的菜单项以及侧边栏是否处于折叠状态
const isCollapse = computed(() => {
  // opened 是打开 === ！collapse 不折叠
  return !appStore.sidebar.opened;
});
</script>

<template>
  <div class="aside">
    <!-- 侧边栏的logo 大小logo切换 -->
    <!-- <SidebarLogo v-if="showSidebarLogo" :collapse="isCollapse" /> -->
      <el-menu
        :unique-opened="true"
        class="el-menu-vertical-demo"
        :default-active="activeMenu"
        :collapse="isCollapse"
      >
        <SidebarItem
          v-for="route in permissionStore.routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
  </div>
</template>

<style lang="scss" scoped>

.aside {
  padding-top: 32px;
  :deep(.el-menu) {
    // padding-top: 32px;
    .el-menu-item {
      height: 36px;
      font-size: 16px;

      font-weight: 600;
      color: #999999;
    }
    .el-sub-menu__title {
      height: 36px;
      font-size: 16px;
      font-weight: 600;
      color: #999;
    }
    .is-active,
    .is-active:hover {
      font-weight: 600;
      color: #0076c8;
      border-right: 4px solid #3576c1;
      background: rgba(53, 118, 193, 0.3) !important;
      .is-active {
        border-right: none;
      }
      .el-sub-menu__title {
        color: #0076c8;
        border-right: none;
      }
    }
    .el-sub-menu.is-active,
    .el-sub-menu__title:hover {
      border-right: none;
      background-color: #fff !important;
      .is-active,
      .is-active:hover {
        font-weight: 600;
        color: #0076c8;
        border-right: 4px solid #3576c1;
        background: rgba(53, 118, 193, 0.3) !important;
        .is-active {
          border-right: none;
        }
      }
    }
    .el-menu-item:not(.is-active):hover {
      color: #0076c8;
      background-color: #fff !important;
    }
  }
}
</style>
