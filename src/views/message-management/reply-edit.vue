<template>
  <div
    v-if="tableData.length !== 0"
    class="list"
    style="max-height: calc(100vh - 350px); overflow: auto"
  >
    <div class="line" v-for="(item, index) in tableData" :key="index">
      <div class="img-flex">
        <el-image
          style="width: 100px; height: 100px"
          src="http://101.133.135.200:8111/Picture/%E5%9C%B0%E7%90%83%E6%AD%A3%E9%9D%A2%E5%9B%BE.jpeg"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="[
            'http://101.133.135.200:8111/Picture/%E5%9C%B0%E7%90%83%E6%AD%A3%E9%9D%A2%E5%9B%BE.jpeg',
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
            <p>{{ item.commodityName }}</p>
          </div>
          <div class="button-show">
            <div @click="commodityPutAway(item)">{{ item.releaseTime }}</div>
            <el-button v-if="!item.isReply">回复</el-button>
            <div v-else class="reply">已回复</div>
          </div>
        </div>
        <div class="text-flex">商品：{{ item.commodityDes }}</div>
        <div style="color: #9d97a2">{{ item.reply }}</div>
      </div>
    </div>
  </div>
  <div v-else class="no-data">暂无数据</div>
</template>

<script setup lang="ts">
const tableData = ref<Array<any>>([
  {
    commodityCode: "98",
    releaseTime: "08-27 22:25:15",
    isGrounding: true,
    commodityName: "问发事计",
    commodityDes: "voluptate in do dolore",
    commodityFileId: "62",
    reply: "时二料存",
    isReply: false,
  },
  {
    commodityCode: "92",
    releaseTime: "07-02 09:32:25",
    isGrounding: true,
    commodityName: "半查究约正",
    commodityDes: "ad cupidatat",
    commodityFileId: "98",
    reply: "劳地问利统",
    isReply: true,
  },
]);
const commodityPutAway = (item: any) => {};
const deleteCommodity = (item: any) => {};
</script>
<style lang="scss" scoped>
.list {
  margin-left: 15px;
  margin-right: 15px;
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
        color: #4c7fa3;
        display: flex;
        flex-direction: column;
        align-items: self-end;
        position: relative;
        div {
          margin: 0 10px;
        }

        .el-button,.reply{
          width: 50px;
          margin: 0 10px;
          position: absolute;
          top: 30px;
        }
      }
    }
    .text-flex {
      margin: 10px 0;
      max-width: 97%;
      overflow: hidden;
      text-overflow: ellipsis;
      word-wrap: break-word;
      color: #4c7fa3;
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
