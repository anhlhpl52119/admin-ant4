<template>
  <AResult
    status="404"
    title="404"
    subTitle="Không tìm thấy trang"
  >
    <template #extra>
      <AButton type="primary" @click="$router.replace('/')">
        Về trang chủ
      </AButton>
    </template>
  </AResult>
</template>

<script lang="ts" setup></script>
