<script lang="ts">
import {
  defineComponent,
  resolveComponent,
  h,
  VNode,
  VNodeArrayChildren,
} from "vue";
import { ElInput, ElDatePicker, ElSelect, ElOption } from "element-plus";

export default defineComponent({
  // props: {
  //   //交互类型
  //   filterType: Number,
  //   //选项类型
  //   conditionType: Number,
  //   modelValue: Number && String,
  //   filterOption: Array
  // },
  props: ["valueType", "modelValue", "placeholder", "selectOption"],
  emits: ["update:modelValue"],
  components: {
    ElInput,
    ElDatePicker,
    ElSelect,
    ElOption,
  },
  setup() {
    return {};
  },
  render() {
    let tag = "el-input",
      option,
      childNode: string | number | boolean | VNode | VNodeArrayChildren = "";
    if (this.valueType == "string") {
      tag = "el-input";
      option = {
        modelValue: this.modelValue,
        "onUpdate:modelValue": (value: any) =>
          this.$emit("update:modelValue", value),
        style: "width: 310px;margin-left: 5px;",
        placeholder: this.placeholder,
      };
      childNode = "";
    } else if (this.valueType == "date") {
      tag = "el-date-picker";
      option = {
        modelValue: this.modelValue,
        "onUpdate:modelValue": (value: any) =>
          this.$emit("update:modelValue", value),
        type: "datetime",
        style: "width: 310px;margin-left: 5px;",
        valueFormat: "YYYY-MM-DD HH:mm:ss",
      };
      childNode = "";
    } else if (this.valueType == "bool") {
      tag = "el-select";
      option = {
        modelValue: this.modelValue,
        "onUpdate:modelValue": (value: any) =>
          this.$emit("update:modelValue", value),
        style: "width: 310px;margin-left: 5px;",
      };
      const htmlTag = resolveComponent("el-option");
      const BooleanOption = [
        {
          ID: true,
          Name: "是",
        },
        {
          ID: false,
          Name: "否",
        },
      ];
      childNode = [];
      BooleanOption.forEach((item) => {
        const perOptionHTML = h(htmlTag, {
          key: item.Name,
          value: item.ID,
          label: item.Name,
        });
        (childNode as VNodeArrayChildren).push(perOptionHTML as VNode);
      });
    } else if (this.valueType == "select") {
      console.log(this.selectOption);
      option = {
        modelValue: this.modelValue,
        "onUpdate:modelValue": (value: any) =>
          this.$emit("update:modelValue", value),
        style: "width: 310px;margin-left: 5px;",
        collapseTags: true,
        filterable: true,
        "allow-create": true,
        clearable: true,
        "reserve-keyword": true,
      };
      tag = "el-select";
      const htmlTag = resolveComponent("el-option");
      childNode = [];
      this.selectOption?.forEach((item: { id: any; name: any }) => {
        const perOptionHTML = h(htmlTag, {
          key: item.id,
          value: item.id,
          label: item.name,
        });
        (childNode as VNodeArrayChildren).push(perOptionHTML as VNode);
      });
    } else if (this.valueType == "multiSelect") {
      console.log(this.selectOption);
      option = {
        modelValue: this.modelValue,
        "onUpdate:modelValue": (value: any) =>
          this.$emit("update:modelValue", value),
        style: "width: 310px;margin-left: 5px;",
        collapseTags: true,
        "collapse-tags-tooltip": true,
        filterable: true,
        "allow-create": true,
        clearable: true,
        "reserve-keyword": true,
        multiple: true,
      };
      tag = "el-select";

      const htmlTag = resolveComponent("el-option");
      childNode = [];
      this.selectOption?.forEach((item: { id: any; name: any }) => {
        const perOptionHTML = h(htmlTag, {
          key: item.id,
          value: item.id,
          label: item.name,
        });
        (childNode as VNodeArrayChildren).push(perOptionHTML as VNode);
      });
    }
    const layerOne = resolveComponent(tag);
    return h(layerOne, option, childNode);
  },
});
</script>
<style scoped></style>
