<template>
  <AForm
    ref="formRef"
    name="custom-validation"
    :model="formState"
    :rules="rules"
    v-bind="layout"
    @finish="handleFinish"
    @validate="handleValidate"
    @finishFailed="handleFinishFailed"
  >
    <AFormItem hasFeedback label="Password" name="pass">
      <AInput v-model:value="formState.pass" type="password" autocomplete="off" />
    </AFormItem>
    <AFormItem hasFeedback label="Confirm" name="checkPass">
      <AInput v-model:value="formState.checkPass" type="password" autocomplete="off" />
    </AFormItem>
    <AFormItem hasFeedback label="Age" name="age">
      <AInputNumber v-model:value="formState.age" />
    </AFormItem>
    <AFormItem :wrapperCol="{ span: 14, offset: 4 }">
      <AButton type="primary" htmlType="submit">
        Submit
      </AButton>
      <AButton style="margin-left: 10px" @click="resetForm">
        Reset
      </AButton>
    </AFormItem>
  </AForm>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import type { Rule } from 'ant-design-vue/es/form';
import type { FormInstance } from 'ant-design-vue';

interface FormState {
  pass: string
  checkPass: string
  age: number | undefined
}

const formRef = ref<FormInstance>();
const formState = reactive<FormState>({
  pass: '',
  checkPass: '',
  age: undefined,
});
const checkAge = async (_rule: Rule, value: number) => {
  if (!value) {
    return Promise.reject('Please input the age');
  }
  if (!Number.isInteger(value)) {
    return Promise.reject('Please input digits');
  }
  else {
    if (value < 18) {
      return Promise.reject('Age must be greater than 18');
    }
    else {
      return Promise.resolve();
    }
  }
};
const validatePass = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the password');
  }
  else {
    if (formRef.value && formState.checkPass !== '') {
      formRef.value.validateFields('checkPass');
    }

    return Promise.resolve();
  }
};
const validatePass2 = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the password again');
  }
  else if (value !== formState.pass) {
    return Promise.reject('Two inputs don\'t match!');
  }
  else {
    return Promise.resolve();
  }
};

const rules: Record<string, Rule[]> = {
  pass: [{ required: true, validator: validatePass, trigger: 'change' }],
  checkPass: [{ validator: validatePass2, trigger: 'change' }],
  age: [{ validator: checkAge, trigger: ['blur', 'change'] }],
};
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};
const handleFinish = (values: FormState) => {
  console.log(values, formState);
};
const handleFinishFailed = (errors: any) => {
  console.log(errors);
};
const resetForm = () => {
  formRef.value.resetFields();
};
const handleValidate = (...args: any[]) => {
  console.log(args);
};
</script>
