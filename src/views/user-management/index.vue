<template>
  <div class="system-style commodity-push">
    <HeaderTitle :headTitleInfo="headTitleInfo" />
    <div class="content">
      <p class="title">用户列表</p>
      <div class="filter">
        <FilterIndex
          v-model="condition.filterContent[0]"
          :filterOptionList="filterOptionList"
          @reset="resetFilter"
          @search="updateTable"
        >
        </FilterIndex>
      </div>
      <div class="list">
        <BaseTable
          ref="alltable"
          :page-list="[200, 500, 1000, 2000]"
          :search-params="condition"
          :table-data="tableData"
          :table-columns="tableColumn"
          max-height="calc(100vh - 350px)"
          @sort-change="sortTable"
          @getData="initTable"
          border
        >
          <template #operate>
            <el-table-column
              label="操作"
              width="200"
              align="right"
              fixed="right"
              class="operate"
            >
              <template #default="{ row }">
                <span class="update">编辑</span>
                <span class="delete">删除</span>
              </template>
            </el-table-column>
          </template>
        </BaseTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import HeaderTitle from "@/components/HeadTitle/index.vue";
import FilterIndex from "@/components/FilterIndex/index.vue";
import BaseTable from "@/components/BaseTable/index.vue";
import { pagelist } from "@/api/user-management";
const headTitleInfo = ref([{ path: null, title: "用户管理" }]);
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
const tableColumn = ref([
  {
    prop: "email",
    sortable: "custom",
    label: "用户ID",
    width: "150px",
  },
  {
    prop: "email",
    sortable: "custom",
    label: "邮箱",
  },
  {
    prop: "nickname",
    sortable: "custom",
    label: "用户昵称",
  },
  {
    prop: "recipients",
    sortable: "custom",
    label: "收件人",
  },
  {
    prop: "shippingAddress",
    sortable: "custom",
    label: "收货地址",
  },
  {
    prop: "phone",
    sortable: "custom",
    label: "联系电话",
  },
  { slot: "operate" }, //自定义插槽
]);
const resetFilter = () => {};
const updateTable = () => {};
const pushOperation = (item: any) => {};
const sortTable = () => {};
const initTable = () => {
  const tableCondition = JSON.parse(JSON.stringify(condition.value));
  delete tableCondition.total;

  pagelist(tableCondition).then((res) => {
    if (res.code === 200 && res.data) {
      condition.value.total = res.data.total;
      tableData.value = res.data.records;
    }
  });
};
onMounted(() => {
  initTable();
});
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
