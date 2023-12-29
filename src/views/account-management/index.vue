<template>
  <div class="system-style commodity-push">
    <HeaderTitle :headTitleInfo="headTitleInfo" />
    <div class="content">
      <p class="title">商户列表</p>
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
              width="150"
              align="right"
              fixed="right"
              class="operate"
            >
              <template #default="{ row }">
                <span v-if="!row.isAdmin">
                  <span class="update">编辑</span>
                  <span class="delete">删除</span>
                </span>
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
import { accountPage } from "@/api/account-management";
const headTitleInfo = ref([{ path: null, title: "商户" }]);
const filterOptionList = ref([]);
const tableData = ref<Array<any>>([
  {
    approvalCode: "001",
    shopName: "铜仁娃娃店",
    chargePerson: "张三",
    shopLocation: "上海闵行",
    phone: "13812345678",
    email: "zhangsan@example.com",
    isAdmin: true,
    password: "123456",
  },
  {
    approvalCode: "002",
    shopName: "铜仁娃娃店2",
    chargePerson: "张三",
    shopLocation: "上海闵行",
    phone: "13812345678",
    email: "zhangsan@example.com",
    isAdmin: false,
    password: "123456",
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
const sortTable = () => {};
const initTable = async () => {
  const tableCondition = JSON.parse(JSON.stringify(condition.value));
  delete tableCondition.total;
  const res = await accountPage(tableCondition);
  if (res.data) {
    condition.value.total = res.data.total;
    tableData.value = res.data.records;
  }
};
const tableColumn = ref([
  {
    prop: "approvalCode",
    sortable: "custom",
    label: "商户账号",
    width: "150px",
  },
  {
    prop: "shopName",
    sortable: "custom",
    label: "店铺昵称",
  },
  {
    prop: "chargePerson",
    sortable: "custom",
    label: "责任人",
  },
  {
    prop: "shopLocation",
    sortable: "custom",
    label: "店铺所在地",
  },
  {
    prop: "email",
    sortable: "custom",
    label: "邮箱",
  },

  {
    prop: "phone",
    sortable: "custom",
    label: "联系电话",
  },
  { slot: "operate" }, //自定义插槽
]);

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

:deep(.el-table) {
  td {
    .cell {
      .el-tag {
        max-width: 100%;
        height: auto;
        white-space: break-spaces;
        justify-content: flex-start;
        line-height: 18px;
      }
    }
  }
  td:last-child {
    .cell {
      text-align: center;
      span {
        display: inline-block;
        margin-left: 20px;
      }
    }
  }
}
</style>
