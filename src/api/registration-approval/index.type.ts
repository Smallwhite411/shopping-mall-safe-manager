export interface recordsType {
    // accountNumber: string,
    shopName: string,
    chargePerson: string,
    licenseInformation: string,
    shopLocation: string,
    phone: string,
    email: string,
    // password: string,
}

export interface pagelistReq {
    filterContent: Array<filterContentType>
    pageSize: number
    pageNo: number
    sortField: {
        fieldName: string
        sortModel: string
    }
    isHandle: boolean | string //true 是已处理 false 是未处理
}
export interface filterContentType {
    id: string
    conditiondID: string
    valueData: string | Array<string>
}
