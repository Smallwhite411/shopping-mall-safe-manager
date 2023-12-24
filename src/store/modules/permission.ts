import { defineStore } from "pinia"
import store from ".."
import { RouteRecordRaw } from "vue-router"
import asyncRouteSettings from "@/config/async-route"
import router, { asyncRoutes, constantRoutes } from "@/router"
import { ref } from "vue"

// 权限判断
const hasPermission = (roles: string[], route: RouteRecordRaw) => {
    console.log("权限", route.meta, route.meta?.roles)
    if (route.meta && route.meta.roles) {
        return roles.some((role) => { //确定指定的回调函数是否对数组的任何元素返回true。
            if (route.meta?.roles !== undefined) {
                // console.log("asgbhsah", route.meta.roles.includes(role))
                console.log("dsdsdsdsd",role,route.meta.roles)
                return route.meta.roles.includes(role)
            } else {
                return false
            }
        })
    } else {
        return true
    }
}


//  权限路由筛选
const filterAsyncRoutes = (routes: RouteRecordRaw[], roles: string[]) => {
    const res: RouteRecordRaw[] = []
    routes.forEach((route) => {
        console.log("dkabsfkbsak", route)
        const r = { ...route }
        if (hasPermission(roles, r)) {
            if (r.children) {
                r.children = filterAsyncRoutes(r.children, roles)
            }
            res.push(r)
        }
    })

    return res
}

export const usePermissionStore = defineStore("permisson", () => {
    const routes = ref<RouteRecordRaw[]>([]) //总路由
    const dynamicRoutes = ref<RouteRecordRaw[]>([]) //要添加的路由

    const setRoutes = (roles: string[]) => {
        console.log("dsdsdsdsd",roles)
        let accessedRoutes
        if (!asyncRouteSettings.open) {
            accessedRoutes = asyncRoutes
        } else {
            accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
        }
        routes.value = constantRoutes.concat(accessedRoutes)
        dynamicRoutes.value = accessedRoutes
        console.log("dynamicRoutes", dynamicRoutes.value, routes.value, router)
    }

    return {
        routes,
        dynamicRoutes,
        setRoutes
    }
})


/** 在 setup 外使用 */
export function usePermissionStoreHook() {
    return usePermissionStore(store)
}
