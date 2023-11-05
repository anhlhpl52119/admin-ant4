<!-- <template>
  <ASubMenu v-if="data.children && data.children.length > 0" :key="data.name">
    <template v-if="data.meta.icon" #icon>
      <i :class="data.meta.icon" class="w22 h22" />
    </template>
    <template #title>
      <span>{{ data.meta.title }}</span>
    </template>

    <CustomSubMenu v-for="item in data.children" :key="item.name" :data="item" />
  </ASubMenu>
  <template v-else>
    <AMenuItem :key="data.name" class="flex-center">
      <template v-if="data.meta.icon" #icon>
        <i :class="data.meta.icon" class="w22 h22 mr-5" />
      </template>
      <RouterLink :to="{ name: data.name }">
        {{ data.meta.title }}
      </RouterLink>
    </AMenuItem>
  </template>
</template>

<script lang="ts" setup>
import type { CustomRoute } from '@/router/typing';

const props = defineProps<{ data: CustomRoute }>();
const { data } = toRefs(props);
</script> -->
