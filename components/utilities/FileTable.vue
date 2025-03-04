<template>
  <div class="overflow-x-auto border-white bg-white dark:border-gray-200 dark:bg-gray-800 p-4 rounded-lg sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-white rounded-lg shadow-md">
      <thead class="text-xs text-gray-700 uppercase bg-green-100 dark:bg-green-700 dark:text-white">
        <tr>
          <th scope="col" class="px-6 py-3">File Name</th>
          <th scope="col" class="px-6 py-3">Size</th>
          <th scope="col" class="px-6 py-3">Type</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(file, index) in files" :key="index" class="border-b dark:border-gray-700">
          <td class="px-6 py-4">{{ file.name }}</td>
          <td class="px-6 py-4">{{ file.size }}</td>
          <td class="px-6 py-4">{{ file.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  files: {
    type: Array,
    required: true,
  },
});
</script>
