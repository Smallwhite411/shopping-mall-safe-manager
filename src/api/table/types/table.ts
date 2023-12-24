export interface CreateTableRequestData {
    username: string
    password: string
  }
  
  export interface UpdateTableRequestData {
    id: string
    username: string
    password?: string
  }
  
  export interface GetTableRequestData {
    /** 当前页码 */
    currentPage: number
    /** 查询条数 */
    size: number
    /** 查询参数：用户名 */
    username?: string
  }
  
  export interface GetTableData {
    createTime: string
    _id: string
    roles: string
    status: boolean
    username: string
  }
  
  export type GetTableResponseData = IApiResponseData<{
    list: GetTableData[]
    total: number
  }>
  