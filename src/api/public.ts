import { request } from "@/utils/service"
import { getImgReq, getImgRes } from "./public.type"

// 上传图片
export const uploadFile: AxiosResponseI<any, any> = (data) => {
    return request({
        url: '/file/upload',
        method: "post",
        headers: {
            'Content-type': 'multipart/form-data'
        },
        data
    })
}

// 获取图片
export const getImg: AxiosResponseI<getImgReq, getImgRes> = (data: any) => {
    return request({
        url: `/file/preview/getImgBase64/` + data.id,
        method: "get",
    })
}
