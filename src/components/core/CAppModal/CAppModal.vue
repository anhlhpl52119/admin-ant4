<template>
  <template v-for="(value, id) in state" :key="id">
    <AModal
      :open="value.isOpen"
      destroyOnClose
      centered
      :footer="value.showCloseBtn ? undefined : null"
      :width="value.modalWidth ?? 'auto'"
      :maskClosable="value.maskCloseable ?? false"
      :title="value.headerTitle ?? ''"
      @cancel="closeModal(id.toString())"
    >
      <Component
        :is="value.component"
        :class="{ 'mt-20': !value.headerTitle }"
        v-bind="value?.props ?? {}"
        v-on="value?.event ?? {}"
        @cancel="closeModal(id.toString())"
      />
      <template v-if="value.showCloseBtn" #footer>
        <div class="flex flex-row-reverse">
          <AButton @click="closeModal(id.toString())">
            Đóng
          </AButton>
        </div>
      </template>
    </AModal>
  </template>
</template>

<script lang="ts" setup>
const state = computed(() => Object.fromEntries(modalState));

const closeModal = (id: string) => {
  coreModal.close(id.toString());
};
</script>
