<script lang="ts" setup>
import { type PropType, computed } from "vue"
import { type RouteRecordRaw } from "vue-router"
import SidebarItemLink from "./SidebarItemLink.vue"
import { isExternal } from "@/utils/validate"
import path from "path-browserify"

/**
 * item属性是当前正在呈现的路由记录对象，它描述了该项的所有内容，例如路径、名称、图标等。
 *
 * isCollapse属性用于确定侧边栏当前是否已折叠。当侧边栏折叠时，只显示图标，而不显示文字。
 *
 * isFirstLevel属性用于确定要呈现的项是否位于根级别。如果是，则显示完整的菜单项，否则只显示子菜单项。
 *
 * basePath属性用于指定菜单中所有项的基本路径。这很重要，因为当我们在应用程序中更改路由时，可能需要更改菜单中的所有链接。
 */

const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  },
  isCollapse: {
    type: Boolean,
    default: false
  },
  isFirstLevel: {
    type: Boolean,
    default: true
  },
  basePath: {
    type: String,
    default: ""
  }
})

// 始终显示根菜单
const alwaysShowRootMenu = computed(() => {
  return props.item.meta && props.item.meta.alwaysShow
})

// 显示子组件编号
const showingChildNumber = computed(() => {
  if (props.item.children) {
    const showingChildren = props.item.children.filter((item) => {
      return !(item.meta && item.meta.hidden)
    })
    return showingChildren.length
  }
  return 0
})

// 只有一个子组件的时候
const theOnlyOneChild = computed(() => {
  if (showingChildNumber.value > 1) {
    return null
  }
  if (props.item.children) {
    for (const child of props.item.children) {
      if (!child.meta || !child.meta.hidden) {
        return child
      }
    }
  }
  // 如果没有子组件，就把它自己移除，
  // 因为这个。basePath已经包含了item的路径信息
  return { ...props.item, path: "" }
})

// 解决路径
const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return path.resolve(props.basePath, routePath)
}
</script>

<template>
  <!-- 这里的hidden 应该是将侧边栏收缩和开放的 -->
  <div v-if="!props.item.meta?.hidden" :class="{ 'simple-mode': props.isCollapse, 'first-level': props.isFirstLevel }">
    <template v-if="!alwaysShowRootMenu && theOnlyOneChild && !theOnlyOneChild.children">
      <!-- 侧边栏的名称？ -->
      <SidebarItemLink v-if="theOnlyOneChild.meta" :to="resolvePath(theOnlyOneChild.path)">
        <el-menu-item :index="resolvePath(theOnlyOneChild.path)">
          <svg-icon v-if="theOnlyOneChild.meta.svgIcon" :name="theOnlyOneChild.meta.svgIcon" />
          <component v-else-if="theOnlyOneChild.meta.elIcon" :is="theOnlyOneChild.meta.elIcon" class="el-icon" />
          <template v-if="theOnlyOneChild.meta.title" #title>
            {{ theOnlyOneChild.meta.title }}
          </template>
        </el-menu-item>
      </SidebarItemLink>
    </template>
    <el-sub-menu v-else :index="resolvePath(props.item.path)" teleported>
      <!-- 遍历侧边栏列表的名字 -->
      <template #title>
        <svg-icon v-if="props.item.meta && props.item.meta.svgIcon" :name="props.item.meta.svgIcon" />
        <component v-else-if="props.item.meta && props.item.meta.elIcon" :is="props.item.meta.elIcon" class="el-icon" />
        <span v-if="props.item.meta && props.item.meta.title">{{ props.item.meta.title }}</span>
      </template>
      <!-- v-for 遍历子组件 这个组件还是SidebarItem 递归-->
      <template v-if="props.item.children">
        <!-- 每个路由的path都是唯一的，所以拿这个当成key很合适 -->
        <sidebar-item
          v-for="child in props.item.children"
          :key="child.path"
          :item="child"
          :is-collapse="props.isCollapse"
          :is-first-level="false"
          :base-path="resolvePath(child.path)"
        />
      </template>
    </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped>
.svg-icon {
  min-width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.el-icon {
  width: 1em;
  margin-right: 12px;
  font-size: 18px;
}

.simple-mode {
  &.first-level {
    :deep(.el-sub-menu) {
      .el-sub-menu__icon-arrow {
        display: none;
      }
      span {
        visibility: hidden;
      }
    }
  }
}
</style>
