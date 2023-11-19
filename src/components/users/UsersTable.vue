<template>
  <BaseTable :data="users" :columns="columns" :loading="isLoading">
    <template v-slot:homeworld="{ item }">
      <PlanetPopover 
        :planet="getPlanetDetails(item.homeworld)" 
      />
    </template>
    <template v-slot:created="{ item }">
      {{ formatDate(item.created) }}
    </template>
    <template v-slot:edited="{ item }">
      {{ formatDate(item.edited) }}
    </template>
  </BaseTable>
</template>

<script setup lang="ts">
import { useStore } from 'vuex';
import BaseTable from '@/components/common/BaseTable.vue';
import { ref, defineProps, computed, watch, defineAsyncComponent } from 'vue';
import { User } from '@/types/types';
import { formatDate } from '@/utils/helpers';

const PlanetPopover = defineAsyncComponent(() =>
  import('@/components/planet/PlanetPopover.vue')
);

const store = useStore();

const isLoading = computed(() => store.getters['users/isLoading']);

const props = defineProps<{ users: User[] }>();

const columns = ref([
  { name: 'Name', key: 'name' },
  { name: 'Height', key: 'height' },
  { name: 'Mass', key: 'mass' },
  { name: 'Created', key: 'created' },
  { name: 'Edited', key: 'edited' },
  { name: 'Planet', key: 'homeworld' }
]);

const getPlanetDetails = (planetUrl: string) => {
  const planet = store.getters['planets/planet'](planetUrl);
  return planet ? planet : {};
};

watch(() => props.users, (newUsers) => {
  newUsers.forEach(user => {
    if (user.homeworld && !store.getters['planets/planet'](user.homeworld)) {
      store.dispatch('planets/fetchPlanet', user.homeworld);
    }
  });
}, { immediate: true });
</script>