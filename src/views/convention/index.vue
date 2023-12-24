<script setup lang="ts">
import { reactive } from 'vue';
import { columnListType, testDatasType } from './index'


const columnList = reactive<columnListType[]>([
  { prop: "name", label: 'name', show: true },
  { prop: "age", label: 'age', show: true },
  { prop: "city", label: 'city', show: true },
  { prop: "tel", label: 'tel', show: true }
])
const testDatas = reactive<testDatasType[]>([{
  name: { content: '张三', show: true },
  age: { content: 24, show: true },
  city: { content: '广州', show: true },
  tel: { content: '13312345678', show: true }
},{
  name: { content: '李四', show: true },
  age: { content: 25, show: true },
  city: { content: '九江', show: true },
  tel: { content: '18899998888', show: true }
}])


</script>

<template>
    <div>
        <el-table :data="testDatas" border style="width: 100%">
            <!-- 额外添加的编号项（可删除） -->
            <el-table-column v-if="columnList.length > 0" type="index" :label="'编号'" :width="50"></el-table-column>
            <!-- 自定义表项 -->
            <el-table-column v-for="column in columnList" :key="column.prop">
                <!-- 自定义表头 -->
                <template #header>
                    <!-- 段落：show为true -->
                    <p v-show="column.show" @dblclick="column.show = false">
                        {{ column.label }}
                        <i class="el-icon-edit-outline" @click="column.show = false"></i>
                    </p>
                </template>

                <!-- 自定义表项/单元格内容 -->
                <template #default="scope">
                    <!-- 双击文字或点击修改图标以更改"show"属性 -->
                    <!-- scope.row为元数据，column.col为该列的'键' -->
                    <p v-show="scope.row[column.prop].show" 
                        @dblclick="scope.row[column.prop].show = false">
                        {{ scope.row[column.prop].content }}
                        <i class="el-icon-edit-outline" @click="scope.row[column.prop].show = false" />
                    </p>
                    <!-- 失去焦点时更改"show"属性，显示文本 -->
                    <el-input  v-show="!scope.row[column.prop].show"
                        :autosize="{ minRows: 2, maxRows: 4 }" 
                        v-model="scope.row[column.prop].content" 
                        @blur="scope.row[column.prop].show = true" 
                        @change="scope.row[column.prop].show = true" clearable />
                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<style></style>