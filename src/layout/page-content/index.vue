<template>
  <div class="tabs-view-content">
    <RouterView #="{ Component }">
      <template v-if="Component">
        <Transition
          :name="Object.is(route.meta?.transitionName, false) ? '' : 'fade-transform'"
          mode="out-in"
          appear
        >
          <Component :is="Component" :key="route.fullPath" />
        </Transition>
      </template>
    </RouterView>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
</script>
