<template>
  <div class="app-container">
      <el-card v-loading="loading" shadow="never" class="search-wrapper">
          <el-form ref="searchFormRef" :inline="true" :model="searchData">
              <el-form-item prop="username" label="用户名">
                  <el-input v-model="searchData.username" placeholder="请输入" />
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" :icon="Search" @click="handleSearch">查询</el-button>
                  <el-button :icon="Refresh" @click="resetSearch">重置</el-button>
              </el-form-item>
          </el-form>
      </el-card>
      <el-card v-loading="loading" shadow="never">
          <div class="toolbar-wrapper">
              <div>
                  <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true">新增用户</el-button>
              </div>
              <div>
                  <el-tooltip content="刷新当前页">
                      <el-button type="primary" :icon="RefreshRight" circle @click="getTableData"/>
                  </el-tooltip>
              </div>
          </div>
          <div class="table-wrapper">
              <el-table :data="tableData">
                  <el-table-column type="selection" width="50" align="center" />
                  <el-table-column prop="username" label="用户名" align="center" />
                  <el-table-column prop="roles" label="角色" align="center">
                      <template #default="scope">
                          <el-tag v-if="scope.row.roles === 'admin'" effect="plain">admin</el-tag>
                          <el-tag v-else type="warning" effect="plain">{{ scope.row.roles }}</el-tag>
                      </template>
                  </el-table-column>
                  <el-table-column prop="status" label="状态" align="center">
                      <template #default="scope">
                          <el-tag v-if="scope.row.status" type="success" effect="plain">启用</el-tag>
                          <el-tag v-else type="danger" effect="plain">禁用</el-tag>
                      </template>
                  </el-table-column>
                  <el-table-column prop="createTime" label="创建时间" align="center" />
                  <el-table-column fixed="right" label="操作" width="150" align="center">
                      <template #default="scope">
                          <el-button type="primary" text bg size="small" @click="console.log('我是修改')">修改</el-button>
                          <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">删除</el-button>
                      </template>
                  </el-table-column>
              </el-table>
          </div>
      </el-card>
      <!-- 新增/修改 -->
      <el-dialog v-model="dialogVisible" :title="currentUpdateId === undefined ? '新增用户' : '修改用户'" @close="resetForm"
          width="30%">
          <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
              <el-form-item prop="username" label="用户名">
                  <el-input v-model="formData.username" placeholder="请输入" />
              </el-form-item>
              <el-form-item prop="password" label="密码" v-if="currentUpdateId === undefined">
                  <el-input v-model="formData.password" placeholder="请输入" />
              </el-form-item>
          </el-form>
          <template #footer>
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="handleCreate">确认</el-button>
          </template>
      </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { Search, Refresh, CirclePlus, Delete, Download, RefreshRight } from "@element-plus/icons-vue"
import { ElMessage, ElMessageBox, FormInstance, FormRules } from "element-plus";
import { reactive, ref, watch } from "vue";
import {createTableDataApi, deleteTableDataApi, getTableDataApi, updateTableDataApi,} from '@/api/table/index'
import {usePagination} from '@/hooks/usePagination'
import { GetTableData } from "@/api/table/types/table";

defineOptions({
// 命名当前组件
name: "ElementPlus"
})

const loading = ref<boolean>(false)
const { paginationData } = usePagination()


const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const tableData = ref<GetTableData[]>([])

const formData = reactive({ //用于添加用户的双向数据绑定
  username: "",
  password: ""
})
const searchData = reactive({ //默认新增的都是user用户
  username: "",
})
const searchFormRef = ref<FormInstance | null>(null)

const formRules: FormRules = reactive({ //添加规则
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
password: [
  { required: true, message: "请输入密码", trigger: "blur" },
  { min: 8, max: 16, message: "长度在 8 到 16 个字符", trigger: "blur" }
]
})
//#region 改
const currentUpdateId = ref<undefined | string>(undefined)

//#region 增
const handleCreate = () => {
formRef.value?.validate((valid: boolean, fields) => {
  if (valid) {
    if (currentUpdateId.value === undefined) {
      createTableDataApi(formData)
        .then((res: any) => {
          console.log("kasbgwjb",res)
          ElMessage.success("用户："+`${res.data.username}`+" 添加成功")
          getTableData()
        })
        .finally(() => {
          dialogVisible.value = false
        })
    } else {
      updateTableDataApi({
        id: currentUpdateId.value,
        username: formData.username
      })
        .then(() => {
          ElMessage.success("修改成功")
          getTableData()
        })
        .finally(() => {
          dialogVisible.value = false
        })
    }
  } else {
    console.error("表单校验不通过", fields)
  }
})
}

const resetForm = () => { //清空表单
  currentUpdateId.value = undefined
  formData.username = ""
  formData.password = ""
}

// 查
const getTableData = () => { //如果username为空，则查询所有的信息
loading.value = true
getTableDataApi({
  currentPage: paginationData.currentPage,
  size: paginationData.pageSize,
  username: searchData.username || undefined,
})
  .then((res) => {
      console.log("resresresres",res)
    paginationData.total = res.data.total
    tableData.value = res.data.list
  })
  .catch(() => {
    tableData.value = []
  })
  .finally(() => {
    loading.value = false
  })
}

const handleSearch = () => {
paginationData.currentPage === 1 ? getTableData() : (paginationData.currentPage = 1)
}

const resetSearch = () => {
searchFormRef.value?.resetFields()
handleSearch()
}



//#region 删
const handleDelete = (row: GetTableData) => {
ElMessageBox.confirm(`正在删除用户：${row.username}，确认删除？`, "提示", {
  confirmButtonText: "确定",
  cancelButtonText: "取消",
  type: "warning"
}).then(() => {
  deleteTableDataApi(row._id).then((res) => {
      console.log("aksgbas",res)
    ElMessage.success("删除成功")
    getTableData()
  })
})
}
//#endregion

/** 监听分页参数的变化 */
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })

</script>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;

  :deep(.el-card__body) {
      padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>