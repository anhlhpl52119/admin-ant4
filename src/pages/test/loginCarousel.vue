<template>
  <ACarousel autoplay class="test">
    <div class="obj">
      <img
        src="https://images.unsplash.com/photo-1683220642973-a4d0ca134714?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        alt="metaverse 1"
      >
    </div>
    <div class="obj">
      <img
        src="https://images.unsplash.com/photo-1659284652601-7ac13e5750d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=600&q=60"
        alt="metaverse 2"
      >
    </div>
  </ACarousel>
</template>

<style scoped>
/* For demo */
.ant-carousel :deep(.slick-slide) {
  text-align: center;
  height: 100%;
  line-height: inherit;
  background: #fdfdfd;
  overflow: hidden;
}

img {
  display: block;
  height: 100%;
  border: 0; /* for older IE browsers that draw borders around images */
}

.obj {
  object-fit: fill;
}
</style>
