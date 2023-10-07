<template>
  <div style="margin-bottom: 16px">
    <span style="margin-right: 16px">Change locale of components:</span>
    <ARadioGroup v-model:value="locale">
      <ARadioButton key="en" :value="enUS.locale">
        English
      </ARadioButton>
      <ARadioButton key="cn" :value="zhCN.locale">
        中文
      </ARadioButton>
    </ARadioGroup>
  </div>
  <AConfigProvider :locale="locale === 'en' ? enUS : zhCN">
    <ASpace
      direction="vertical"
      :size="[0, 16]"
      :style="{
        width: '100%',
        paddingTop: '16px',
        borderTop: `1px solid ${token.colorBorder}`,
      }"
    >
      <APagination :total="50" showSizeChanger />
      <ASpace wrap>
        <ASelect showSearch style="width: 200px">
          <ASelectOption value="jack">
            jack
          </ASelectOption>
          <ASelectOption value="lucy">
            lucy
          </ASelectOption>
        </ASelect>
        <ADatePicker />
        <ATimePicker />
        <ARangePicker style="width: 200px" />
      </ASpace>
      <ASpace wrap>
        <AButton type="primary" @click="visible = true">
          Show Modal
        </AButton>
        <AButton @click="info">
          Show info
        </AButton>
        <AButton @click="confirm">
          Show confirm
        </AButton>
        <APopconfirm title="Question?">
          <a href="#">Click to confirm</a>
        </APopconfirm>
      </ASpace>
      <ATransfer
        :data-source="[]"
        showSearch
        :targetKeys="[]"
        :render="(item) => item.title"
      />
      <div
        :style="{
          'width': '320px',
          'border': `1px solid ${token.colorBorder}`,
          'border-radius': '8px',
        }"
      >
        <ACalendar :fullscreen="false" />
      </div>
      <AForm
        name="basic"
        :model="formModel"
        autoComplete="off"
        :labelCol="{ sm: { span: 4 } }"
        :wrapperCol="{ span: 6 }"
      >
        <AFormItem label="UserName" name="username" :rules="[{ required: true }]">
          <AInput v-model:value="formModel.username" :width="200" />
        </AFormItem>
        <AFormItem label="Age" name="age" :rules="[{ type: 'number', min: 0, max: 99 }]">
          <AInputNumber v-model:value="formModel.age" :width="200" />
        </AFormItem>
        <AFormItem :wrapperCol="{ offset: 2, span: 6 }">
          <AButton type="primary" htmlType="submit">
            submit
          </AButton>
        </AFormItem>
      </AForm>
      <ATable :data-source="[]" :columns="columns" />
      <AModal v-model:open="visible" title="Locale Modal">
        <p>Locale Modal</p>
      </AModal>
      <ASpace wrap :size="80">
        <AQrcode
          value="https://antdv.com"
          status="expired"
          @refresh="() => console.log('refresh')"
        />
        <AImage
          :width="160"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </ASpace>
      <AUpload listType="picture-card" :fileList="fileList" />
      <ADivider orientation="left">
        Tour
      </ADivider>
      <AButton type="primary" @click="() => (tourOpen = true)">
        Begin Tour
      </AButton>
      <ASpace>
        <AButton ref="ref1">
          upload
        </AButton>
        <AButton ref="ref2" type="primary">
          save
        </AButton>
        <AButton ref="ref3">
          <template #icon>
            <EllipsisOutlined />
          </template>
        </AButton>
      </ASpace>
      <ATour
        v-model:current="current"
        :open="tourOpen"
        :steps="steps"
        @close="() => (tourOpen = false)"
      />
    </ASpace>
  </AConfigProvider>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { Modal, theme } from 'ant-design-vue';
import type { TourProps, UploadFile } from 'ant-design-vue';
import { EllipsisOutlined } from '@ant-design/icons-vue';
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('en');

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'filter1',
        value: 'filter1',
      },
    ],
  },
  {
    title: 'Age',
    dataIndex: 'age',
  },
];

const visible = ref(false);
const locale = ref(enUS.locale);
watch(locale, (val) => {
  dayjs.locale(val);
});
const info = () => {
  Modal.info({
    title: 'some info',
    content: 'some info',
  });
};
const confirm = () => {
  Modal.confirm({
    title: 'some info',
    content: 'some info',
  });
};

const formModel = ref({
  username: '',
  age: '100',
});

const { token } = theme.useToken();

const fileList: UploadFile[] = [
  {
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-2',
    percent: 50,
    name: 'image.png',
    status: 'uploading',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },
  {
    uid: '-3',
    name: 'image.png',
    status: 'error',
  },
];

const ref1 = ref(null);
const ref2 = ref(null);
const ref3 = ref(null);
const current = ref(0);
const tourOpen = ref(false);
const steps: TourProps['steps'] = [
  {
    title: 'Upload File',
    description: 'Put your files here.',
  },
  {
    title: 'Save',
    description: 'Save your changes.',
  },
  {
    title: 'Other Actions',
    description: 'Click to see other actions.',
  },
];
</script>
