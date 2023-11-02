<template>
  <AResult status="500" title="500" subTitle="Sorry, the server is wrong.">
    <template #extra>
      <AButton type="primary" @click="$router.replace('/')">
        Về trang chủ
      </AButton>
    </template>
  </AResult>
</template>
