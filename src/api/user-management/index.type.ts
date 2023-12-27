export interface recordsType {
    commodityName: string
    commodityDes: string
    commodityFileId: string
    commodityFileName: string
    commodityCode: string
    releaseTime: string
    isGrounding: boolean
}

export interface deleteReq {
    commodityCode: string
}

export interface addReq {
    commodityName: string
    commodityDes: string
    commodityFileId: string
    commodityFileName: string
}

export interface updateReq {
    commodityCode: string
    isGrounding: boolean
}