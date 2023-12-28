export interface recordsType {
    accountCode: string
    username: string
    isAdmin: boolean
    position: string
    phone: string
    email: string
    status: boolean
  }

  export interface deleteUserReq {
    accountCode: string
  }
  export interface updateStatuReq {
    accountCode: string
    status: boolean
  }
  export interface getUserDetailReq {
    username: string
    isAdmin: boolean
    position: string
    email: string
    phone: string
  }
  
  export interface updateUserReq {
    accountCode: string
    username: string
    isAdmin: boolean
    position: string
    email: string
    phone: string
  }
  export interface updatePasswordReq {
    accountCode: string
    oldPassword: string
    password: string
    confirmPassword: string
  }
  export interface addUserRes {
    username: string
    isAdmin: boolean
    position: string
    email: string
    password: string
    phone: string
  }
  export interface resetPasswordReq {
    accountCode: string
  }