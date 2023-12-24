/** 统一处理 Cookie */

import CacheKey from "@/constants/cacheKey"
import Cookies from "js-cookie"

export const getToken = () => {
  return Cookies.get(CacheKey.TOKEN)
}
export const setToken = (token: string) => {
  Cookies.set(CacheKey.TOKEN, token,{ expires: new Date(Date.now() + 10 * 60 * 1000) })
}
export const removeToken = () => {
  Cookies.remove(CacheKey.TOKEN)
}

export const getUsernameToken = (): any => { //读取cookie
  return Cookies.get(CacheKey.USERNAME)
}
export const setUsernameToken = (token: string) => { //写入cookie 设置10分钟自动清除cookie
  Cookies.set(CacheKey.USERNAME, token,{ expires: new Date(Date.now() + 10 * 60 * 1000) })
}
export const removeUsernameToken = () => { //移除cookie
  Cookies.remove(CacheKey.USERNAME)
}