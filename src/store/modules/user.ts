import { getUserInfoApi, loginApi } from "@/api/login";
import store from "..";
import { getToken, getUsernameToken, removeToken, removeUsernameToken, setToken, setUsernameToken } from "@/utils/cookies";
import { defineStore } from "pinia";
import { Ref, ref } from "vue";
import { ILoginRequestData } from "@/api/login/types/login";
import asyncRouteSettings from "@/config/async-route";
import router, { resetRouter } from "@/router";
import { RouteRecordRaw } from "vue-router";
import { usePermissionStore } from "./permission";
import { ElMessage } from "element-plus";


export const useUserStore = defineStore("user", () => {
    const token = ref<string>(getToken() || "");//当前cookie
    const roles = ref<string[]>([]);//当前用户权限
    const username = ref<string>("");//当前用户的名称

    const permissionStore = usePermissionStore()

    /** 用来修改当前用户身份 */
    const setRoles = (value: string[]) => {
        roles.value = value
    }

    /** 登录 */
    const login = (loginData: ILoginRequestData) => {
        return new Promise((resolve, reject) => {
            loginApi({
                username: loginData.username,
                password: loginData.password,
            })
                .then((res) => {
                    console.log("askbjgjsa",res)
                    if (res.data.isLogin) {
                        ElMessage({
                            message: res.data.message,
                            type: "success",
                            center: true
                        })
                        // 朝cookie中存入 token
                        setToken(res.data.token)
                        token.value = res.data.token
                        username.value = res.data.username
                        setUsernameToken(username.value) //将当前用户名作为cookie存入
                        resolve(true)
                    } else {
                        ElMessage({
                            type: "error",
                            center: true,
                            message: res.data.message
                        })
                        resolve(true)
                        
                    }
                   
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    /** 获取用户详情 */
    const getInfo = (name: string) => {
        return new Promise((resolve, reject) => {
            getUserInfoApi(name)
                .then((res) => {
                console.log("paramsa",name)

                    // 服务端返回的用户详情中只有 username和 roles
                    const data = res.data
                    username.value = data.username
                    // 验证返回的 roles 是否是一个非空数组
                    if (data.roles && data.roles.length > 0) {
                        roles.value = data.roles
                    } else {
                        // 塞入一个没有任何作用的默认角色，不然路由守卫逻辑会无限循环
                        roles.value = asyncRouteSettings.defaultRoles
                    }
                    resolve(res)
                })
                .catch((error) => {
                    reject(error)
                })
        })
    }

    /** 切换角色(只能从 administrator/user 中切换 root用户只有一个) */
    const changeRoles = async (role: string) => {
        const newToken = "token-" + role
        token.value = newToken
        setToken(newToken)
        await getInfo(username.value)
        console.log("我开始切换了",role)
        setRoles([role])
        permissionStore.setRoutes([role])
        resetRouter()
        // 不同的用户权限 添加不同的路由信息
        // 但在一开始登陆的时候没有调用，只有当切换用户的时候才调用了
        permissionStore.dynamicRoutes.forEach((item: RouteRecordRaw) => {
            router.addRoute(item)
        })
    }

    /** 登出 */
    const logout = () => {
        removeToken()
        removeUsernameToken()
        username.value = "";
        token.value = ""
        roles.value = []
        resetRouter()
    }
    /** 重置 Token */
    const resetToken = () => {
        removeToken()
        token.value = ""
        roles.value = []
    }

    return {
        roles,
        token,
        username,
        setRoles,
        login,
        getInfo,
        changeRoles,
        logout,
        resetToken
    }
})

/** 在 setup 外使用 */
export function useUserStoreHook() {
    return useUserStore(store)
}