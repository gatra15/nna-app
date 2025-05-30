<template>
  <OuterContainer title="ADMIN" sub_title="Role" :is-loading="isLoading">
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
                v-if="hasPermission('role.update')"
                @click="openForm(row)"
                class="p-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100 flex items-center transition"
              >
                <PencilIcon class="w-4 h-4" />
              </button>

              <button
                v-if="hasPermission('role.delete')"
                @click="deleteRole(row)"
                class="p-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100 flex items-center transition"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </template>
        </template>
      </MasterGoodTable>

      <RoleForm
        v-if="statePage == 'form'"
        :role="selectedRole"
        @save="handleSave"
        @back="() => (statePage = 'table')"
      />
    </template>
  </OuterContainer>
</template>

<script setup>
import OuterContainer from "~/components/app/OuterContainer.vue";
import AddButton from "~/components/utilities/Table/AddButton.vue";
import MasterGoodTable from "~/components/utilities/MasterGoodTable.vue";
import RoleForm from "~/components/roles/RoleForm.vue";

import { ref, onMounted } from "vue";
import { toRefs } from "vue";
import { useRoleStore } from "~/stores/role";
import { useUserStore } from "~/stores/user";
import { usePaginatedTable } from "~/composables/usePaginatedTable";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";

// State
const statePage = ref("table");
const selectedRole = ref(null);

// Store & Data
const roleStore = useRoleStore();
const userStore = useUserStore();

const isLoading = computed(() => roleStore.loading);

const hasPermission = userStore.hasPermission;

// Composable Logic (SOLID)
const {
  parameter,
  items,
  totalRows,
  fetchData: fetchRoles,
  setPage,
  setPerPage,
  setSearchQuery,
  setFilters,
} = usePaginatedTable((params) => roleStore.fetchRoles(params));

// Columns
const columns = [
  { field: "id", label: "ID" },
  { field: "name", label: "Name" },
];

// Lifecycle
onMounted(async () => {
  await fetchRoles();
});

// UI Logic
const openForm = (role) => {
  selectedRole.value = role || null;
  statePage.value = "form";
};

const deleteRole = async (role) => {
  if (confirm("Are you sure you want to delete this role?")) {
    await roleStore.remove(role.id);
    await fetchRoles();
  }
};

const handleSave = async (role) => {
  if (selectedRole.value?.id) {
    await roleStore.update(selectedRole.value.id, role);
  } else {
    await roleStore.create(role);
  }

  statePage.value = "table";
  await fetchRoles();
};

useHead({
  title: "Roles",
});
</script>
