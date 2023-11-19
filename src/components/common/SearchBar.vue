<template>
  <div :class="{'border-primary': localSearchTerm}" class="flex items-center bg-white border border-solid border-gray-netural rounded-full text-sm h-8 px-3 min-w-[180px] relative focus-within:border-primary">
    <MagnifyingGlassIcon class="text-xs h-4 w-4 hidden xs:inline" />
    <input 
        type="search" 
        :placeholder="placeholder" 
        v-model="localSearchTerm"
        @input="debouncedSearch"
        class="border border-none cursor-pointer outline-none overflow-hidden pl-1 w-full"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits, defineProps, watch } from 'vue';
import { debounce } from 'lodash';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Search...'
  },
  searchTerm: [Array, String],
});

const localSearchTerm = ref(props.searchTerm);

const emit = defineEmits(['update:search']);

const debouncedSearch = debounce(() => {
  emit('update:search', localSearchTerm.value);
}, 300);

watch(() => props.searchTerm, (newValue) => {
  localSearchTerm.value = newValue;
});
</script>