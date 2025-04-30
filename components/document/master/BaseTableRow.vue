<template>
  <tr>
    <td v-for="(col, index) in columns" :key="index" class="border p-2">
      <slot :name="'col-' + index" :col="col"></slot>
    </td>
    <td class="border p-1 text-center">
      <slot name="actions"></slot>
    </td>
  </tr>
</template>

<script setup>
defineProps({
  columns: Array,
});
</script>
