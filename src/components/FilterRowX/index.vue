<template>
  <div class="filter-row">
    <el-select
      v-model="selectKeyId"
      placeholder="请选择"
      class="filter-row-column"
      @change="columnKeyOnchange"
      filterable
    >
      <el-option
        v-for="item in _filterOptionList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-select
      v-model="selectConditionID"
      placeholder="请选择"
      class="filter-row-condition"
      filterable
      @change="updateValueData"
    >
      <el-option
        v-for="item in conditionOptionList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <FilterRow
      :valueType="valueType"
      v-model="valueData"
      class="filter-row-value"
      @update:modelValue="updateValueData"
      :selectOption="valueOption"
    ></FilterRow>
  </div>
</template>

<script setup lang="ts">
import { Ref, onBeforeMount, ref, watch } from "vue";
import FilterRow from "../FilterRow/index.vue";
import { ElSelect, ElOption } from "element-plus";

defineOptions({
  name: "pt-filter-row",
});
const props = defineProps({
  modelValue: Object,
  filterOptionList: Array,
});
const emit = defineEmits(["update:modelValue"]);
// 字段支持的筛选条件
type conditionOption = {
  id: string;
  name: string;
};
// 筛选字段信息
type filterOption = {
  id: string;
  name: string;
  conditionOptionList: conditionOption[];
  valueType: string;
  valueOption?: conditionOption[];
};
// 已选择的筛选条件信息
const selectKeyId = ref("");
const conditionOptionList: Ref<conditionOption[]> = ref([]);
const selectConditionID = ref("");
const valueData: Ref<any> = ref(null);
const valueType = ref("");
const valueOption: Ref<conditionOption[]> = ref([]);
const _filterOptionList: Ref<filterOption[]> = ref([]);
onBeforeMount(() => {
  _filterOptionList.value = props.filterOptionList as filterOption[];
  selectKeyId.value = props.modelValue?.id;
  selectConditionID.value = props.modelValue?.conditionID;
  valueData.value = props.modelValue?.valueData;
  _filterOptionList.value.forEach((item) => {
    if (item.id === selectKeyId.value) {
      conditionOptionList.value = item.conditionOptionList;
      valueType.value = item.valueType;
      valueOption.value = item.valueOption ? item.valueOption : [];
    }
  });
});
const columnKeyOnchange = () => {
  _filterOptionList.value.forEach((item) => {
    if (item.id === selectKeyId.value) {
      conditionOptionList.value = item.conditionOptionList;
      valueType.value = item.valueType;
      valueOption.value = item.valueOption ? item.valueOption : [];
    }
  });
  selectConditionID.value = "";
  if (valueType.value === "multiSelect") {
    valueData.value = [];
  } else {
    valueData.value = "";
  }
  updateValueData();
};
const updateValueData = () => {
  const cacheData = {
    id: selectKeyId.value,
    conditionID: selectConditionID.value,
    valueData: valueData.value,
  };
  emit("update:modelValue", cacheData);
};
watch(
  () => props.filterOptionList,
  () => {
    _filterOptionList.value = props.filterOptionList as filterOption[];
  }
);
watch(
  () => props.modelValue,
  () => {
    selectKeyId.value = props.modelValue?.id;
    selectConditionID.value = props.modelValue?.conditionID;
    valueData.value = props.modelValue?.valueData;
    _filterOptionList.value.forEach((item) => {
      if (item.id === selectKeyId.value) {
        conditionOptionList.value = item.conditionOptionList;
        valueType.value = item.valueType;
        valueOption.value = item.valueOption ? item.valueOption : [];
      }
    });
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss" scoped>
.filter-row {
    line-height: 36px;
    height: 36px;
    min-width:680px;

    .filter-row-column {
        width: 240px;
    }

    .filter-row-condition {
        width: 100px;
        margin-left: 5px;
    }

    .filter-row-value {
        width: 310px;
        margin-left: 5px;
    }
}
</style>