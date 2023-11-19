<template>
  <BasePopover>
    <template #button>
      {{ planet.name || 'Loading...' }}
    </template>
    <template #content>
      <div v-if="planet" class="relative flex flex-col gap-2 text-center text-ellipsis">
        <h3 class="font-semibold text-primary">{{ planet.name }}</h3>
        <p>Diameter: {{ planet.diameter }}</p>
        <p>Climate: {{ planet.climate }}</p>
        <p>Population: {{ planet.population }}</p>
      </div>
    </template>
  </BasePopover>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import BasePopover from '../common/BasePopover.vue';
import { Planet } from '@/types/types'

defineProps<{
  planet: Planet
}>();
</script>
  