<template>
  <div class="overflow-x-auto max-h-96 overflow-y-auto">
    <table class="min-w-full table-auto">
      <thead>
        <tr class="bg-gray-100">
          <th class="px-4 text-left text-xs">No</th>
          <th class="px-4 text-left text-xs">Title</th>
          <th class="px-4 text-left text-xs">Ket</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="Object.keys(documents).length !== 0">
          <tr v-for="(item, index) in documents" :key="index" class="hover:bg-gray-50 transition-all">
            <td class="px-4 border-b text-xs text-center">
              {{ index + 1 }} <!-- Index + 1 untuk nomor urut -->
            </td>
            <td class="py-1 px-6 border-b">
              <div class="font-semibold text-xs ">
                <a href="#" @click.prevent="viewDocumentDetail(item)">
                  {{ item.title }}
                </a>
              </div>
              <div class="text-xs text-gray-600 mt-1">{{ item.description }}</div>
            </td>
            <td class="py-1 px-6 border-b">
              <!-- Created by and Created at -->
              <div class="text-xs text-gray-500">
                {{ item.created_by }}
              </div>
              <div class="text-xs text-gray-500">
                {{ item.created_at }}
              </div>
            </td>
          </tr>
        </template>
        <template v-else>
          <tr>
            <td id="colspan" colspan="3" class="text-sm items-center text-center">Data Tidak ditemukan</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['openDetail'])
const props = defineProps({
  documents: {
    type: [Array, Object],
    required: true,
  }
})

const viewDocumentDetail = (item) => {
  emit('openDetail', item)
};
</script>

<style scoped>
/* Table Styling */
table {
  border-collapse: collapse;
}

th,
td {
  text-align: left;
}

th {
  background-color: #f7fafc;
  font-weight: 600;
}

td {
  padding: 0.75rem;
}

/* Horizontal border only */
tr {
  border-bottom: 1px solid #e2e8f0;
}

tr:hover {
  background-color: #f1f5f9;
}

/* Link styling for Title */
a {
  text-decoration: none;
  font-weight: 600;
  color: #39906e;
  /* Tailwind Blue 600 */
}

a:hover {
  color: #2c7b5d;
  /* Tailwind Blue 700 */
}

#colspan {
  text-align: center;
}

/* Text styling for 'Created by' and 'Created at' */
.text-xs {
  font-size: 0.75rem;
}

.font-semibold {
  font-weight: 600;
}
</style>
