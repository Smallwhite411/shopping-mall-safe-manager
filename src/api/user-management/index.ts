import { request } from "@/utils/service"
import { pagelistReq, pagelistRes } from "../public.type"
import { addUserRes, deleteUserReq, getUserDetailReq, recordsType, resetPasswordReq, updatePasswordReq, updateStatuReq, updateUserReq } from "./index.type"
import { delteleAccountReq } from "../account-management/index.type"


/**
 * @function pagelist 列表
 * @function getUserDetail 用户详情
 * @function addUser 添加用户 
 * @function deleteUser 删除用户
 * @function updateUser 编辑用户
 * @function updatePassword 修改密码
 * @function resetPassword 重置密码
 * @function updateStatu 更新状态
 */

export const pagelist: AxiosResponseI<pagelistReq, pagelistRes<recordsType>> = (data) => {
    return request({
        url: '/backstage/user-management/page',
        method: "post",
        data
    })
}
export const getUserDetail: AxiosResponseI<deleteUserReq, getUserDetailReq> = (data) => {
    return request({
        url: '/backstage/user-management/detail',
        method: "post",
        data
    })
}
export const addUser: AxiosResponseI<addUserRes, null> = (data) => {
    return request({
        url: '/backstage/user-management/add',
        method: "post",
        data
    })
}
export const deleteUser: AxiosResponseI<deleteUserReq, null> = (data) => {
    return request({
        url: '/backstage/user-management/delete',
        method: "post",
        data
    })
}
export const updateUser: AxiosResponseI<updateUserReq, null> = (data) => {
    return request({
        url: '/backstage/user-management/update',
        method: "post",
        data
    })
}
export const updatePassword: AxiosResponseI<updatePasswordReq, null> = (data) => {
    return request({
        url: '/backstage/user-management/updatePassword',
        method: "post",
        data
    })
}
export const resetPassword: AxiosResponseI<resetPasswordReq, null> = (data) => {
    return request({
        url: '/backstage/user-management/resetPassword',
        method: "post",
        data
    })
}
export const updateStatu: AxiosResponseI<updateStatuReq, null> = (data) => {
    return request({
        url: '/backstage/user-management/updateStatus',
        method: "post",
        data
    })
}