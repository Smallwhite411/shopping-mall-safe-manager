export interface pagelistReq {
    filterContent: Array<filterContentType>
    pageSize: number
    pageNo: number
    sortField: {
        fieldName: string
        sortModel: string
    }
}
export interface filterContentType {
    id: string
    conditiondID: string
    valueData: string | Array<string>
}

export interface pagelistRes<T> {
    tableId: string
    records: Array<T>
    total: number
}

export interface getImgReq {
    id: string
}
export interface getImgRes {
    file: string
}