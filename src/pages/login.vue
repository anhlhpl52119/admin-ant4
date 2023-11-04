<template>
  <div class="flex pt-240 flex-col items-center w-screen h-screen bg-auto bg-[url(./src/assets/svg/login.svg)]">
    <div class="flex items-center mb-3">
      <img src="~@/assets/img/logo-tai-co-colored.png" width="150">
    </div>
    <AForm
      layout="horizontal"
      class="w-400"
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
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { LockOutlined, SafetyOutlined, UserOutlined } from '@ant-design/icons-vue';

import { useRoute, useRouter } from 'vue-router';
import { Modal, message } from 'ant-design-vue';
import { useUserStore } from '@/stores/user.store';
import { DEFAULT_ROLE_ROUTE } from '@/constants/common.constant';

const state = reactive({
  loading: false,
  captcha: '',
  formInline: {
    email: 'banle0_manager@takeit.vn',
    password: '123123A@',
    refresh: true,
  },
});

const route = useRoute();
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
  router.replace((route.query.redirect as string) ?? DEFAULT_ROLE_ROUTE[userStore.getUserRole]);
};
</script>

<style lang="scss" scoped>
// :deep(.ant-form) {
//       width: 40rem;

//       .ant-col {
//         width: 100%;
//       }

//       .ant-form-item-label {
//         padding-right: 6rem;
//       }
//     }
</style>
