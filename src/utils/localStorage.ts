/** 统一处理 localStorage 
 *  拿到当前侧边栏的状态（展开或者收缩）
*/

import CacheKey from "@/constants/cacheKey"

export const getSidebarStatus = () => {
  return localStorage.getItem(CacheKey.SIDEBAR_STATUS)
}
export const setSidebarStatus = (sidebarStatus: "opened" | "closed") => {
  localStorage.setItem(CacheKey.SIDEBAR_STATUS, sidebarStatus)
}

