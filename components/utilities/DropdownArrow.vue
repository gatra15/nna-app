<template>
    <svg class="w-3 h-3 transition-transform duration-200" :class="{ 'rotate-180': isOpen }" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
    </svg>
  </template>
  
  <script setup>
  defineProps({
    isOpen: Boolean,
  });
  </script>
  