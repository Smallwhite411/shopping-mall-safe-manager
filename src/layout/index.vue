<template>
  <!-- <div :class="classObj" class="app-wrapper">
    <div v-if="classObj.mobile && classObj.openSidebar" class="drawer-bg" @click="handleClickOutside" />
    <Siderbar class="sidebar-container" />
    <div class="main-container">
      <div :class="{ 'fixed-header': fixedHeader }">
        <NavigationBar />
      </div>
      <AppMain />
    </div>
  </div> -->
  <el-container class="container">
    <el-header><NavigationBar></NavigationBar></el-header>
    <el-container class="content">
      <el-aside width="220px"> <Siderbar></Siderbar></el-aside>
      <el-main><AppMain></AppMain></el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { DeviceType, useAppStore } from "@/store/modules/app";
import { useSettingsStore } from "@/store/modules/setting";
import { computed } from "vue";
import Siderbar from "./components/Sidebar/index.vue"; //侧边栏
import NavigationBar from "./components/NavigationBar/index.vue"; //顶部
import AppMain from "./components/AppMain.vue"; //内容

const settingsStore = useSettingsStore();
const appStore = useAppStore();

const classObj = computed(() => {
  return {
    hideSidebar: !appStore.sidebar.opened,
    openSidebar: appStore.sidebar.opened,
    withoutAnimation: appStore.sidebar.withoutAnimation,
    mobile: appStore.device === DeviceType.Mobile,
  };
});

const showSettings = computed(() => {
  return settingsStore.showSettings;
});
const showTagsView = computed(() => {
  return settingsStore.showTagsView;
});
const fixedHeader = computed(() => {
  return settingsStore.fixedHeader;
});

const handleClickOutside = () => {
  appStore.closeSidebar(false);
};
</script>

<style lang="scss" scoped>
// @import "../styles/mixins.scss";
.container {
    width: 100%;
    height: 100%;
    .el-header {
      width: 100%;
      height: 64px;
      line-height: 64px;
      padding: 10px 30px;

      background: #0076c8;
      border-bottom: 3px solid rgba(31, 77, 131, 1);
    }
    .content {
      width: 100%;
      height: calc(100% - 75px);
      background: #eee;
      .el-aside {
        width: 220px;
        height: 100%;
        background: #ffffff;
        box-shadow: 2px 0px 6px 0px rgba(0, 0, 0, 0.15);
        z-index: 1;
      }
      .el-main {
        padding: 0;
      }
    }
  }

// .app-wrapper {
//   @include clearfix;
//   position: relative;
//   width: 100%;
// }

// .showGreyMode {
//   filter: grayscale(1);
// }

// .showColorWeakness {
//   filter: invert(0.8);
// }

// .drawer-bg {
//   background-color: #000;
//   opacity: 0.3;
//   width: 100%;
//   top: 0;
//   height: 100%;
//   position: absolute;
//   z-index: 999;
// }

// .main-container {
//   min-height: 100%;
//   transition: margin-left 0.28s;
//   margin-left: 220px;
//   position: relative;
// }

// .sidebar-container {
//   transition: width 0.28s;
//   width: 220px !important;
//   height: 100%;
//   position: fixed;
//   font-size: 0px;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   z-index: 1001;
//   overflow: hidden;
// }

// .fixed-header {
//   position: fixed;
//   top: 0;
//   right: 0;
//   z-index: 9;
//   width: calc(100% - 210px);
//   transition: width 0.28s;
// }

// .hideSidebar {
//   .main-container {
//     margin-left: 58px;
//   }

//   .sidebar-container {
//     width: 58px !important;
//   }

//   .fixed-header {
//     width: calc(100% - 58px);
//   }
// }

// // for mobile response 适配移动端
// .mobile {
//   .main-container {
//     margin-left: 0px;
//   }

//   .sidebar-container {
//     transition: transform 0.28s;
//     width: 220px !important;
//   }

//   &.openSidebar {
//     position: fixed;
//     top: 0;
//   }

//   &.hideSidebar {
//     .sidebar-container {
//       pointer-events: none;
//       transition-duration: 0.3s;
//       transform: translate3d(calc(0px - 220px), 0, 0);
//     }
//   }

//   .fixed-header {
//     width: 100%;
//   }
// }

// .withoutAnimation {
//   .main-container,
//   .sidebar-container {
//     transition: none;
//   }
// }
</style>
