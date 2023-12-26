<template>
  <section class="app-main">
    <div class="app-scrollbar">
      <router-view v-slot="{ Component }">
        <transition name="el-fade-in" mode="out-in">
          <component :is="Component" :key="key" />
        </transition>
      </router-view>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const key = computed(() => {
  console.log("route.path", route.path);
  return route.path;
});
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.app-main {
  // min-height: calc(100vh - 50px);
  // width: 100%;
  // position: relative;
  // overflow: hidden;
  // background-color: #f2f3f5;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  overflow: auto;
  overflow-x: hidden;
  background-color: eee;
  padding: 20px;
}
.app-scrollbar {
  height: 100%;
  overflow: auto;
  @include scrollbar;
}
.fixed-header + .app-main {
  padding-top: 50px;
  height: 100vh;
  overflow: auto;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh - calc(50px + 34px));
  }

  .fixed-header + .app-main {
    padding-top: calc(50px + 34px);
  }
}
</style>
