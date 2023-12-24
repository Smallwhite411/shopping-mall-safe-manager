<template>
  <div class="flex-content">
    <!-- <Login/> -->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import  Login from '@/views/login/index.vue'

</script>

<style scoped>
  .flex-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
</style>