<template>
  <div class="head-title">
    <span class="back" v-if="headTitleInfo.length > 1" @click="goBack"
      >返回上一层</span
    >
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="(item, index) in headTitleInfo" :key="index">
        <a v-if="item.path" :href="item.path">{{ item.title }}</a>
        <a v-if="!item.path">{{ item.title }}</a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts" setup>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  headTitleInfo: {
    type: Array<any>,
    default: () => [],
  },
});
const router = useRouter();
const goBack = () => {
  router.go(-1);
};
</script>
<style lang="scss" scoped>
.head-title {
  width: 100%;
  height: 42px;
  line-height: 42px;
  color: #999999;
  margin-bottom: 10px;
  .back {
    display: inline-block;
    width: 100px;
    font-size: 16px;
    font-weight: 600;
    color: #0076c8;
    cursor: pointer;
    line-height: 22px;
    border-right: 1px solid #333;
    margin-right: 20px;
    vertical-align: middle;
  }
  .back:hover {
    text-decoration: underline;
  }
  .el-breadcrumb {
    display: inline-block;
    width: calc(100% - 122px);
    height: 42px;
    line-height: 42px;
    font-size: 24px;
    vertical-align: middle;
    a {
      font-weight: 600;
      color: #999;
    }
    .el-breadcrumb__separator {
      font-weight: normal;
      margin: 0 2px;
    }
    .el-breadcrumb__item:last-child {
      a {
        font-weight: 600;
        color: #333;
      }
    }
    a:hover {
      font-weight: 600;
      color: #333;
    }
  }
}
</style>
