<template>
  <div class="register-container">
    <p class="title">中小型网上商城商户注册审核中...</p>
    <el-image :src="url" />
    <div class="register-success">
      <p class="desc">
        您好！感谢您注册成为中小型网上商城的商户，待我司验证通过后将于账户密码发送至您的邮箱，请耐心等待，谢谢。
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import successImg from "@/assets/register/success.png";
const url = ref(successImg);
const router = useRouter();
const goClient = () => {
  router.push({ path: "/login" });
};
</script>

<style lang="scss" scoped>
.register-container {
  width: 864px;
  background-color: #fff;
  margin: 0 auto;
  margin-top: -20px;
  padding: 50px 80px 120px 80px;
  position: relative;
  text-align: center;
  p {
    margin: 0;
    padding: 0;
  }
  p.title {
    font-size: 28px;
    font-weight: 600;
    color: #333333;
    line-height: 40px;
    margin-bottom: 90px;
  }
  .el-image {
    width: 296px;
    margin-bottom: 47px;
  }
  .register-success {
    width: 446px;
    margin-left: calc(50% - 223px);
    text-align: left;
    p.desc {
      height: 56px;
      font-size: 16px;
      font-weight: 600;
      color: #333333;
      line-height: 28px;
      margin-bottom: 20px;
    }
    .account-info {
      width: 384px;
      background: #fdfdfd;
      border-radius: 4px;
      border: 1px solid #e4eaee;
      padding: 16px 30px 18px 32px;
      margin-bottom: 50px;
      p {
        font-size: 16px;
        font-weight: 400;
        color: #333333;
        line-height: 22px;
        margin-bottom: 20px;
      }
      p:last-child {
        margin: 0;
      }
    }
    .el-button {
      width: 446px;
      height: 46px;
      background: #3576c1;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
:deep(.tooltip) {
  display: inline-block;
  width: 60%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
</style>
