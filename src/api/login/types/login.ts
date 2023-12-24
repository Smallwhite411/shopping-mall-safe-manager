export interface ILoginRequestData {
    /** admin 或 editor 两种身份 */
    username: "root" | "administrator" | "user"
    /** 密码 */
    password: string
  }
  
  export type LoginCodeResponseData = IApiResponseData<string>
  
  export type LoginResponseData = IApiResponseData<{ token: string, username: string, isLogin: boolean, message: string}>
  
  export type UserInfoResponseData = IApiResponseData<{ username: string; roles: string[] }>
  