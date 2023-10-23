<template>
  <div>
    <div class="bs_cont flex-50">
      <section class="casourel w-50">
        <Casourel />
      </section>
      <section class="login_form w-50">
        <LoginForm class="login_form_pos" />
      </section>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from './LoginForm.vue';
import Casourel from './loginCarousel.vue';
</script>

<style scoped>
.casourel {
  overflow: hidden;
  background-size: 100%;
}
.bs_cont {
  position: absolute;
  border-radius: 10px;
  height: 90vh;
  width: 90vw;
  top: 5%;
  left: 5%;
  background-color: white;
  overflow: hidden;
}
.flex-50 {
  display: flex;
}
.w-50 {
  width: 50%;
}
.login_form_pos {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  min-height: 100%;
  position: relative;
}
@media only screen and (max-width: 64em) {
  .casourel {
    display: none;
  }
  .login_form {
    width: 100%;
  }
  .login_form_pos {
    top: 50px;
    align-items: flex-start;
  }
}
</style>
