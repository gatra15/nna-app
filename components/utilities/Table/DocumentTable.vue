<template>
  <div class="relative">
    <!-- Table Header Sticky -->
    <div class="overflow-x-auto max-h-96 overflow-y-auto">
      <table class="min-w-full table-auto">
        <thead class="sticky top-0 bg-white z-10">
          <tr class="bg-gray-100">
            <th class="px-4 text-left text-xs">No</th>
            <th class="px-4 text-left text-xs">Title</th>
            <th class="px-4 text-left text-xs">Ket</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="documents.length !== 0">
            <tr
              v-for="(item, index) in documents"
              :key="index"
              class="hover:bg-gray-50 transition-all"
            >
              <td class="px-4 border-b text-xs text-center">
                {{ (page - 1) * perPage + index + 1 }}
              </td>
              <td class="py-1 px-6 border-b">
                <div class="font-semibold text-xs">
                  <a href="#" @click.prevent="viewDocumentDetail(item)">
                    {{ item.title }}
                  </a>
                </div>
                <div class="text-xs text-gray-600 mt-1">
                  {{ item.descriptions }}
                </div>
              </td>
              <td class="py-1 px-6 border-b">
                <div class="text-xs text-gray-500">{{ item.created_by }}</div>
                <div class="text-xs text-gray-500">{{ item.created_at.human }}</div>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="3" class="text-sm items-center text-center">
                Data Tidak ditemukan
              </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer Sticky -->
    <div
      class="sticky bottom-0 z-10 bg-white border-t px-4 py-2 flex justify-between items-center text-xs"
    >
      <button
        @click="$emit('prev-page')"
        :disabled="page <= 1"
        class="text-matcha font-semibold"
      >
        &larr; Prev
      </button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <button
        @click="$emit('next-page')"
        :disabled="page >= totalPages"
        class="text-matcha font-semibold"
      >
        Next &rarr;
      </button>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["openDetail", "prev-page", "next-page"]);

const props = defineProps({
  documents: {
    type: Array,
    required: true,
  },
  page: {
    type: Number,
    default: 1,
  },
  perPage: {
    type: Number,
    default: 10,
  },
  total: {
    type: Number,
    default: 0,
  },
});

const totalPages = computed(() => Math.ceil(props.total / props.perPage));

const viewDocumentDetail = (item) => {
  emit("openDetail", item);
};
</script>

<style scoped>
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
tr {
  border-bottom: 1px solid #e2e8f0;
}
tr:hover {
  background-color: #f1f5f9;
}
a {
  text-decoration: none;
  font-weight: 600;
  color: #39906e;
}
a:hover {
  color: #2c7b5d;
}
.text-xs {
  font-size: 0.75rem;
}
.font-semibold {
  font-weight: 600;
}
</style>
