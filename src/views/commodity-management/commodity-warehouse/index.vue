<template>
  <div class="system-style commodity-warehouse">
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
              <div class="put-away">
                <el-button v-if="item.isGrounding">已上架</el-button>
                <el-button v-else class="sold-out">已下架</el-button>
                <p>{{ item.commodityName }}</p>
              </div>
              <div class="button-show">
                <div
                  v-if="!item.isGrounding"
                  @click="commodityPutAway(item)"
                  style="color: #0076c8"
                >
                  上架
                </div>
                <div v-else @click="commodityPutAway(item)">下架</div>
                <div @click="deleteCommodity(item.commodityCode)">删除</div>
              </div>
            </div>
            <div class="text-flex">{{ item.commodityDes }}</div>
            <div>发布时间：{{ item.releaseTime }}</div>
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
const headTitleInfo = ref([{ path: null, title: "商品库" }]);
const filterOptionList = ref([]);
const tableData = ref<Array<any>>([]);
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
const commodityPutAway = (item: any) => {};
const deleteCommodity = (item: any) => {};
</script>

<style lang="scss" scoped>
.el-pagination {
  float: right;
}
.commodity-warehouse {
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
      .put-away {
        display: flex;
        justify-content: center;
        align-items: center;
        .el-button {
          min-width: 70px;
          padding: 2px 10px 2px 10px;
          background: #14980033;
          border-radius: 4px;
          border: 1px solid #149800;
          font-size: 14px;
          height: 25px;
          font-weight: 400;
          color: #149800;
          margin-right: 20px;
        }
        .sold-out {
          background: #ff000033;
          border: 1px solid #ff0000;
          color: #ff0000;
        }
      }
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
  }

  .no-data {
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #e4eaee;
    margin-bottom: 10px;
    margin-top: 30px;
  }
}
</style>
