import { request } from "@/utils/service"
import { pagelistReq, pagelistRes } from "../public.type"
import { delteleAccountReq, recordsType } from "./index.type"
/**
 * 
 * @function accountPage 商户用户列表
 * @function delteleAccount 删除用户 
 */
// 

export const accountPage: AxiosResponseI<pagelistReq, pagelistRes<recordsType>> = (data) => {
    return request({
        url: '/backstage/merchant-management/page',
        method: "post",
        data
    })
}
export const delteleAccount: AxiosResponseI<delteleAccountReq, null> = (data) => {
    return request({
        url: '/backstage/merchant-management/delete',
        method: "post",
        data
    })
}