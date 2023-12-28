<template>
  <div class="register-container">
    <p class="title">中小型网上商城店铺注册信息填写</p>
    <p class="desc">
      您好！感谢您注册成为中小型网上商城的商户，请您先完成信息编辑，大约花费您1～2分钟填写。
    </p>
    <el-form
      ref="registerFormRef"
      :model="registerForm"
      :rules="rules"
      label-width="100%"
      class="register-form"
      status-icon
    >
      <p class="desc">店铺信息:</p>
      <el-form-item label="1.店铺名称" prop="shopName">
        <el-input
          v-model.trim="registerForm.shopName"
          maxlength="50"
          placeholder="请输入店铺名称"
        />
      </el-form-item>
      <el-form-item label="1.责任人" prop="chargePerson">
        <el-input
          v-model.trim="registerForm.chargePerson"
          maxlength="50"
          placeholder="请输入店铺名称"
        />
      </el-form-item>
      <el-form-item label="2.店铺所在地：" prop="shopLocation">
        <el-input
          v-model.trim="registerForm.shopLocation"
          maxlength="50"
          placeholder="请输入店铺所在地"
        />
      </el-form-item>
      <el-form-item label="3.证照信息：" prop="licenseInformation">
        <el-input
          v-model.trim="registerForm.licenseInformation"
          maxlength="50"
          placeholder="请上传证照信息"
        />
      </el-form-item>
      <el-form-item label="4.店铺简介：" prop="shopSynopsis">
        <el-input
          v-model.trim="registerForm.shopSynopsis"
          maxlength="50"
          placeholder="请输入店铺简介"
        />
      </el-form-item>
      <el-form-item label="5.联系邮箱：" prop="email" class="email">
        <el-input
          v-model.trim="registerForm.email"
          maxlength="50"
          placeholder="请输入联系邮箱"
        >
        </el-input>
      </el-form-item>
      <el-form-item label="6.手机号：" prop="phone">
        <el-input
          v-model.trim="registerForm.phone"
          placeholder="请输入手机号(11位手机号)"
          maxlength="50"
        />
      </el-form-item>
    </el-form>
    <div class="register-bottom">
      <el-button v-throttle="{ event: 'click', fn: submit, delay: 500 }"
        >注册</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, type FormRules } from "element-plus";
import { validateValue, clearCodeFn } from "@/utils/validate";
import { useUserStore } from "@/store/modules/user";
import { registerAccout } from "@/api/register";
const useStore = useUserStore();

const registerForm = ref({
  shopName: "",
  chargePerson: "",
  shopLocation: "",
  licenseInformation: "",
  shopSynopsis: "",
  email: "",
  phone: "",
});
const validateEmail = (rule: any, value: any, callback: any) => {
  if (value !== "") {
    const regex = /^[a-zA-Z0-9_]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
    validateValue(value, callback, regex, "请输入正确格式的邮箱");
  } else {
    callback();
  }
};
const validatePhone = (rule: any, value: any, callback: any) => {
  const regex = /^1[3-9]\d{9}$/;
  if (value !== "") {
    validateValue(value, callback, regex, "请输入正确格式的手机号");
  } else {
    callback();
  }
};
const rules = reactive<FormRules<any>>({
  shopName: [{ required: true, trigger: "blur", message: "请输入店铺名称" }],
  shopLocation: [
    { required: true, trigger: "change", message: "请输入店铺所在地" },
  ],
  shopSynopsis: [
    { required: true, trigger: "blur", message: "请输入店铺简介" },
  ],
  email: [
    { required: true, trigger: "blur", message: "请输入联系邮箱" },
    {
      validator: validateEmail,
      trigger: "blur",
      message: "请输入正确格式的邮箱",
    },
  ],
  phone: [
    { required: true, trigger: "blur", message: "请输入" },
    {
      validator: validatePhone,
      trigger: "blur",
      message: "请输入正确格式的手机号",
    },
  ],
});
// 公司性质
const natureList = ref();
const getNature = async () => {};
onMounted(() => {
  getNature();
});

const registerFormRef = ref();
const { calcodeNum, codeNum, clearCodeNum } = clearCodeFn(60);
// 发送验证码
const sendCode = async () => {};

const router = useRouter();
const submit = async () => {
  console.log(registerForm.value);
  await registerFormRef.value.validate((valid: any) => {
    if (valid) {
      registerAccout(registerForm.value).then((res) => {
        // const registerInfo = {
        //   enterpriseName: registerForm.value.enterpriseName,
        //   loginAddress: res.data?.loginAddress,
        //   merchantAccount: res.data?.merchantAccount,
        //   initPassword: res.data?.initPassword,
        // };
        // useStore.setRecordUserInfo(registerInfo);
        clearCodeNum();
        // router.push({
        //   path: "/register/success",
        // });
      });
    }
  });
};
onUnmounted(() => {
  clearCodeNum();
});
</script>

<style lang="scss" scoped>
.register-container {
  width: 864px;
  background-color: #fff;
  margin: 0 auto;
  margin-top: -20px;
  padding: 52px 80px 0px 80px;
  position: relative;
  p {
    margin: 0;
    padding: 0;
  }
  p.title {
    font-size: 28px;
    font-weight: 600;
    color: #333333;
    line-height: 40px;
    margin-bottom: 40px;
  }
  p.desc {
    font-size: 16px;
    font-weight: 600;
    color: #666666;
    margin-bottom: 10px;
  }
  .el-form {
    margin-top: 50px;
    .el-form-item {
      display: block;
      height: 68px;
      :deep(.el-form-item__label) {
        justify-content: start;
        font-size: 16px;
        font-weight: 500;
        color: #333;
      }
      :deep(.el-form-item__content) {
        .el-input,
        .el-select {
          width: 100%;
          height: 36px;
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #e4eaee;
          .el-input__wrapper {
            box-shadow: none;
          }
        }
        .el-select {
          width: 100%;
          border: none;
        }
      }
    }
  }
  .register-bottom {
    width: calc(100% + 160px);
    margin-left: -80px;
    height: 115px;
    line-height: 115px;
    background: #ffffff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.23);
    text-align: center;
    padding: 20px 0 15px 0;
    .el-button {
      width: 446px;
      height: 46px;
      background: #3576c1;
      border-radius: 4px;
      font-size: 20px;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>
