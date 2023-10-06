<template>
  <div class="grid gap-15 mt-16">
    <ASpin
      v-if="appStore.loadingAppState.has(EApiId.RETAILER_DETAILS)"
      size="large"
      tip="Đang tải..."
      class="m-30"
    />
    <template v-else>
      <AForm v-bind="formItemLayout">
        <AFormItem v-bind="validateInfos.name" class="w-full">
          <CInput
            v-model:value="createUpdateBodyState.name"
            label="Tên Nhà Bán Lẻ"

            @blur="validate('name', { trigger: 'blur' }).catch(() => {})"
          />
        </AFormItem>
        <AFormItem v-bind="validateInfos.code">
          <CInput
            v-model:value="createUpdateBodyState.code"
            label="Mã Nhà Bán Lẻ"
            @blur="validate('code', { trigger: 'blur' }).catch(() => {})"
          />
        </AFormItem>
        <AFormItem v-bind="validateInfos.phone">
          <CInput
            v-model:value="createUpdateBodyState.phone"
            label="Số điện thoại"
            @blur="validate('phone', { trigger: 'input' }).catch(() => {})"
          />
        </AFormItem>
        <AFormItem>
          <CInput
            v-model:value="createUpdateBodyState.address"
            label="Địa chỉ"
          />
        </AFormItem>
        <AFormItem>
          <CInput
            v-model:value="createUpdateBodyState.description"
            label="Mô tả"
          />
        </AFormItem>
        <AFormItem>
          <CInput
            v-model:value="createUpdateBodyState.email"
            label="Email"
          />
        </AFormItem>
        <AFormItem :wrapper-col="{ span: 14, offset: 4 }">
          <div class="flex justify-center gap-10">
            <AButton type="primary" @click.prevent="onSubmit">
              Tạo
            </AButton>
            <AButton style="margin-left: 10px" @click="$emit('cli', 'hello this is emt')">
              Đóng
            </AButton>
          </div>
        </AFormItem>
      </AForm>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Form } from 'ant-design-vue';
import { useApplicationStore } from '@/stores/application.store';
import { EApiId } from '@/enums/request.enum';
import { retailerApis } from '@/apis/core/retailer/retailer.api';

const props = defineProps<{ retailerId: string; sth?: string }>();
const emits = defineEmits<{
  cli: [v: string]
}>();

const appStore = useApplicationStore();

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const modalState = reactive({
  title: 'Tạo mới nhà bán lẻ',
  okBtnText: 'Tạo',
});

const createUpdateBodyState = reactive<API.CreateRetailerRequestBody>({
  name: 'Nhà bán lẻ Hùng Anh',
  code: '521199',
  address: '1213 st Hung Vuong',
  phone: '0528661429',
  description: 'Hung Anh test',
  email: 'nhabanleanhlhpl@taixe.vn',
});

const useForm = Form.useForm;

const rulesRef = reactive({
  name: [
    {
      required: true,
      message: 'Tên không được để trống',
    },
    {
      min: 5,
      max: 30,
      message: 'Tên ít nhất có từ 5 đến 30 ký tự',
      trigger: 'blur',
    },
  ],
  code: [
    {
      required: true,
      message: 'Hãy nhập mã',
    },
    {
      min: 5,
      max: 30,
      message: 'Mã ít nhất có từ 5 đến 30 ký tự',
      trigger: 'blur',
    },
  ],
  phone: [
    {
      required: true,
      message: 'Hãy nhập số điện thoại',
    },
    {
      min: 9,
      max: 12,
      message: 'số điện thoại ít nhất có từ 9 đến 12 ký tự',
      trigger: 'input',
    },
  ],
});
const { resetFields, validate, validateInfos } = useForm(createUpdateBodyState, rulesRef);

const onSubmit = () => {
  validate()
    .then(() => {
      console.log();

      console.log(toRaw(createUpdateBodyState));
    })
    .catch((err) => {
      console.log('error', err);
    });
};

const init = async () => {
  if (!props.retailerId) {
    return;
  }
  modalState.okBtnText = 'Update';
  modalState.title = 'Chỉnh sửa Thông tin';
  const res = await retailerApis.getDetails(props.retailerId);
  if (!(res && res.data)) {
    return;
  }
  createUpdateBodyState.name = res?.data?.name ?? '';
  createUpdateBodyState.code = res?.data?.code ?? '';
  createUpdateBodyState.address = res?.data?.address ?? '';
  createUpdateBodyState.phone = res?.data?.phone ?? '';
  createUpdateBodyState.description = res?.data?.description ?? '';
  createUpdateBodyState.email = res?.data?.email ?? '';
};
init();
</script>
