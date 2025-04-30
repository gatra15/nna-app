<template>
  <table class="table-fixed w-full border-collapse border border-gray-300">
    <slot></slot>
    <!-- Slot untuk fleksibilitas -->
  </table>
</template>

<style scoped>
th,
td {
  padding: 10px;
  border: 1px solid #ddd;
}
th {
  background-color: #f8f9fa;
}
</style>
