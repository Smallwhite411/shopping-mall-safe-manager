import router from "@/router"
import { ElMessage } from 'element-plus'
import { whiteList } from "@/config/white-list"
import asyncRouteSettings from "@/config/async-route"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { getToken, getUsernameToken } from "@/utils/cookies"
import { useUserStoreHook } from "@/store/modules/user"
import { usePermissionStoreHook } from "@/store/modules/permission"

NProgress.configure({ showSpinner: false })
// nprogress 用于加载页面时显示进度条

router.beforeEach(async (to, _from, next) => {
  console.log("我执行了")
  NProgress.start()
  const userStore = useUserStoreHook()
  const permissionStore = usePermissionStoreHook()
  // 判断该用户是否登录
  if (to.path.includes('/register')) next()
  if (getToken() && getUsernameToken()) {
    // 每切换一次路由，就会执行一次
    if (to.path === "/login") {
      // 如果已经登录，并准备进入 Login 页面，则重定向到主页
      next({ path: "/" })
      NProgress.done()
    } else {

      // 检查用户是否已获得其权限角色
      if (userStore.roles.length === 0) {
        try {
          // 是否开启动态路由
          if (asyncRouteSettings.open) {
            // 注意：角色必须是一个数组！ 例如: ['admin'] 或 ['developer', 'editor']
            await userStore.getInfo(getUsernameToken() ? getUsernameToken() : userStore.username) //获取当前用户信息
            const roles = userStore.roles //拿到当前用户的身份
            console.log("roles", roles)
            // 根据角色生成可访问的 Routes（可访问路由 = 常驻路由 + 有访问权限的动态路由）
            permissionStore.setRoutes(roles)
          } else {
            // 没有开启动态路由功能，则启用默认角色
            userStore.setRoles(asyncRouteSettings.defaultRoles)
            permissionStore.setRoutes(asyncRouteSettings.defaultRoles)
          }
          // 将'有访问权限的动态路由' 添加到 Router 中
          // 添加了两个路由，一个是任意路由（404展示），一个是权限路由
          permissionStore.dynamicRoutes.forEach((route) => {
            router.addRoute(route)
          })
          // 确保添加路由已完成
          // 设置 replace: true, 因此导航将不会留下历史记录
          next({ ...to, replace: true })
        } catch (err: any) {
          // 过程中发生任何错误，都直接重置 Token，并重定向到登录页面
          userStore.resetToken()
          ElMessage.error(err.message || "路由守卫过程发生错误")
          next("/login")
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    // 如果没有 Token
    if (whiteList.indexOf(to.path) !== -1) {
      // 如果在免登录的白名单中，则直接进入
      next()
    } else {
      // 其他没有访问权限的页面将被重定向到登录页面
      next("/login")
      NProgress.done()
    }
  }
})

// 添加一个导航钩子，在每次导航后执行。返回一个删除已注册钩子的函数。
router.afterEach(() => {
  NProgress.done()
})
