<template>
  <EmptyComponent v-if="!loading && sortedData.length === 0" text="Nothing was found :(" />
  <LoadingComponent v-else-if="loading" />
  <div v-else class="flex flex-col h-full">
    <div class="overflow-auto max-h-[calc(100vh-120px)]">
      <table class="min-w-full table-auto max-w-max">
        <thead class="text-gray text-xs font-medium tracking-[0.5px] uppercase z-[100] border-b-neutral border-b border-solid top-0 bg-white">
          <tr>
            <th v-for="column in columns" :key="column.key" @click="sortData(column.key)" :class="{'text-primary': sortKey === column.key}" class="hover:text-primary leading-6 lg:leading-10 pl-2 lg:px-4 py-0 cursor-pointer group">
              <span class="mr-0 md:mr-1">{{ column.name }}</span>
              <span v-if="sortKey === column.key" class="inline-block">
                <ArrowUpIcon v-if="sortOrder > 0" class="w-3 h-3" />
                <ArrowDownIcon v-else-if="sortOrder < 0" class="w-3 h-3" />
                <ArrowUpIcon v-else class="w-3 h-3 text-gray hidden md:inline-block" />
              </span>
              <span v-else class="inline-block opacity-0 md:group-hover:opacity-100">
                <ArrowUpIcon class="w-3 h-3 text-gray" />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in sortedData" :key="item.key" class="border-b-neutral border-b border-solid">
              <td v-for="column in columns" :key="column.key" class="p-2 lg:px-4 text-sm truncate">
                  <slot :name="column.key" :item="item">
                    {{ item[column.key] !== null ? item[column.key] : 'unknown' }}
                  </slot>
              </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/vue/24/solid';
import { defineProps, ref, computed } from 'vue';
import EmptyComponent from './EmptyComponent.vue';
import LoadingComponent from './LoadingComponent.vue';

interface Column {
  name: string;
  key: string;
}

interface Data {
  [key: string]: any
}

const props = defineProps<{
  data: Data[]
  columns: Column[]
  loading: boolean
}>();

const sortKey = ref();
const sortOrder = ref(0); // 0 for none, 1 for asc, -1 for desc

const sortedData = computed(() => {
  if (!sortKey.value) return props.data;

  return [...props.data].sort((a, b) => {
    if (a[sortKey.value] < b[sortKey.value]) return -sortOrder.value;
    if (a[sortKey.value] > b[sortKey.value]) return sortOrder.value;
    return 0;
  });
});

const sortData = (key: string) => {
  if (sortKey.value === key) {
    if (sortOrder.value === 0) {
      sortOrder.value = 1;
    } else if (sortOrder.value === 1) {
      sortOrder.value = -1;
    } else {
      sortOrder.value = 0;
    }
  } else {
    sortKey.value = key;
    sortOrder.value = 1;
  }
};

</script>
<style scoped>
thead th {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 10;
}

tbody tr td:first-child {
  position: sticky;
  left: 0;
  background-color: white;
  z-index: 5;
}
</style>