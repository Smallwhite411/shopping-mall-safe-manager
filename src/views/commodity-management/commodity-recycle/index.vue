<template>
  <div class="system-style commodity-recycle">
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
              <div>
                <p>{{ item.commodityName }}</p>
              </div>
              <div class="button-show">
                <div
                  @click="recoverCommodity(item.commodityCode)"
                  style="color: #0076c8"
                >
                  恢复
                </div>
                <div @click="deleteCommodity(item.commodityCode)">删除</div>
              </div>
            </div>
            <div class="text-flex">{{ item.commodityDes }}</div>
            <div class="time">
              <div>发布时间：{{ item.releaseTime }}</div>
              <div class="delete-time">删除时间：{{ item.deleteTime }}</div>
            </div>
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
const headTitleInfo = ref([{ path: null, title: "回收站" }]);
const filterOptionList = ref([]);
const tableData = ref<Array<any>>([
  {
    releaseTime: "2010-02-05 23:40:36",
    deleteTime: "1977-05-28 13:58:44",
    commodityCode: "87",
    commodityName: "明保世劳要",
    commodityDes: "Excepteur magna",
    commodityFileId: "5",
    commodityFileName: "深例题改得产",
  },
  {
    releaseTime: "1978-08-14 16:13:38",
    deleteTime: "2013-10-13 12:32:25",
    commodityCode: "79",
    commodityName: "以边万称无条",
    commodityDes: "elit ullamco aliquip dolore",
    commodityFileId: "30",
    commodityFileName: "去专命",
  },
  {
    releaseTime: "2019-01-21 19:32:54",
    deleteTime: "1974-12-13 15:15:47",
    commodityCode: "83",
    commodityName: "备少走角品边",
    commodityDes: "fugiat mollit",
    commodityFileId: "32",
    commodityFileName: "且九达龙我做",
  },
  {
    releaseTime: "1992-03-20 00:54:13",
    deleteTime: "2015-04-12 04:47:24",
    commodityCode: "79",
    commodityName: "品其济团门经",
    commodityDes: "Lorem reprehenderit commodo qui sit",
    commodityFileId: "35",
    commodityFileName: "识长使论强",
  },
  {
    releaseTime: "2019-03-23 20:42:40",
    deleteTime: "1987-08-04 21:42:10",
    commodityCode: "97",
    commodityName: "别叫两装斯",
    commodityDes: "exercitation Lorem aliquip aute",
    commodityFileId: "32",
    commodityFileName: "通头法群中",
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
const recoverCommodity = (item: any) => {};
const deleteCommodity = (item: any) => {};
</script>
<style lang="scss" scoped>
.el-pagination {
  float: right;
}
.commodity-recycle {
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
      .button-show {
        color: #ff0000;
        cursor: pointer;
        display: flex;
        div {
          margin: 0 10px;
        }
      }
    }
    .text-flex {
      margin: 10px 0;
      max-width: 97%;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
    }
    .time {
      display: flex;
      .delete-time {
        margin-left: 50px;
      }
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
