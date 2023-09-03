<template>
  <div class="tabs-view-content">
    <RouterView #="{ Component }">
      <Transition
        :name="Object.is(route.meta?.transitionName, false) ? '' : 'fade-transform'"
        mode="out-in"
        appear
      >
        <template v-if="Component">
          <Component :is="Component" :key="route.fullPath" />
        </template>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
