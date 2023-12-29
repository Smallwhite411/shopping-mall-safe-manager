import { request } from "@/utils/service"
import { pagelistReq, pagelistRes } from "../public.type"
import { recordsType, totalRes, updateReq } from "./index.type"


// 获取注册审批列表
export const getRegisterAccount: AxiosResponseI<pagelistReq, pagelistRes<recordsType>> = (data) => {
    return request({
        url: '/backstage/getAccountRegisterApprove',
        method: "post",
        data
    })
}

// 更新注册商户状态
export const updateManagementStatus: AxiosResponseI<updateReq, null> = (data) => {
    return request({
        url: '/backstage/approval-management/updateStatus',
        method: "post",
        data
    })
}

/** 获取审批数量 */
export const getTotal: AxiosResponseI<null, totalRes> = () => {
    return request({
        url: "/backstage/approval-management/getTotal",
        method: "get"
    })
}
