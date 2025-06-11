<template>
  <div
    v-if="isOpen"
    class="fixed left-56 inset-0 z-50 flex items-center justify-center bg-matcha bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-md w-3/4 space-y-4">
      <!-- Header -->
      <div class="flex justify-between items-center mb-6">
        <div class="text-sm text-gray-600">
          <span class="font-semibold text-matcha">{{ data.title }}</span>
        </div>
        <div class="space-x-2 flex items-center">
          <button
            @click="edit(data)"
            v-if="isEdit && hasPermission('my_doc.update')"
            class="bg-matcha text-white px-4 py-2 rounded-lg text-xs flex items-center justify-center"
          >
            <PencilIcon class="w-4 h-4" />
          </button>
          <button
            @click="destroy(data)"
            v-if="isDelete && hasPermission('my_doc.delete')"
            class="bg-red-600 text-white px-4 py-2 rounded-lg text-xs flex items-center justify-center"
          >
            <TrashIcon class="w-4 h-4" />
          </button>
          <button
            @click="goBack"
            class="bg-matcha text-lempung-100 px-4 py-2 rounded-lg text-xs flex items-center justify-center"
          >
            BACK
          </button>
        </div>
      </div>

      <!-- Document Info -->
      <table class="w-full table-auto">
        <tbody>
          <tr>
            <td class="py-1 font-semibold text-xs">Date</td>
            <td class="px-2 text-xs">:</td>
            <td class="py-1 text-xs">{{ data.document_date.human }}</td>
          </tr>
          <tr>
            <td class="py-1 font-semibold text-xs">Title</td>
            <td class="px-2 text-xs">:</td>
            <td class="py-1 text-xs">{{ data.title }}</td>
          </tr>
          <tr>
            <td class="py-1 font-semibold text-xs">Description</td>
            <td class="px-2 text-xs">:</td>
            <td class="py-1 text-xs">{{ data.descriptions }}</td>
          </tr>
          <tr>
            <td class="py-1 font-semibold text-xs">Created By</td>
            <td class="px-2 text-xs">:</td>
            <td class="py-1 text-xs">{{ data.created_by }}</td>
          </tr>
          <tr>
            <td class="py-1 font-semibold text-xs">Created At</td>
            <td class="px-2 text-xs">:</td>
            <td class="py-1 text-xs">{{ data.created_at?.human }}</td>
          </tr>
          <tr>
            <td class="py-1 font-semibold text-xs">Updated At</td>
            <td class="px-2 text-xs">:</td>
            <td class="py-1 text-xs">{{ data.updated_at?.human }}</td>
          </tr>
          <tr>
            <td class="py-1 font-semibold text-xs">Updated By</td>
            <td class="px-2 text-xs">:</td>
            <td class="py-1 text-xs">{{ data.updated_by }}</td>
          </tr>
        </tbody>
      </table>

      <!-- File List -->
      <div class="mt-4">
        <div v-if="!data.files || data.files.length === 0" class="text-xs text-gray-500">
          No files available.
        </div>
        <div v-else class="space-y-2">
          <div
            v-for="(file, index) in data.files"
            :key="index"
            class="text-xs text-matcha hover:underline cursor-pointer"
            @click="preview(file, data.id)"
          >
            {{ file.file_name }}
          </div>
        </div>
      </div>
    </div>

    <!-- Preview Modal -->
    <div
      v-if="previewFile"
      class="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center"
    >
      <div class="bg-white rounded-xl shadow-lg p-4 w-[80%] h-[90%] relative">
        <h3 class="text-md font-semibold mb-2">{{ previewFile.name }}</h3>
        <iframe
          :src="previewFile.url"
          class="w-full h-full border rounded"
          frameborder="0"
        ></iframe>
        <div class="absolute top-2 right-2 flex gap-2">
          <button
            @click="downloadFileNow"
            class="bg-blue-600 text-white text-xs px-4 py-1 rounded"
          >
            Download
          </button>
          <button
            @click="closePreview"
            class="bg-gray-500 text-white text-xs px-4 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";
import { ref } from "vue";
import { useHandlerStore } from "~/stores/handler";
import { useUserStore } from "~/stores/user";

const emit = defineEmits(["goBack", "edit", "del"]);
const props = defineProps({
  isOpen: Boolean,
  data: Object,
  isEdit: Boolean,
  isDelete: Boolean,
});

const handlerStore = useHandlerStore();
const userStore = useUserStore();
const previewFile = ref(null); // { url, name, id }
const hasPermission = userStore.hasPermission;

const goBack = () => emit("goBack");
const edit = (data) => emit("edit", data);
const destroy = (data) => emit("del", data);

const preview = async (file, documentId) => {
  const url = await handlerStore.getFileUrl(documentId);
  if (url) {
    previewFile.value = {
      url,
      name: file.file_name,
      id: documentId,
    };
  }
};

const closePreview = () => {
  if (previewFile.value?.url) {
    URL.revokeObjectURL(previewFile.value.url);
  }
  previewFile.value = null;
};

const downloadFileNow = () => {
  if (previewFile.value) {
    handlerStore.downloadFile(previewFile.value.id, previewFile.value.name);
  }
};
</script>

<style scoped>
table {
  border-collapse: collapse;
}
td {
  padding: 0.5rem;
}
tr {
  border-bottom: 1px solid #e2e8f0;
}
tr:hover {
  background-color: #f1f5f9;
}
.hover\:underline:hover {
  text-decoration: underline;
}
</style>
