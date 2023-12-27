<template>
  <div class="system-style approval-management">
    <HeaderTitle :headTitleInfo="headTitleInfo" />
    <div class="content">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="allnumber">全部{{ allnumber }}）</el-menu-item>
        <el-menu-item index="nonpayment">未付款{{ nonpayment }}）</el-menu-item>
        <el-menu-item index="notyetshipped"
          >未发货{{ notyetshipped }}）</el-menu-item
        >
        <el-menu-item index="delivered">已发货{{ delivered }}）</el-menu-item>
        <el-menu-item index="havearrived"
          >已到货{{ havearrived }}）</el-menu-item
        >
      </el-menu>
      <div class="filter">
        <FilterIndex
          v-model="condition.filterContent[0]"
          :filterOptionList="filterOptionList"
          @reset="resetFilter"
          @search="updateTable"
        >
        </FilterIndex>
      </div>
      <div class="item" style="padding: 18px 20px; margin: 0">
        <BaseTable
          ref="alltable"
          :page-list="[200, 500, 1000, 2000]"
          :search-params="condition"
          :table-data="tableData"
          :selectable="false"
          :table-columns="tableColumn"
          :show-pagination="condition.isAbnormal === ''"
          max-height="calc(100vh - 370px)"
          :row-class-name="tableRowClassName"
          @selection-change="handleSelectionChange"
          @sort-change="sortTable"
          @getData="initTable"
          border
        >
          <template #status>
            <el-table-column label="订单状态" width="100" align="left">
              <template #default="{ row }">
                <el-tag
                  class="mx-1"
                  :type="
                    row.isPass === 'PASS'
                      ? 'success'
                      : row.isPass === 'REFUSE'
                      ? 'danger'
                      : ''
                  "
                  style="margin-right: 10px"
                  :key="row.enterpriseCode"
                  >{{
                    row.isPass === "PASS"
                      ? "已通过"
                      : row.isPass === "REFUSE"
                      ? "已拒绝"
                      : "审批中"
                  }}</el-tag
                >
              </template>
            </el-table-column>
          </template>
          <template #operate>
            <el-table-column
              label="操作"
              width="180"
              align="right"
              fixed="right"
              class="operate"
            >
              <template #default="{ row }">
                <div class="operation">
                  <span class="delete" @click="deleteOrder(row)">删除</span>

                  <span
                    v-if="row.isPass !== 'REFUSE'"
                    class="update"
                    @click="scanDetail(row)"
                    >详情</span
                  >
                </div>
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

const headTitleInfo = ref([{ path: null, title: "订单管理" }]);
const filterOptionList = ref([]);
const allnumber = ref(0);
const nonpayment = ref(0);
const notyetshipped = ref(0);
const delivered = ref(0);
const havearrived = ref(0);
const contactPersonData = ref<Array<string>>([]);
const tableData = ref<Array<any>>([]);
const activeIndex = ref("allnumber");
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
const handleSelect = () => {};
const pushOperation = (item: any) => {};
const deleteOrder = (item: any) => {};
const scanDetail = (item: any) => {};
const sortTable = () => {};
const initTable = () => {};
const tableRowClassName = ({ row }: { row: any; rowIndex: number }) => {
  if (row.isAbnormal === true) {
    return "warning-row";
  } else {
    return "";
  }
};
const handleSelectionChange = (val: Array<string>) => {
  contactPersonData.value = val;
};
const tableColumn = ref([
  {
    prop: "orderNumber",
    sortable: "custom",
    label: "订单号",
    width: "120px",
  },
  {
    prop: "userName",
    sortable: "custom",
    label: "用户昵称",
    width: "150px",
  },
  {
    prop: "recipients",
    sortable: "custom",
    label: "收件人",
    width: "150px",
  },
  {
    prop: "shippingAddress",
    sortable: "custom",
    label: "收货地址",
    width: "180px",
  },
  {
    prop: "phone",
    sortable: "custom",
    label: "联系电话",
    width: "150px",
  },
  {
    prop: "commodity",
    sortable: "custom",
    label: "商品",
    width: "150px",
  },
  {
    prop: "specification",
    sortable: "custom",
    label: "规格",
    width: "150px",
  },
  {
    prop: "purchaseQuantity",
    sortable: "custom",
    label: "购买数量",
    width: "150px",
  },
  {
    prop: "money",
    sortable: "custom",
    label: "金额",
    width: "150px",
  },
  {
    slot: "status",
  },
  // {
  //   prop: "status",
  //   sortable: "custom",
  //   label: "订单状态",
  //   width: "150px",
  // },
  {
    prop: "updateTime",
    sortable: "custom",
    label: "更新时间",
    width: "180px",
  },
  { slot: "operate" }, //自定义插槽
]);
</script>
<style lang="scss" scoped>
.el-pagination {
  float: right;
}
.content {
  padding: 0;
  height: calc(100% - 47px);
  .el-menu {
    .el-menu-item {
      padding: 0 20px;
      font-weight: 600;
      color: #999999;
      font-size: 16px;
    }
    .el-menu-item.is-active {
      color: #0076c8;
    }
  }

  .filter {
    padding: 18px 20px;
  }
  .item {
    margin-top: 30px;
    .base-table {
      .el-table {
        border-radius: 4px;
      }
      .el-table td,
      .el-table th {
        border: 1px solid #e4eaee;
        border-right: none;
        border-bottom: 1px solid rgb(0, 0, 0, 0);
      }
      tr:last-child {
        td.el-table__cell {
          border-bottom: 1px solid #e4eaee;
        }
      }
      th.el-table__cell,
      td.el-table__cell {
        padding: 6px 0px;
        text-align: center;
        .cell {
          padding: 0 20px;
        }
      }
      td.el-table__cell {
        // padding: 6px 20px;
        background-color: #fff;
        .delete {
          font-size: 12px;
          color: #ff0000;
          cursor: pointer;
        }
        .update {
          font-size: 12px;
          color: #3576c1;
          cursor: pointer;
        }
      }
      .is-right {
        .cell {
          text-align: right;
        }
      }
      .el-switch__core {
        border: 1px solid rgba(0, 0, 0, 0.02);
        .el-icon {
          font-size: 12px;
        }
      }
    }
  }

  .operation {
    span {
      margin-left: 20px;
      span {
        margin-left: 20px;
      }
    }
  }
}
:deep(.warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
  .is-right {
    background-color: var(--el-table-tr-bg-color);
  }
}
</style>
