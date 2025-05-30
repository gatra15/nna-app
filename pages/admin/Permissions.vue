<template>
  <OuterContainer title="ADMIN" sub_title="Permission" :is-loading="isLoading">
    <template #content>
      <AddButton @openForm="openForm" />

      <MasterGoodTable
        v-if="statePage == 'table'"
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
                v-if="hasPermission('permission.update')"
                @click="openForm(row)"
                class="p-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100 flex items-center transition"
              >
                <PencilIcon class="w-4 h-4" />
              </button>

              <button
                v-if="hasPermission('permission.delete')"
                @click="deletePermission(row)"
                class="p-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100 flex items-center transition"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </template>
        </template>
      </MasterGoodTable>

      <PermissionForm
        v-if="statePage === 'form'"
        :permission="selectedPermission"
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
import PermissionForm from "~/components/permission/PermissionForm.vue";

import { ref, onMounted } from "vue";
import { usePaginatedTable } from "~/composables/usePaginatedTable";
import { usePermissionStore } from "~/stores/permission";
import { useUserStore } from "~/stores/user";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";

// State
const statePage = ref("table");
const selectedPermission = ref(null);

// Store & Data
const permissionStore = usePermissionStore();
const userStore = useUserStore();
const isLoading = computed(() => permissionStore.loading);

const hasPermission = userStore.hasPermission;

// Composable Logic (SOLID)
const {
  parameter,
  items,
  totalRows,
  fetchData: fetchAll,
  setPage,
  setPerPage,
  setSearchQuery,
  setFilters,
} = usePaginatedTable((params) => permissionStore.fetchAll(params));

// Columns
const columns = [
  { field: "id", label: "ID" },
  { field: "name", label: "Name" },
];

// Lifecycle
onMounted(async () => {
  await fetchAll();
});

// UI Logic
const openForm = (permission) => {
  selectedPermission.value = permission || null;
  statePage.value = "form";
};

const deletePermission = async (permission) => {
  if (confirm("Are you sure you want to delete this permission?")) {
    await permissionStore.remove(permission.id);
    await fetchAll();
  }
};

const handleSave = async (permission) => {
  if (selectedPermission.value?.id) {
    await permissionStore.update(selectedPermission.value.id, permission);
  } else {
    await permissionStore.create(permission);
  }

  statePage.value = "table";
  await fetchAll();
};

useHead({
  title: "Permission",
});
</script>
