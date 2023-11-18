<template>
  <header class="h-64 bg-white flex justify-end items-center px-20 py-10">
    <ADropdown :trigger="['click']">
      <div class="flex items-center gap-10 cursor-pointer">
        <div>
          <AAvatar :size="37">
            USER
          </AAvatar>
        </div>
        <div class="w-100 truncate">
          <span class="block text-spotlight text-15 text-primary">{{ userInfo?.name || '-' }}</span>
          <DynamicTag class="mt-5" :status="userInfo?.role" />
        </div>
      </div>

      <template #overlay>
        <AMenu class="w-150">
          <AMenuItem class="font-500 text-15">
            <RouterLink :to="{ name: ERouteName.RETAILER_INFO_DETAIL }">
              Thông tin
            </RouterLink>
          </AMenuItem>
          <AMenuDivider />
          <AMenuItem @click="onOpenChangePass">
            <div class="font-500 text-15">
              <i class="i-material-symbols:key-rounded inline-block" />
              <span class="ml-7">Đổi mật khẩu</span>
            </div>
          </AMenuItem>
          <AMenuItem @click="doLogout">
            <div class="text-red hover:underline font-600 text-15">
              <PoweroffOutlined />
              <span class="ml-7">Đăng xuất</span>
            </div>
          </AMenuItem>
        </AMenu>
      </template>
    </ADropdown>
  </header>
</template>

<script lang="ts" setup>
import { PoweroffOutlined } from '@ant-design/icons-vue';
import { authApis } from '@/apis/auth/auth.api';
import { ERouteName } from '@/enums/router.enum';
import { BrowserStorage } from '@/utils/storage.util';
import { useUserStore } from '@/stores/user.store';

const ChangePasswordForm = defineAsyncComponent(() => import('@/components/form/ChangePasswordForm.vue'));
const userInfo = ref<API.UserLoginInfo | null>();
const userStore = useUserStore();

const getUserInfo = async () => {
  if (userStore.getUserInfo) {
    userInfo.value = userStore.getUserInfo;
    return;
  }
  await userStore.verifyUser();
  userInfo.value = userStore.getUserInfo;
};

const doLogout = async () => {
  await authApis.logout();
  BrowserStorage.clear();
  location.reload();
};
const onOpenChangePass = () => {
  coreModal.show({
    title: 'Đổi mật khẩu',
    component: ChangePasswordForm,
    props: {},
    modalWidth: '40rem',
  });
};
getUserInfo();
</script>
