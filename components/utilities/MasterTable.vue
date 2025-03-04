<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th v-for="(col, index) in columns" :key="index" class="px-6 py-3">
            {{ col.label }}
          </th>
          <th class="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
          <td v-for="(col, colIndex) in columns" :key="colIndex" class="px-6 py-4">
            {{ row[col.key] }}
          </td>
          <td class="px-6 py-4">
            <button @click="editRow(row)" class="text-blue-600 hover:underline dark:text-blue-300">Edit</button>
            <button @click="deleteRow(rowIndex)"
              class="ml-4 text-red-600 hover:underline dark:text-red-300">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, defineEmits, nextTick } from "vue";
import { DataTable } from "simple-datatables";
import "simple-datatables/dist/style.css";

const props = defineProps({
  columns: {
    type: Array,
    required: true, // Example: [{ key: "name", label: "Name" }, { key: "email", label: "Email" }]
  },
  rows: {
    type: Array,
    required: true, // Example: [{ name: "John Doe", email: "john@example.com" }]
  },
});

const emit = defineEmits(["edit", "delete"]);

const tableElement = ref(null);

onMounted(async () => {
  await nextTick(); // Ensure DOM updates before initializing
  if (tableElement.value) {
    new DataTable(tableElement.value, {
      searchable: true,
      perPage: 5,
      fixedHeight: true,
    });
  }
});

const editRow = (row) => {
  emit("edit", row);
};

const deleteRow = (index) => {
  emit("delete", index);
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
</style>