import { request } from "@/utils/service"
import { pagelistReq, pagelistRes } from "../public.type"
import { addReq, deleteReq, recordsType, updateReq } from "./index.type"
/***
 * @function getcommodityWarehouseList 商品列表
 * @function commodityWarehouseDelete 删除
 * @function commodityWarehouseAdd 发布商品
 * @function commodityWarehouseUpdate 上架/下架
 */
export const getcommodityWarehouseList: AxiosResponseI<pagelistReq, pagelistRes<recordsType>> = (data) => {
    return request({
        url: '/backstage/commodity-management/warehouse/page',
        method: "post",
        data
    })
}

export const commodityWarehouseDelete: AxiosResponseI<deleteReq, null> = (data) => {
    return request({
        url: "/backstage/commodity-management/warehouse/delete",
        method: "post",
        data
    })
}
export const commodityWarehouseAdd: AxiosResponseI<addReq, null> = (data) => {
    return request({
        url: "/backstage/commodity-management/warehouse/add",
        method: "post",
        data
    })
}
export const commodityWarehouseUpdate: AxiosResponseI<updateReq, null> = (data) => {
    return request({
        url: "/backstage/commodity-management/warehouse/update",
        method: "post",
        data
    })
}