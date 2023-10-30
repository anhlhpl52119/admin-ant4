<template>
  <div>
    <form
      class="form-box"
      :class="{ shake: classState.formShake }"
      novalidate
      @submit.prevent="handleSubmit"
    >
      <!-- <img src="@/assets/picture/cx-logo.png" alt="Son-nguyen-logo"> -->
      <div class="inputBox">
        <input v-model="formState.email" type="text" required>
        <span>User name</span>
      </div>
      <div class="inputBox">
        <input v-model="formState.password" type="password" required>
        <span>Password</span>
      </div>
      <div class="link">
        <a href="#">Forgot Password</a>
      </div>
      <AButton
        htmlType="submit"
        size="large"
        :loading="loadingState.loginButton"
        block
        style="color: wheat; height: 60px"
      >
        <u>Đăng Nhập</u>
      </AButton>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/stores/user.store';
import { DEFAULT_ROUTE_PATH } from '@/constants/common.constant';

// import { useUserAuth } from '@/stores/auth';

const formState = reactive<API.LoginRequestBody>({
  email: 'banle0_manager@takeit.vn',
  password: '123123A@',
  refresh: true,
  // email: 'admin@takeit.vn',
  // password: '123123A@',
  // refresh: true,
});
// const { loginReturnToken } = useUserAuth();
const router = useRouter();
const userStore = useUserStore();
const loadingState = reactive({
  loginButton: false,
});
const classState = reactive({
  formShake: false,
});

const handleSubmit = async () => {
  if (formState.email.trim() === '' || formState.password.trim() === '') {
    return message.warning({
      content: () => 'Tên đăng nhập và mật khẩu không được để trống',
    });
  }
  try {
    loadingState.loginButton = true;
    message.loading({
      content: () => 'Đang đăng nhập',
      duration: 0,
      key: 1,
    });
    await userStore.login(formState);
    // router.replace('/');
    router.replace(DEFAULT_ROUTE_PATH);
  }
  catch (error) {
    classState.formShake = true;

    return Promise.reject(error);
  }
  finally {
    loadingState.loginButton = false;
    setTimeout(() => {
      classState.formShake = false;
    }, 820);
  }
};
</script>

<style scoped lang="css">
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.form-box {
  position: absolute;
  border-radius: 10px;
  z-index: 2;
  width: 60%;
  display: flex;
  flex-direction: column;
  font-family: 'poppins', sans-serif;
  margin: 10px 0;
}

.form-box h2 {
  color: beige;
  text-decoration: underline;
  text-align: center;
  margin: 0;
}

.form-box img {
  align-self: center;
  width: 250px;
}

.form-box .inputBox {
  position: relative;
  width: 100%;
  margin-top: 20px;
}

.form-box .inputBox input {
  position: relative;
  width: 100%;
  padding: 15px 24px;
  border-radius: 10px;
  font-size: 1.2em;
  border: 1px solid darkgray;
  transition: 0.3s;

  &:focus {
    outline: none !important;
    border: 1px solid blanchedalmond;
    box-shadow: 3px 3px 2px 0 #2e5f90;
  }
}

.form-box .inputBox span {
  position: absolute;
  left: 20px;
  top: 15px;
  padding: 0 5px;
  pointer-events: none;
  color: #7a7a7a;
  font-size: 1.2em;
  transition: 0.3s;
  font-weight: bold;
}

.form-box .inputBox input:valid ~ span,
.form-box .inputBox input:-webkit-autofill ~ span,
.form-box .inputBox input:focus ~ span {
  color: rgb(36, 119, 157);
  font-size: 1.2em;
  transform: translateY(-35px);
  z-index: 50;
}

@media only screen and (max-width: 800px) {
  .form-box {
    width: 90%;
  }
}
</style>
