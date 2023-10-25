<template>
  <main class="bg-abd flex-center">
    <div class="w400 h400 flex flex-col gap-10" @keydown.enter="submit">
      <FieldTitle title="Email" required>
        <CInput
          v-model:value="formState.email"
          acceptedOnly="userLogin"
          :maxlength="60"
        />
      </FieldTitle>

      <FieldTitle title="Password" required>
        <CInput v-model:value="formState.password" />
      </FieldTitle>
      <ACheckbox v-model:value="formState.refresh">
        Remember me
      </ACheckbox>
      <AButton
        size="large"
        type="primary"
        block
        :loading="isLoading"
        :disabled="isDisabledLogin"
        @click="submit"
      >
        Đăng Nhập
      </AButton>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user.store';
import { DEFAULT_ROUTE_PATH } from '@/constants/common.constant';

const router = useRouter();
const userStore = useUserStore();
const isLoading = ref<boolean>(false);

// TODO: remove hard code
const formState = reactive<API.LoginRequestBody>({
  email: 'banle0@gmail.com',
  password: '852007',
  refresh: true,
  // email: 'admin@takeit.vn',
  // password: '123123A@',
  // refresh: true,
});

const isDisabledLogin = computed(
  () => formState.email.length === 0 && formState.password.length < 8,
);

const submit = async () => {
  if (isDisabledLogin.value) {
    return;
  }
  try {
    isLoading.value = true;
    await userStore.login(formState);
    router.replace(DEFAULT_ROUTE_PATH);
  }
  finally {
    isLoading.value = false;
  }
};
</script>
