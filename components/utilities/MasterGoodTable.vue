<script setup>
import { defineProps, defineEmits } from "vue";
import { VueGoodTable } from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  columns: Array,
  rows: Array,
});

const emit = defineEmits(["edit", "delete"]);
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <VueGoodTable
      :columns="[
        ...props.columns,
        { label: 'Actions', field: 'actions', sortable: false },
      ]"
      :rows="props.rows"
      :pagination="{ enabled: true, perPage: 5 }"
      :search-options="{ enabled: true, placeholder: 'Search users...' }"
      class="border rounded-lg text-sm leading-3 justify-center"
    >
      <template #table-row="{ column, row }">
        <!-- Id -->
        <template v-if="column.field === 'id'">
          <div class="py-3 text-gray-800">{{ row.id }}</div>
        </template>
        <!-- Nama -->
        <template v-if="column.field === 'name'">
          <div class="py-3 text-gray-800">{{ row.name }}</div>
        </template>

        <!-- Actions (Edit & Delete) -->
        <template v-if="column.field === 'actions'">
          <div class="flex space-x-2 justify-center items-center">
            <!-- Edit Button -->
            <button
              @click="emit('edit', row)"
              class="p-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100 flex items-center transition"
            >
              <PencilIcon class="w-5 h-5" />
            </button>

            <!-- Delete Button -->
            <button
              @click="emit('delete', row)"
              class="p-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100 flex items-center transition"
            >
              <TrashIcon class="w-5 h-5" />
            </button>
          </div>
        </template>
      </template>
    </VueGoodTable>
  </div>
</template>
