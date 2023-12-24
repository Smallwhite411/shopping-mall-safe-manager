<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { storeToRefs } from "pinia"
import { useAppStore } from "@/store/modules/app"
import { usePermissionStore } from "@/store/modules/permission"
import { useSettingsStore } from "@/store/modules/setting"
import SidebarItem from "./SidebarItem.vue"
import SidebarLogo from "./SidebarLogo.vue"

const route = useRoute()
const appStore = useAppStore()
const permissionStore = usePermissionStore()
const settingsStore = useSettingsStore()

const { showSidebarLogo } = storeToRefs(settingsStore) //解构

//当前激活的菜单项是通过检查当前路由的 meta 属性获得的，如果不存在，则使用路由路径。侧边栏的折叠状态通过检查 appStore 中的 sidebar 对象的 opened 属性来确定。
const activeMenu = computed(() => {
  const { meta, path } = route
  if (meta?.activeMenu) {
    return meta.activeMenu
  }
  return path
})
console.log("permissionStore", activeMenu, route)

// 这里的permissionStore.routes 获取到了路由数据，根据路由的children 来创建多级路由

//使用计算属性来确定当前激活的菜单项以及侧边栏是否处于折叠状态
const isCollapse = computed(() => {
  // opened 是打开 === ！collapse 不折叠
  return !appStore.sidebar.opened
})
</script>

<template>
  <div :class="{ 'has-logo': showSidebarLogo }">
    <!-- 侧边栏的logo 大小logo切换 -->
    <SidebarLogo v-if="showSidebarLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        background-color="#001428"
        text-color="#c0c4cc"
        active-text-color="#ffffff"
        :unique-opened="true"
        :collapse-transition="false"
        mode="vertical"
      >
        <SidebarItem
          v-for="route in permissionStore.routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
          :is-collapse="isCollapse"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
@mixin tip-line {
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 100%;
    background-color: #01efb7bb;
  }
}

.has-logo {
  .el-scrollbar {
    height: calc(100% - calc(84px));
  }
}

.el-scrollbar {
  height: 100%;
  :deep(.scrollbar-wrapper) {
    // 限制水平宽度
    overflow-x: hidden !important;
    .el-scrollbar__view {
      height: 100%;
    }
  }
  // 滚动条
  :deep(.el-scrollbar__bar) {
    &.is-horizontal {
      // 隐藏水平滚动条
      display: none;
    }
  }
}

.el-menu {
  border: none;
  min-height: 100%;
  width: 100% !important;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title),
:deep(.el-sub-menu .el-menu-item) {
  height: 60px;
  line-height: 60px;
  &.is-active,
  &:hover {
    background-color: #ffffff10;
  }
  display: block;
  * {
    vertical-align: middle;
  }
}

:deep(.el-menu-item) {
  &.is-active {
    @include tip-line;
  }
}

.el-menu--collapse {
  :deep(.el-sub-menu) {
    &.is-active {
      .el-sub-menu__title {
        color: #ffffff !important;
        @include tip-line;
      }
    }
  }
}
</style>
