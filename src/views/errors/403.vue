<template>
  <AResult
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
  >
    <template #extra>
      <AButton type="primary" @click="$router.replace('/')">
        Back Home
      </AButton>
    </template>
  </AResult>
</template>
