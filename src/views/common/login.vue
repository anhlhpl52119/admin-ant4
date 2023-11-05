<template>
  <div class="flex pt-240 flex-col items-center w-screen h-screen teeee bg-no-repeat bg-cover">
    <div class="card bg-white p-20 grid-center">
      <div class="flex items-center mb-30">
        <img src="~@/assets/img/logo-tai-co-vertical-text.png" width="280">
      </div>
      <div class="w-400">
        <AForm
          layout="horizontal"
          :model="state.formInline"
          @submit.prevent="handleSubmit"
        >
          <AFormItem>
            <CInput
              v-model:value="state.formInline.email"
              size="large"
              noSpace
              inputCase="lower"
              :maxlength="50"
              placeholder="Email"
            >
              <template #prefix>
                <UserOutlined type="user" />
              </template>
            </CInput>
          </AFormItem>
          <AFormItem>
            <CInput
              v-model:value="state.formInline.password"
              size="large"
              type="password"
              placeholder="Mật khẩu"
              :maxlength="36"
              autocomplete="new-password"
            >
              <template #prefix>
                <LockOutlined type="user" />
              </template>
            </CInput>
          </AFormItem>
          <AFormItem>
            <AButton type="primary" htmlType="submit" size="large" :loading="state.loading" block>
              Đăng nhập
            </AButton>
          </AFormItem>
        </AForm>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';

import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';
import { useUserStore } from '@/stores/user.store';
import { MORE_THAN_ONE_EMAIL_SIGN } from '@/constants/regex.constant';

const state = reactive({
  loading: false,
  captcha: '',
  formInline: {
    email: 'banle0_manager@takeit.vn',
    // email: 'admin@takeit.vn',

    password: '123123A@',
    refresh: true,
  },
});

const router = useRouter();
const userStore = useUserStore();

const validation = async () => {
  if (MORE_THAN_ONE_EMAIL_SIGN.test(state.formInline.email)) {
    await showAsyncAlert({ content: 'Email đăng nhập không đúng', severity: 'error' });
    return false;
  }
  if (state.formInline.password.length > 36 || state.formInline.password.length < 4) {
    await showAsyncAlert({ content: 'Sai mật khẩu', severity: 'error' });
    return false;
  }
  return true;
};

const handleSubmit = async () => {
  const { email, password } = state.formInline;
  if (email.trim() === '' || password.trim() === '') {
    message.warning('Tên đăng nhập và mật khẩu không được để trống！');
    return;
  }
  if (!await validation()) { return; }
  await userStore.login(state.formInline);
  if (!userStore.getUserRole) {
    return;
  }
  router.replace({ path: '/' });
};
</script>

<style lang="scss" scoped>
.teeee {
  @apply bg-gradient-to-r from-cyan-500 to-blue-500
}
</style>
