export const isExternal = (path: string) => {
  const reg = /^(https?:|mailto:|tel:)/
  return reg.test(path)
}

export const isArray = (arg: any) => {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(arg) === "[object Array]"
  }
  return Array.isArray(arg)
}

export function isString(str: any) {
  if (typeof str === "string" || str instanceof String) {
    return true
  }
  return false
}

export const isValidURL = (url: string) => {
  const reg =
    /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

export function validateValue(value: any, callback: any, regex: any, validInfo: string) {
  if (value === '') {
    callback(new Error('请输入'))
  } else {
    if (!regex.test(value)) {
      callback(new Error(validInfo))
    } else {
      callback()
    }
  }
}

// 发送验证码倒计时
export const clearCodeFn = (num: number) => {
  const codeNum = ref(0)
  let clearCode: any
  const calcodeNum = () => {
    codeNum.value = num
    clearCode = setInterval(() => {
      codeNum.value--
      if (codeNum.value === 0) {
        clearInterval(clearCode)
      }
    }, 1000)
  }
  const clearCodeNum = () => {
    clearInterval(clearCode)
    codeNum.value = 0
  }
  return { codeNum, calcodeNum, clearCodeNum }
}
