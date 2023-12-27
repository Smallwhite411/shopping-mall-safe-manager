<template>
  <!-- 
          :tableData="tableData"//表格数据
          :tableColumns="tableColumns"//表格标题
          :tableHeight='tableHeight' //表格高度，不含分页
          :searchParams="searchParams"//分页参数既查询参数
          {
            pageNo: 1,//当前页
            pageSize: 20,//每页条数
            total: 0,//总数
          }
          @getData="getData"//分页回调
         -->
  <div class="base-table">
    <el-table
      ref="baseTable"
      :data="tableData"
      v-bind="{ ...$attrs, ...props }"
      :height="tableHeight1"
      :default-sort="{ prop: defaultSort.prop, order: defaultSort.order }"
    >
      <template v-for="(col, index) in tableColumns">
        <!-- 自定义 -->
        <slot v-if="col.slot" :name="col.slot"> </slot>
        <!--选择框 -->
        <el-table-column
          v-else-if="col.selection"
          :key="`selection_${index}`"
          type="selection"
          width="50"
          :fixed="col.fixed"
          align="center"
          header-align="center"
        />
        <!--多级表头 -->
        <el-table-column
          v-else-if="col.multi"
          :key="`multi_${index}`"
          align="center"
          :label="col.label"
        >
          <el-table-column
            v-for="(child, childIndex) in col.children"
            :key="`child_${index}_${childIndex}`"
            v-bind="child"
          />
        </el-table-column>
        <el-table-column
          v-else
          :key="col.prop"
          :fixed="col.fixed"
          :prop="col.prop"
          :label="col.label"
          :width="col.width"
          :align="col.align"
          :default-sort="col.defaultSort"
          :show-overflow-tooltip="col.showTooltip"
          :min-width="col.minWidth || col.width"
          :formatter="col.formatter"
          :sortable="col.sortable"
        >
          <template #default="scope" v-if="col.edit">
            <div
              :class="'edit' + scope.$index + scope.cellIndex"
              @dblclick="
                () => {
                  cancelOtherOptions(scope);
                }
              "
            >
              <div
                v-if="!scope.row['edit' + scope.$index + scope.cellIndex]"
                style="
                  min-height: 23px;
                  white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                "
              >
                {{ scope.row[col.prop] }}
              </div>
              <slot
                v-else
                :name="col.edit"
                :message="scope"
                :property="col.prop"
              ></slot>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="page-pagination" v-if="showPagination">
      <Pagination
        :total="searchParams.total || 0"
        :page-size="searchParams.pageSize"
        :current-page="searchParams.pageNo"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Pagination from "./components/Pagination.vue";
import { ElTable, ElTableColumn } from "element-plus";
import {
  ref,
  watch,
  computed,
  // defineProps,
  // defineEmits,
  useAttrs,
  // defineOptions
} from "vue";
const baseTable = ref();
defineOptions({
  name: "base-table",
});
const tableHeight1: any = computed(() => {
  let defaultValue: any = "calc(100% - 52px)";
  if (props.tableHeight || useAttrs()["max-height"]) {
    defaultValue = props.tableHeight;
  }
  return defaultValue;
});

const cancelOtherOptions = (scope: any) => {
  scope.row["edit" + scope.$index + scope.cellIndex] = true;
  const dom = document.querySelector(
    `.edit` + scope.$index + scope.cellIndex
  ) as HTMLDivElement;
  const monitorClick = (event: Event) => {
    let targetElement: any = event.target;

    if (!dom.contains(targetElement)) {
      document.removeEventListener("click", monitorClick);
      delete scope.row["edit" + scope.$index + scope.cellIndex];
    }
  };

  document.addEventListener("click", monitorClick);
};

const props = defineProps({
  tableData: {
    type: Array as any,
    default: () => [],
  },
  tableColumns: Array as any,
  tableHeight: {
    type: [Number, String],
    default: null,
  },
  searchParams: {
    type: Object,
    default: () => ({
      pageNo: 1,
      pageSize: 20,
      total: 0,
    }),
  },
  showPagination: {
    type: Boolean,
    default: true,
  },
  defaultSort: {
    type: Object,
    default: () => ({
      prop: "",
      order: "ascending",
    }),
  },
});

watch(
  () => props.tableData,
  () => {
    tableLayout();
  },
  { deep: true }
);
const emit = defineEmits(["getData", "update:props.searchParams"]);
const searchParams = computed(() => props.searchParams);
// 切换页码
const handleCurrentChange = (value: any) => {
  searchParams.value.pageNo = value;
  emit("getData", { type: "current", value });
};
// 切换每页条数
const handleSizeChange = (value: any) => {
  // current-page和 page-size都支持 .sync修饰符，用了.sync修饰符，就不需要手动给 this.pagination赋值了
  searchParams.value.pageSize = value;
  searchParams.value.pageNo = 1;
  emit("getData", { type: "size", value });
};
// 重新布局
const tableLayout = () => {
  baseTable.value.doLayout();
};
defineExpose({
  baseTable,
});
</script>
<style lang="scss" scoped>
.base-table {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  .el-table__inner-wrapper {
    .el-table__header-wrapper {
      .el-table__header {
        tr,
        th {
          background: #f5f5f5;
        }
      }
    }
  }
}
.page-pagination {
  margin: 10px 0px;
  width: 100%;
  .el-pagination {
    float: right;
  }
}
</style>
