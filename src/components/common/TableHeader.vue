
<template>
  <nav class="flex mb-4 justify-between md:justify-around items-center">
    <h1 class="text-xl font-semibold text-main xs:w-auto xs:mb-0">{{ title }}</h1>
    <SearchBar :placeholder="placeholder" :searchTerm="searchTerm" @update:search="handleSearch" />
  </nav>
</template>

<script setup lang="ts">
import SearchBar from './SearchBar.vue';
import { defineProps, defineEmits } from 'vue';

defineProps({
  title: String,
  placeholder: String,
  searchTerm: [Array, String],
});

const emit = defineEmits(['update:search']);

const handleSearch = (query: string) => {
  emit('update:search', query);
};
</script>