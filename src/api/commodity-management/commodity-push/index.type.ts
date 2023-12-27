export interface recordsType {
    commodityName: string
    commodityDes: string
    commodityFileId: string
    commodityFileName: string
    labelList: Array<string>
    commodityCode: string
    pushTime: string
  }
  export interface pushRes {
    commodityCode: string
    labelList: Array<string>
  }