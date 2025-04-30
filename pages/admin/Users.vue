<template>
  <OuterContainer title="ADMIN" sub_title="User">
    <template #content>
      <div class="fixed bottom-6 right-6">
        <button
          @click="openForm(null)"
          class="text-green-500 hover:text-white border border-green-500 hover:bg-green-500 rounded-full shadow-lg transition duration-300"
        >
          <PlusCircleIcon class="h-10 w-10" />
        </button>
      </div>

      <MasterGoodTable
        v-if="statePage == 'table'"
        :columns="columns"
        :rows="users"
        @edit="openForm"
        @delete="deleteUser"
      />

      <UserForm
        v-if="statePage == 'form'"
        :user="selectedUser"
        @save="handleSave"
        @back="changeState"
      />
    </template>
  </OuterContainer>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import OuterContainer from "~/components/app/OuterContainer.vue";
import MasterGoodTable from "@/components/utilities/MasterGoodTable.vue";
import UserForm from "@/components/users/UserForm.vue";
import { PlusCircleIcon } from "@heroicons/vue/24/solid";

const userStore = useUserStore();
const selectedUser = ref(null);
const statePage = ref("table");

const users = computed(() => userStore.users);

const columns = [
  { field: "id", label: "ID" },
  { field: "username", label: "Username" },
  { field: "name", label: "Name" },
  { field: "email", label: "Email" },
  { field: "position_name", label: "Position Name" },
];

onMounted(async () => {
  await userStore.fetchUsers();
});

const openForm = (user) => {
  selectedUser.value = user || null;
  statePage.value = "form";
};

const changeState = (params) => {
  statePage.value = params;
};

const handleSave = async (user) => {
  if (selectedUser.value?.id) {
    await userStore.updateUser(selectedUser.value.id, user);
  } else {
    await userStore.addUser(user);
  }
  statePage.value = "table";
  await userStore.fetchUsers();
};

const deleteUser = async (user) => {
  if (confirm("Are you sure you want to delete this user?")) {
    await userStore.removeUser(user.id);
    await userStore.fetchUsers();
  }
};

useHead({
  title: "Users",
});
</script>
