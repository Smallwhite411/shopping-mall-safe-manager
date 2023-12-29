<template>
  <div class="add-label">
    <el-dialog
      v-bind="$attrs"
      align-center
      title="提示"
      width="600px"
      class="system-dialog"
      :close-on-click-modal="false"
      :before-close="cancel"
    >
      <el-form
        v-if="!props.isApprover"
        ref="userFormRef"
        :model="userForm"
        :rules="rules"
        label-width="100%"
      >
        <el-form-item label="拒绝原因:" prop="refuse">
          <el-input
            v-model="userForm.refuse"
            maxlength="255"
            :autosize="{ minRows: 5, maxRows: 2 }"
            type="textarea"
            placeholder="请输入拒绝原因"
          />
        </el-form-item>
      </el-form>
      <el-descriptions title="拒绝原因:" v-else>
        <el-descriptions-item class="refuseReason">{{
          refuseReason
        }}</el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span v-if="!props.isApprover" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button
            type="primary"
            v-throttle="{ event: 'click', fn: confirm, delay: 500 }"
          >
            确 定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { updateManagementStatus } from '@/api/registration-approval';
import { ElMessage } from 'element-plus';

const props = defineProps({
  approval: {
    type: Object,
    default: () => {},
  },
  isApprover: {
    type: Boolean,
    default: false,
  },
});
const refuseReason = ref("");
const userFormRef = ref();
const userForm = ref({
  refuse: "",
});
let rules = reactive({
  refuse: [{ required: true, message: "请输入拒绝的原因", trigger: "blur" }],
});
const emit = defineEmits(["update:modelValue", "confirm"]);
const cancel = () => {
  emit("update:modelValue", false);
};
const confirm = async () => {
  await userFormRef.value.validate((valid: any) => {
    if (valid) {
      updateManagementStatus({
        approvalCode: props.approval.approvalCode,
        type: "Refuse",
        refuseReason: userForm.value.refuse,
      }).then(() => {
        emit("confirm");
        ElMessage.success("操作成功");
        cancel();
      });
    }
  });
};

onMounted(() => {
  if (props.isApprover) {
    console.log(props.isApprover,props.approval);
    
    refuseReason.value = props.approval.refuseReason;
  }
});
</script>
<style lang="scss">
.el-descriptions__content {
  word-break: break-all;
}
</style>
