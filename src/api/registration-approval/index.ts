import { request } from "@/utils/service"
import { pagelistReq, pagelistRes } from "../public.type"
import { recordsType } from "./index.type"


// 获取注册审批列表
export const getRegisterAccount: AxiosResponseI<pagelistReq, pagelistRes<recordsType>> = (data) => {
    return request({
        url: '/backstage/getAccountRegisterApprove',
        method: "post",
        data
    })
}