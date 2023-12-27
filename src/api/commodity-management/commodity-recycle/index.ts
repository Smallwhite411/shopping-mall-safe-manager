import { pagelistReq, pagelistRes } from "@/api/public.type"
import { request } from "@/utils/service"
import { recordsType, recoverReq } from "./index.type"

/***
 * @function getcommodityRecycleList 商品列表
 * @function commodityRecycleRecover 恢复
 * @function commodityRecycleDelete 删除
 */

export const getcommodityRecycleList: AxiosResponseI<pagelistReq, pagelistRes<recordsType>> = (data) => {
    return request({
        url: '/backstage/commodity-management/recycle/page',
        method: "post",
        data
    })
}
export const commodityRecycleRecover: AxiosResponseI<recoverReq, null> = (data) => {
    return request({
        url: '/backstage/commodity-management/recycle/recover',
        method: "post",
        data
    })
}
export const commodityRecycleDelete: AxiosResponseI<recoverReq, null> = (data) => {
    return request({
        url: '/backstage/commodity-management/recycle/delete',
        method: "post",
        data
    })
}