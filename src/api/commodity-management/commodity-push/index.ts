import { pagelistReq, pagelistRes } from "@/api/public.type"
import { request } from "@/utils/service"
import { pushRes, recordsType } from "./index.type"

/***
 * @function getcommodityManagementList 商品列表
 * @function commodityManagementPush 推送
 */

export const getcommodityManagementList: AxiosResponseI<pagelistReq, pagelistRes<recordsType>> = (data) => {
    return request({
        url: '/backstage/commodity-management/push/page',
        method: "post",
        data
    })
}
export const commodityManagementPush: AxiosResponseI<pushRes, null> = (data) => {
    return request({
        url: '/backstage/commodity-management/push',
        method: "post",
        data
    })
}
