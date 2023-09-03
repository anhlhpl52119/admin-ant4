<template>
  <main class="bg-abd flex-center">
    <div class="w400 h400 flex flex-col gap-10">
      <CInput
        v-model:value="formState.email"
        label="Email"
        label-placement="top"
        :maxlength="30"
        :prevent-key="[' ']"
      />
      <AInputPassword v-model:value="formState.password" />
      <AButton
        size="large"
        type="primary"
        block
        :loading="isLoading"
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
const formState = reactive({
  email: 'nhattruong0000@gmail.com',
  password: '123123A@',
});

const submit = async () => {
  try {
    isLoading.value = true;
    await userStore.login(formState);
    router.replace(DEFAULT_ROUTE_PATH);
  }
  catch (error) {
    return Promise.reject(error);
  }
  finally {
    isLoading.value = false;
  }
};
</script>
