<template>
  <main class="flex flex-col h-screen p-8">
    <TableHeader title="SWAPI Dashboard" placeholder="Search by name..." :searchTerm="searchTerm" @update:search="handleSearch" />
    <div class="flex-grow">
        <UsersTable :users="filteredUsers" />
    </div>
  </main>
</template>

<script setup lang="ts">
import UsersTable from '@/components/users/UsersTable.vue';
import { useStore } from 'vuex';
import { computed, onMounted, watch } from 'vue';
import TableHeader from '@/components/common/TableHeader.vue';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();

const users = computed(() => store.getters['users/usersData']);

const searchTerm = computed(() => {
  const queryParam = route.query.search;
  return Array.isArray(queryParam) ? queryParam[0] || '' : queryParam || '';
});

const filteredUsers = computed(() => {
  const searchValue = searchTerm.value || '';
  return searchValue
    ? users.value.filter((user: {name: string}) => user.name.toLowerCase().includes(searchValue.toLowerCase()))
    : users.value;
});


const handleSearch = (query: string) => {
  store.dispatch('users/setSearchTerm', query);
  router.push({ query: query ? { search: query } : {} });
};

watch(() => route.query.search, (newQuery) => {
  store.dispatch('users/setSearchTerm', newQuery || '');
});

onMounted(() => {
  store.dispatch('users/fetchUsers');
});

</script>