<template>
  <main>
    <div class="text-spotlight">
      Demo Store
    </div>
    <AButton type="primary">
      Click
    </AButton>
    <div class="mt-20">
      <pre>{{ devStore }}</pre>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useDevStore } from './dev-store';

const devStore = useDevStore();

const test = devStore.users[0];
</script>
