<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { VueGoodTable } from "vue-good-table-next";
import "vue-good-table-next/dist/vue-good-table-next.css";

const props = defineProps({
  columns: Array,
  rows: Array,
  totalRows: {
    type: Number,
    default: 0,
  },
  perPage: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits([
  "edit",
  "delete",
  "filter-change",
  "page-change",
  "per-page-change",
  "search",
]);

// Reactive local pagination state
const paginationOptions = ref({
  enabled: true,
  perPage: props.perPage,
  currentPage: props.currentPage,
  total: props.totalRows,
  perPageDropdown: [10, 20, 50],
  dropdownAllowAll: false,
  mode: "records",
});

// Emit events and update paginationOptions on user interaction
const onPageChange = ({ currentPage }) => {
  paginationOptions.value.currentPage = currentPage;
  emit("page-change", currentPage);
};

const onPerPageChange = ({ currentPerPage }) => {
  paginationOptions.value.perPage = currentPerPage;
  emit("per-page-change", currentPerPage);
};
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md table-container">
    <VueGoodTable
      :columns="[
        ...props.columns,
        { label: 'Actions', field: 'actions', sortable: false },
      ]"
      :fixed-header="true"
      :fixed-footer="true"
      :rows="props.rows"
      :total-rows="props.totalRows"
      :pagination-options="paginationOptions"
      :search-options="{ enabled: true, placeholder: 'Search...' }"
      max-height="58vh"
      v-on:page-change="onPageChange"
      v-on:per-page-change="onPerPageChange"
      v-on:search="(query) => emit('search', query)"
      v-on:column-filter="(filters) => emit('filter-change', filters)"
      class="border rounded-lg text-sm leading-3 justify-center"
    >
      <template #table-row="{ column, row, index }">
        <template v-if="column.field === 'id'">
          <div class="py-1 pl-2 text-gray-800 text-sm">{{ index + 1 }}</div>
        </template>
        <template v-if="column.field === 'name'">
          <div class="py-1 pl-2 text-gray-800 text-sm">{{ row.name }}</div>
        </template>
        <slot name="column" :column="column" :row="row" />
      </template>
    </VueGoodTable>
  </div>
</template>

<style scoped>
::v-deep(.footer__row-count__select) {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  background: transparent;
  background-image: none !important;
  padding-right: 2rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  position: relative;
  font-size: 0.875rem;
  color: #333;
}

::v-deep(.vgt-table td) {
  padding: 5px;
}
</style>
