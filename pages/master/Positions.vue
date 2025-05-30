<template>
  <OuterContainer title="MASTER" sub_title="Position" :is-loading="isLoading">
    <template #content>
      <AddButton @openForm="openForm" />

      <MasterGoodTable
        v-if="statePage === 'table'"
        :columns="columns"
        :rows="items"
        :total-rows="totalRows"
        :per-page="parameter.per_page"
        :current-page="parameter.page"
        @page-change="setPage"
        @per-page-change="setPerPage"
        @search="setSearchQuery"
        @filter-change="setFilters"
      >
        <template #column="{ column, row }">
          <template v-if="column.field === 'actions'">
            <div class="flex space-x-2 justify-center items-center">
              <button
                v-if="hasPermission('position.update')"
                @click="openForm(row)"
                class="p-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100 flex items-center transition"
              >
                <PencilIcon class="w-4 h-4" />
              </button>

              <button
                v-if="hasPermission('position.delete')"
                @click="deletePosition(row)"
                class="p-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100 flex items-center transition"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </template>
        </template>
      </MasterGoodTable>

      <PositionForm
        v-if="statePage == 'form' && !isLoading"
        :position="selectedPosition"
        @save="handleSave"
        @back="statePage = 'table'"
      />
    </template>
  </OuterContainer>
</template>

<script setup>
import OuterContainer from "~/components/app/OuterContainer.vue";
import AddButton from "~/components/utilities/Table/AddButton.vue";
import MasterGoodTable from "~/components/utilities/MasterGoodTable.vue";
import PositionForm from "~/components/positions/PositionForm.vue";

import { computed, ref, onMounted } from "vue";
import { usePaginatedTable } from "~/composables/usePaginatedTable";
import { usePositionStore } from "~/stores/position";
import { useUserStore } from "~/stores/user";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";

// State
const statePage = ref("table");
const selectedPosition = ref(null);

// Store & Data
const positionStore = usePositionStore();
const userStore = useUserStore();
const isLoading = computed(() => positionStore.loading);

const hasPermission = userStore.hasPermission;

// Composable Logic (SOLID)
const {
  parameter,
  items,
  totalRows,
  fetchData: fetchPosition,
  setPage,
  setPerPage,
  setSearchQuery,
  setFilters,
} = usePaginatedTable((params) => positionStore.fetchPosition(params));

// Column
const columns = [
  { field: "id", label: "ID" },
  { field: "name", label: "Name" },
];

// Lifecycle
onMounted(async () => {
  await fetchPosition();
});

// UI Logic
const openForm = (position) => {
  selectedPosition.value = position || null;
  statePage.value = "form";
};

const deletePosition = async (position) => {
  if (confirm("Are you sure you want to delete this permission?")) {
    await positionStore.remove(position.id);
    await fetchPosition();
  }
};

const handleSave = async (position) => {
  if (selectedPosition.value?.id) {
    await positionStore.update(selectedPosition.value.id, position);
  } else {
    await positionStore.create(position);
  }

  statePage.value = "table";
  await fetchPosition();
};

useHead({
  title: "Positions",
});
</script>

<style></style>
