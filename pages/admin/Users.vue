<template>
  <OuterContainer title="ADMIN" sub_title="User" :is-loading="isLoading">
    <template #content>
      <AddButton @open-form="openForm" />

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
          <template v-if="column.field === 'username'">
            <div class="py-1 text-sm text-gray-800">{{ row.username }}</div>
          </template>
          <template v-else-if="column.field === 'email'">
            <div class="py-1 text-sm text-gray-800">{{ row.email }}</div>
          </template>
          <template v-else-if="column.field === 'position_name'">
            <div class="py-1 text-sm text-gray-800">{{ row.position_name }}</div>
          </template>
          <template v-if="column.field === 'actions'">
            <div class="flex space-x-2 justify-center items-center">
              <button
                v-if="hasPermission('user.update')"
                @click="edit(row)"
                class="p-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-100 flex items-center transition"
              >
                <PencilIcon class="w-4 h-4" />
              </button>

              <button
                v-if="hasPermission('user.delete')"
                @click="deleteUser(row)"
                class="p-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-100 flex items-center transition"
              >
                <TrashIcon class="w-4 h-4" />
              </button>
            </div>
          </template>
        </template>
      </MasterGoodTable>

      <UserForm
        v-if="statePage === 'form'"
        :user="selectedUser"
        @save="handleSave"
        @back="() => (statePage = 'table')"
      />
    </template>
  </OuterContainer>
</template>

<script setup>
import OuterContainer from "~/components/app/OuterContainer.vue";
import AddButton from "~/components/utilities/Table/AddButton.vue";
import MasterGoodTable from "@/components/utilities/MasterGoodTable.vue";
import UserForm from "@/components/users/UserForm.vue";

import { ref, onMounted } from "vue";
import { toRefs } from "vue";
import { useUserStore } from "@/stores/user";
import { usePaginatedTable } from "@/composables/usePaginatedTable";
import { PencilIcon, TrashIcon } from "@heroicons/vue/24/solid";

// State
const statePage = ref("table");
const selectedUser = ref(null);

// Store & Data
const userStore = useUserStore();
const isLoading = computed(() => userStore.loading);

const hasPermission = userStore.hasPermission;

// Composable Logic (SOLID)
const {
  parameter,
  items,
  totalRows,
  fetchData: fetchUsers,
  setPage,
  setPerPage,
  setSearchQuery,
  setFilters,
} = usePaginatedTable(userStore.fetchUsers);

// Columns
const columns = [
  { field: "id", label: "ID" },
  { field: "username", label: "Username" },
  { field: "name", label: "Name" },
  { field: "email", label: "Email" },
  { field: "position_name", label: "Position Name" },
];

// Lifecycle
onMounted(async () => {
  await fetchUsers();
});

// UI Logic
const openForm = (user) => {
  selectedUser.value = user || null;
  statePage.value = "form";
};

const deleteUser = async (user) => {
  if (confirm("Are you sure you want to delete this user?")) {
    await userStore.removeUser(user.id);
    await fetchUsers();
  }
};

const handleSave = async (user) => {
  if (selectedUser.value?.id) {
    await userStore.updateUser(selectedUser.value.id, user);
  } else {
    await userStore.addUser(user);
  }
  statePage.value = "table";
  await fetchUsers();
};

// Head
useHead({ title: "Users" });
</script>
