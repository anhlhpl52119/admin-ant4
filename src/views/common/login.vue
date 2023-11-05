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
            <AInput v-model:value="state.formInline.email" size="large" placeholder="rootadmin">
              <template #prefix>
                <UserOutlined type="user" />
              </template>
            </AInput>
          </AFormItem>
          <AFormItem>
            <AInput
              v-model:value="state.formInline.password"
              size="large"
              type="password"
              placeholder="123456"
              autocomplete="new-password"
            >
              <template #prefix>
                <LockOutlined type="user" />
              </template>
            </AInput>
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

const state = reactive({
  loading: false,
  captcha: '',
  formInline: {
    // email: 'banle0_manager@takeit.vn',
    email: 'admin@takeit.vn',

    password: '123123A@',
    refresh: true,
  },
});

const router = useRouter();
const userStore = useUserStore();

const handleSubmit = async () => {
  const { email, password } = state.formInline;
  if (email.trim() === '' || password.trim() === '') {
    message.warning('Tên đăng nhập và mật khẩu không được để trống！');
    return;
  }
  await userStore.login(state.formInline);
  if (!userStore.getUserRole) {
    return;
  }
  router.replace({ path: '/' });
};
</script>

<style lang="scss" scoped>
.teeee {
  // @apply bg-[url(../src/assets/svg/login.svg)]
  @apply bg-gradient-to-r from-cyan-500 to-blue-500
}
</style>
