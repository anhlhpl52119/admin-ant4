<template>
  <AForm
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    @finish="onValidateSuccess"
  >
    <AFormItem hasFeedback name="newPass">
      <FieldTitle title="Mật khẩu mới" required />
      <div class="text-gray text-12 my-4">
        <p>
          - Mật khẩu phải có độ dài từ 8 - 32 ký tự
        </p>
        <p>
          - Mật khẩu bao gồm: <strong>số, chữ, và ít nhất một ký tự đặt biệt</strong>
        </p>
        <p>
          - Các ký tự đặt biệt không bao gồm: <strong> =, >, &, !, ^, #, \</strong>
        </p>
      </div>
      <CInput
        v-model:value="formState.newPass"
        type="password"
        placeholder="Nhập mật khẩu mới"
        :maxlength="40"
        autocomplete="off"
      />
    </AFormItem>

    <AFormItem hasFeedback name="confirmNewPass">
      <FieldTitle title="Xác nhận mật khẩu mới" required />
      <CInput
        v-model:value="formState.confirmNewPass"
        type="password"
        :maxlength="40"
        placeholder="Nhập lại mật khẩu mới vừa nhập phía trên"
        autocomplete="off"
      />
    </AFormItem>
    <div>
      <AButton type="primary" htmlType="submit">
        Xác nhận đổi mật khẩu
      </AButton>
    </div>
  </AForm>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';
import { useFieldValidation } from '@/composable/useFieldValidation';
import { authApis } from '@/apis/auth/auth.api';

interface FormState {
  defaultPass: string
  newPass: string
  confirmNewPass: string
}

;
const emits = defineEmits<{
  cancel: []
}>();

const { checkPassword } = useFieldValidation();
const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
  defaultPass: '', // TODO: add provided pass to validate old pass
  newPass: '',
  confirmNewPass: '',
});

watch(() => formState.newPass, async (val) => {
  if (!(val && formState.confirmNewPass)) {
    return;
  }
  formRef.value?.validateFields('confirmNewPass');
});

const verifyNewPass = async (_rule: any, value: string) => {
  if (formState.defaultPass.toLowerCase() === value.toLowerCase()) {
    return Promise.reject(new Error('Mật khẩu mới không được trùng với mật khẩu cũ'));
  }
  return checkPassword(_rule, value);
};

const verifyConfirmPassword = async () => {
  try {
    await verifyNewPass({}, formState.newPass);
  }
  catch (error) {
    return Promise.reject(new Error('Mật khẩu mới chưa hợp lệ'));
  }
  if (formState.confirmNewPass !== formState.newPass) {
    return Promise.reject(new Error('Mật khẩu chưa khớp'));
  }
};

const rules: Record<string, Rule[]> = {
  currentPass: [{ validator: checkPassword, trigger: 'blur' }],
  newPass: [{ validator: verifyNewPass, trigger: 'change' }],
  confirmNewPass: [{ validator: verifyConfirmPassword, trigger: 'change' }],
};

const onValidateSuccess = async () => {
  const confirm = await showAsyncAlert({
    content: ['Sau khi đổi mật khẩu bạn sẽ được điều hướng về trang Đăng Nhập và phải thực hiện đăng nhập lại', 'Hãy chắc chắn rằng bạn đã ghi nhớ rõ mật khẩu của mình'],
    severity: 'warn',
    strictMsg: 'Tôi đã ghi nhớ mật khẩu mới của mình!',
  });

  if (!confirm) { return; }

  const rs = await authApis.changePassword({
    current_password: formState.defaultPass,
    password: formState.newPass,
    password_confirmation: formState.confirmNewPass,
  });

  if (rs?.status !== 200) {
    showAsyncAlert({ content: (rs?.data?.message[0] || 'Không thể cập nhật mật khẩu'), severity: 'error' });
    return;
  }

  await showAsyncAlert({ content: 'Đổi mật khẩu thành công!', severity: 'success' });
  emits('cancel');
  // TODO: reset token back to login
};
</script>
