import { request } from "@/utils/service"
import { registerReq } from "./index.type"


// 注册商户
export const registerAccout: AxiosResponseI<registerReq, null> = (data) => {
    return request({
        url: '/backstage/account-register',
        method: "post",
        data
    })
}