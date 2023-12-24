import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

const Layout = () => import("@/layout/index.vue")

// 常规路由
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: {
      hidden: true
    },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/403",
    component: () => import("@/views/error-page/403.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard", //重定向到首页
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: {
          title: "首页",
          svgIcon: "dashboard",
          affix: true
        }
      }
    ]
  }
]

/**
 * 动态路由
 */

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/table",
    component: Layout,
    redirect: "/table/element-plus",
    name: "Table",
    meta: {
      title: "表格",
      elIcon: "Grid",
      roles: ["root", "administrator", "user"],
      alwaysShow: true // 将始终显示根菜单

    },
    children: [
      {
        path: "element-plus",
        component: () => import("@/views/table/index.vue"),
        name: "ElementPlus",
        meta: {
          title: "信息修改",
          roles: ["root", "administrator"]
        }
      },
      {
        path: "personal-information",
        component: () => import("@/views/convention/index.vue"),
        name: "personalInformation",
        meta: {
          title: "常规页面",

        }
      }
    ]
  },
  {
    path: "/permission",
    component: Layout,
    redirect: "/permission/page",
    name: "Permission",
    meta: {
      title: "权限管理",
      svgIcon: "lock",
      roles: ["root", "administrator", "user"], // 可以在根路由中设置角色
      alwaysShow: true // 将始终显示根菜单
    },
    children: [
      {
        path: "page",
        component: () => import("@/views/permission/page/index.vue"),
        name: "PagePermission",
        meta: {
          title: "页面权限",
          roles: ["root", "administrator"]
          // 或者在子导航中设置角色 只有admin用户才能看见和使用这个路由
        }
      },
      {
        path: "directive",
        component: () => import("@/views/permission/directive/index.vue"),
        name: "DirectivePermission",
        meta: {
          title: "指令权限" // 如果未设置角色，则表示：该页面不需要权限，但会继承根路由的角色
        }
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*", // Must put the 'ErrorPage' route at the end, 必须将 'ErrorPage' 路由放在最后
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      hidden: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_PUBLIC_PATH), //只使用history  上线后的刷新问题交给node 配置
  routes: constantRoutes
})

/** 重置路由 */
export function resetRouter() {
  // 注意：所有动态路由路由必须带有 Name 属性，否则可能会不能完全重置干净
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      // 当路由的name和用户身份同时存在时
      if (name && meta.roles?.length) { //
        // router.hasRoute  检查给定名称的路由是否存在
        // router.removeRoute 根据路由名删除现有路由。
        console.log("需要删除的路由有",route,router.hasRoute(name))
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    // 强制刷新浏览器也行，只是交互体验不是很好
    window.location.reload()
  }
}


export default router