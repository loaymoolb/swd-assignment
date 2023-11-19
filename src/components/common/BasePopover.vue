<template>
  <div class="flex">
    <Popover class="inline-block">
      <PopoverButton as="a" class="hover:underline underline-offset-2 cursor-pointer">
        <slot name="button"></slot>
      </PopoverButton>
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel class="absolute z-10 mt-3 max-w-sm -translate-x-1/2 transform">
          <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5 px-4 pb-4 pt-6 bg-white">
            <slot name="content"></slot>
          </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, PopoverPanel, PopoverButton } from '@headlessui/vue';
</script>