<template>
  <div class="system-style approval-management" v-loading="tableLoading">
    <head-title :headTitleInfo="headTitleInfo"></head-title>
    <div class="content">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="undisposed"
          >未处理审批（{{ undisposed }}）</el-menu-item
        >
        <el-menu-item index="processed"
          >已处理审批（{{ processed }}）</el-menu-item
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
      <div style="max-height: calc(100% - 150px); overflow: auto">
        <div v-for="item in tableData" :key="item.approvalCode">
          <div v-if="!condition.isHandle" class="descriptions">
            <div class="company-name">
              <div>{{ item.enterpriseName }}</div>
              <div class="filter-operate">
                <el-button
                  style="border: 1px solid #149800; color: #149800"
                  @click="approvePass(item)"
                  >通过</el-button
                >
                <el-button
                  style="border: 1px solid #ff0000; color: #ff0000"
                  @click="refuseReason(item)"
                  >拒绝</el-button
                >
                <el-button @click="scanDetail(item)">详情</el-button>
              </div>
            </div>
            <div class="corporate-information">
              <div class="text-flex">公司法人：{{ item.shopName }}</div>
              <div class="text-flex">公司法人电话：{{ item.phone }}</div>
              <div class="text-flex">公司邮箱：{{ item.email }}</div>
            </div>
            <div>地址：{{ item.shopLocation }}</div>
          </div>
          <div
            v-else
            :class="
              `descriptions` +
              ` ${item.type === 'Pass' ? 'pass-style' : 'warning-style'}`
            "
          >
            <div class="company-name">
              <div>{{ item.enterpriseName }}</div>
              <div class="filter-operate">
                <el-button
                  v-if="item.type === 'Pass'"
                  style="
                    border: 1px solid #149800;
                    color: #149800;
                    background-color: rgba(20, 152, 0, 0.2);
                  "
                  >已通过</el-button
                >
                <div v-else>
                  <el-button
                    style="
                      border: 1px solid #ff0000;
                      background-color: rgba(255, 0, 0, 0.2);
                      color: #ff0000;
                    "
                    @click="refuseReason(item)"
                    >拒绝原因</el-button
                  >
                  <el-button style="border: 1px solid #ff0000; color: #ff0000"
                    >已拒绝</el-button
                  >
                </div>
              </div>
            </div>
            <div class="corporate-information">
              <div class="text-flex">公司法人：{{ item.shopName }}</div>
              <div class="text-flex">公司法人电话：{{ item.phone }}</div>
              <div class="text-flex">公司邮箱：{{ item.email }}</div>
            </div>
            <div>地址：{{ item.shopLocation }}</div>
          </div>
        </div>
      </div>
    </div>
    <particularsPopUp
      v-if="showPopUp"
      v-model="showPopUp"
      :approval="approval"
      :isApprover="condition.isHandle"
      @confirm="initTable"
    />
  </div>
</template>
<script lang="ts" setup>
import {
  getRegisterAccount,
  getTotal,
  updateManagementStatus,
} from "@/api/registration-approval";
import particularsPopUp from "./particularsPopUp.vue";
import { ElMessage } from "element-plus";
import { ElLoading } from 'element-plus'
const activeIndex = ref("undisposed");
const approval = ref({});
const showPopUp = ref(false);
const undisposed = ref(0);
const processed = ref(0);

let condition: any = ref({
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
  isHandle: false,
});
const handleSelect = (key: string) => {
  if (key === "processed") {
    condition.value.isHandle = true;
  } else {
    condition.value.isHandle = false;
  }
  initTable();
};
const tableData: any = ref([]);
const tableLoading = ref(false)
const filterOptionList = ref([]);
const headTitleInfo = ref([{ path: null, title: "商户入网审批" }]);
const getTotalNumber = async () => {
  const res = await getTotal();
  processed.value = res.data!.processed;
  undisposed.value = res.data!.untreated;
};
const initData = async () => {
  initTable();
  const filterCondition: any = { tableId: "HandleOrUntreatedBo" };
  // const res: any = await getTableFilter(filterCondition);
  // filterOptionList.value = res.data;
};
const initTable = async () => {
  getTotalNumber();
  const tableCondition = JSON.parse(JSON.stringify(condition.value));
  delete tableCondition.total;
  tableLoading.value = true
  const res = await getRegisterAccount(tableCondition);
  tableLoading.value = false
  console.log("getRegisterAccount", res.data);

  if (res.code === 200 && res.data) {
    condition.value.total = res.data.total;
    tableData.value = res.data.records;
  }
};
const resetFilter = () => {
  condition.value.filterContent = [
    {
      id: "",
      conditionID: "",
      valueData: "",
    },
  ];
  condition.value.pageNo = 1;
  initTable();
};

const updateTable = () => {
  condition.value.pageNo = 1;
  initTable();
};

const router = useRouter();
const scanDetail = (data: any) => {
  router.push({
    path: "/approval-management/account-edit",
    query: { enterpriseCode: data.approvalCode, type: "approval" },
  });
};
const refuseReason = (row: any) => {
  showPopUp.value = true;
  approval.value = row;
};
const approvePass = (row: any) => {
  console.log(row);

  updateManagementStatus({
    approvalCode: row.approvalCode,
    type: "Pass",
    refuseReason: "",
  }).then(() => {
    ElMessage.success("通过");
    initTable();
  });
};

onMounted(() => {
  initData();
});
</script>
<style lang="scss" scoped>
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
  .descriptions {
    background: rgba(247, 248, 250, 1);
    border-left: 3px solid rgba(0, 118, 200, 1);
    margin: 18px 20px;
    padding: 10px 10px;
    font-size: 14px;
    font-weight: 400;
    color: #666666;
    line-height: 20px;

    .company-name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      color: #333333;
      line-height: 22px;
      font-size: 16px;

      .filter-operate {
        text-align: right;
        .el-button {
          min-width: 100px;
          padding: 0 10px;
          height: 28px;
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #3576c1;
          font-size: 16px;
          font-weight: 400;
          color: #3576c1;
        }
      }
    }
    .corporate-information {
      display: flex;
      .text-flex {
        margin: 10px 70px 10px 0;
      }
    }
  }

  .warning-style {
    background: rgba(255, 0, 0, 0.06);
    border-left: 3px solid rgba(255, 0, 0, 1);
  }
  .pass-style {
    background: rgba(20, 152, 0, 0.06);
    border-left: 3px solid rgba(20, 152, 0, 1);
  }
}
</style>
