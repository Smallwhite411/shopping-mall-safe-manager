<template>
  <div class="system-style commodity-push">
    <HeaderTitle :headTitleInfo="headTitleInfo" />
    <div class="content">
      <p class="title">商品列表</p>
      <div class="filter">
        <FilterIndex
          v-model="condition.filterContent[0]"
          :filterOptionList="filterOptionList"
          @reset="resetFilter"
          @search="updateTable"
        >
        </FilterIndex>
      </div>
      <div
        v-if="tableData.length !== 0"
        class="list"
        style="max-height: calc(100vh - 350px); overflow: auto"
      >
        <div class="line" v-for="(item, index) in tableData" :key="index">
          <div class="img-flex">
            <el-image
              style="width: 100px; height: 100px"
              :src="'/api/file/preview/mongoURL/' + item.commodityFileId"
              :zoom-rate="1.2"
              :max-scale="7"
              :min-scale="0.2"
              :preview-src-list="[
                '/api/file/preview/mongoURL/' + item.commodityFileId,
              ]"
              :initial-index="4"
              fit="cover"
            >
              <template #error>
                <div class="image-slot">
                  <img src="@/assets/commodity/暂无.png" alt="暂无" />
                </div>
              </template>
            </el-image>
          </div>
          <div style="width: calc(100% - 120px)">
            <div class="commodity-name">
              <p>{{ item.commodityName }}</p>
              <div @click="pushOperation(item)">推送</div>
            </div>
            <div class="text-flex">{{ item.commodityDes }}</div>
            <div class="poush-label">
              已推送标签：
              <el-tag
                class="mx-1"
                v-for="label in item.labelList"
                :key="label"
                style="margin: 5px 0; margin-right: 10px"
                >{{ label }}</el-tag
              >
            </div>
            <div>推送时间：{{ item.pushTime }}</div>
          </div>
        </div>
      </div>
      <div v-else class="no-data">暂无数据</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderTitle from "@/components/HeadTitle/index.vue";
import FilterIndex from "@/components/FilterIndex/index.vue";
import { ElImage } from "element-plus";
const headTitleInfo = ref([{ path: null, title: "商品推送" }]);
const filterOptionList = ref([]);
const tableData = ref<Array<any>>([
  {
    labelList: [
      "amet",
      "exercitation dolore Excepteur",
      "aliqua dolor dolore",
      "aute in",
      "pariatur consectetur exercitation",
    ],
    commodityCode: "75",
    pushTime: "1981-12-29 08:17:12",
    commodityName: "号包集再",
    commodityDes: "est",
    commodityFileId: "18",
    commodityFileName: "因元条",
  },
  {
    labelList: ["sed id sit consectetur"],
    commodityCode: "98",
    pushTime: "2004-09-27 11:15:17",
    commodityName: "真名习三却",
    commodityDes: "aliquip cupidatat dolore ut velit",
    commodityFileId: "34",
    commodityFileName: "需细队等军",
  },
]);
const condition: any = ref({
  filterContent: [
    {
      id: "",
      conditionID: "",
      valueData: "",
    },
  ],
  pageSize: 20,
  pageNo: 1,
  sortField: {},
  total: 0,
});
const resetFilter = () => {};
const updateTable = () => {};
const pushOperation = (item: any) => {};
</script>
<style lang="scss" scoped>
.el-pagination {
  float: right;
}
.commodity-push {
  font-size: 14px;
  font-weight: 400;
  color: #666666;
  line-height: 20px;
  .line {
    display: flex;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e4eaee;
    .img-flex {
      margin-right: 20px;
      img {
        width: 104px;
        height: 104px;
      }
    }
    .commodity-name {
      font-weight: 600;
      color: #333333;
      line-height: 22px;
      font-size: 16px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      div {
        color: #0076c8;
        cursor: pointer;
        margin: 0 10px;
      }
    }
    .text-flex {
      margin: 10px 0;
      max-width: 97%;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
    }
    .poush-label {
      margin-top: 10px;
      margin-bottom: 5px;
    }
  }
  .no-data {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e4eaee;
    margin-top: 30px;
    margin-bottom: 10px;
  }
}
</style>
