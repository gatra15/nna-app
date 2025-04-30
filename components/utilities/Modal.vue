<template>
  <div v-if="isOpen" class="fixed left-56 inset-0 z-50 flex items-center justify-center bg-matcha bg-opacity-50">
    <div class="bg-white p-6 rounded-lg shadow-md w-3/4 space-y-4">

      <!-- Breadcrumb and Back Button -->
      <div class="flex justify-between items-center space-x-4 mb-6">
        <div class="text-sm text-gray-600">
          <!-- <span>Corporate Documents &gt;&gt; Laporan (Report) &gt;&gt; Laporan Keuangan/Anggaran &gt;&gt;</span> -->
          <span class="font-semibold text-matcha">{{ data.title }}</span>
        </div>
        <button @click="goBack" class="bg-matcha text-lempung-100 px-4 py-2 rounded-lg text-xs">
          BACK
        </button>
      </div>

      <!-- Document Details Table -->
      <table class="w-full table-auto">
        <tbody>
          <!-- Code -->
          <!-- <tr>
            <td class="py-1 font-semibold text-gray-800 text-xs">Code</td>
            <td class="px-2 text-gray-600 text-xs">:</td>
            <td class="py-1 text-gray-600 text-xs">{{ document.code }}</td>
          </tr> -->

          <!-- Date -->
          <tr>
            <td class="py-1 font-semibold text-gray-800 text-xs">Date</td>
            <td class="px-2 text-gray-600 text-xs">:</td>
            <td class="py-1 text-gray-600 text-xs">{{ data.document_date }}</td>
          </tr>

          <!-- Title -->
          <tr>
            <td class="py-1 font-semibold text-gray-800 text-xs">Title</td>
            <td class="px-2 text-gray-600 text-xs">:</td>
            <td class="py-1 text-gray-600 text-xs">{{ data.title }}</td>
          </tr>

          <!-- Description -->
          <tr>
            <td class="py-1 font-semibold text-gray-800 text-xs">Description</td>
            <td class="px-2 text-gray-600 text-xs">:</td>
            <td class="py-1 text-gray-600 text-xs">{{ data.description }}</td>
          </tr>

          <!-- Originator -->
          <!-- <tr>
            <td class="py-1 font-semibold text-gray-800 text-xs">Originator</td>
            <td class="px-2 text-gray-600 text-xs">:</td>
            <td class="py-1 text-gray-600 text-xs">{{ data.originator }}</td>
          </tr> -->

          <!-- Sharing Department -->
          <!-- <tr>
            <td class="py-1 font-semibold text-gray-800 text-xs">Sharing Position</td>
            <td class="px-2 text-gray-600 text-xs">:</td>
            <td class="py-1 text-gray-600 text-xs">
              <div class="flex flex-wrap space-x-2">
                <span v-for="dept in document.sharingDepartment" :key="dept"
                  class="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                  {{ dept }}
                </span>
              </div>
            </td>
          </tr> -->

          <!-- Location -->
          <!-- <tr>
            <td class="py-1 font-semibold text-gray-800 text-xs">Location</td>
            <td class="px-2 text-gray-600 text-xs">:</td>
            <td class="py-1 text-gray-600 text-xs">{{ document.location }}</td>
          </tr> -->

          <!-- Created By -->
          <tr>
            <td class="py-1 font-semibold text-gray-800 text-xs">Created By</td>
            <td class="px-2 text-gray-600 text-xs">:</td>
            <td class="py-1 text-gray-600 text-xs">{{ data.created_by }}</td>
          </tr>

          <!-- Created At -->
          <tr>
            <td class="py-1 font-semibold text-gray-800 text-xs">Created At</td>
            <td class="px-2 text-gray-600 text-xs">:</td>
            <td class="py-1 text-gray-600 text-xs">{{ data.created_at }}</td>
          </tr>

          <!-- Updated At -->
          <tr>
            <td class="py-1 font-semibold text-gray-800 text-xs">Updated At</td>
            <td class="px-2 text-gray-600 text-xs">:</td>
            <td class="py-1 text-gray-600 text-xs">{{ data.updated_at }}</td>
          </tr>

          <!-- Updated By -->
          <tr>
            <td class="py-1 font-semibold text-gray-800 text-xs">Updated By</td>
            <td class="px-2 text-gray-600 text-xs">:</td>
            <td class="py-1 text-gray-600 text-xs">{{ data.updated_by }}</td>
          </tr>

          <!-- Document Date -->
          <tr>
            <td class="py-1 font-semibold text-gray-800 text-xs">Document Date</td>
            <td class="px-2 text-gray-600 text-xs">:</td>
            <td class="py-1 text-gray-600 text-xs">{{ data.document_date }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Download Link -->
      <div class="mt-4">
        <a href="#" @click="download(data)" class="text-matcha hover:underline text-xs">
          <span>{{ data.files.file_name }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useHandlerStore } from '~/stores/handler';

const emit = defineEmits(['goBack']);
const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  }
})

const handlerStore = useHandlerStore();

// Function
const download = (data) => {
  const fileName = data.files.file_name;
  console.log(fileName);
  handlerStore.downloadFile(data.id, fileName)
}
const goBack = () => {
  // Logic for going back (you can route back to a previous page, for example)
  emit('goBack')
};
</script>

<style scoped>
/* Table Styling */
table {
  border-collapse: collapse;
}

td {
  padding: 0.5rem;
  /* Reduced padding for smaller rows */
}

tr {
  border-bottom: 1px solid #e2e8f0;
}

tr:hover {
  background-color: #f1f5f9;
}

/* Tag Styling for Sharing Department */
.bg-orange-500 {
  background-color: #f97316;
  /* Tailwind orange color */
}

.text-xs {
  font-size: 0.75rem;
}

.font-semibold {
  font-weight: 600;
}

.text-gray-600 {
  color: #4b5563;
}

.text-gray-800 {
  color: #1f2937;
}

/* Download link Styling */
.text-blue-600 {
  color: #3182ce;
}

.text-gray-500 {
  color: #6b7280;
}

.hover\:underline:hover {
  text-decoration: underline;
}

/* Back Button Styling */
button {
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
