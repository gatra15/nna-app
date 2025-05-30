<script setup>
import { ref, onMounted, watch, computed } from "vue";
import Input from "~/components/utilities/Form/Input.vue";
import ButtonSubmit from "~/components/utilities/ButtonSubmit.vue";
import CheckBox from "../utilities/Form/CheckBox.vue";
import { usePermissionStore } from "~/stores/permission";
import { useRoleStore } from "~/stores/role";

const props = defineProps({ role: Object });
const emit = defineEmits(["save", "back"]);

const roleStore = useRoleStore();
const permissionStore = usePermissionStore();

const buttonText = ref("Submit");
const formData = ref({
  name: "",
  permissions: [],
});

// Hitung grouped permission berdasarkan module
const groupedPermissions = computed(() => {
  const groups = {};
  (permissionStore.options || []).forEach((perm) => {
    const [module] = perm.name.split(".");
    if (!module) return;
    if (!groups[module]) groups[module] = [];
    groups[module].push(perm);
  });
  return groups;
});

const handleModelChange = (params) => {
  formData.value.permissions = params;
};

// Reset form ke default
const resetForm = () => {
  formData.value.name = "";
  formData.value.permissions = [];
  buttonText.value = "Submit";
};

// Load role untuk edit
const loadRole = async (id) => {
  await roleStore.fetchRoleWithPermissions(id);
  const roleData = roleStore.role;
  if (roleData) {
    formData.value.name = roleData.name || "";
    formData.value.permissions = (roleData.permissions || []).map((p) => p.name);
    buttonText.value = "Update";
  }
};

// On mount
onMounted(async () => {
  await permissionStore.fetchOptions();
  if (props.role?.id) await loadRole(props.role.id);
});

// Watch perubahan props.role (edit/add)
watch(
  () => props.role,
  async (newRole) => {
    if (newRole?.id) {
      await loadRole(newRole.id);
    } else {
      resetForm();
    }
  },
  { immediate: true }
);

// Submit
const submitForm = () => emit("save", formData.value);
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <!-- Tombol Kembali -->
    <button
      @click="emit('back')"
      class="flex items-center text-greneon gap-2 p-2 border border-greneon rounded-md hover:bg-green-200 mb-5"
    >
      <span>Kembali</span>
    </button>

    <!-- Judul Form -->
    <h2 class="text-lg font-semibold mb-4">
      {{ props.role?.id ? "Edit Role" : "Add Role" }}
    </h2>

    <!-- Form -->
    <form @submit.prevent="submitForm">
      <!-- Input Nama Role -->
      <div class="mb-6">
        <Input
          label="Role Name"
          placeholder="Enter role name"
          :model-value="formData.name"
          @update:model-value="(val) => (formData.name = val)"
        />
      </div>

      <!-- Permissions -->
      <!-- Permissions -->
      <div class="mb-6">
        <h3 class="text-sm font-semibold text-gray-700 mb-4">Permissions</h3>
        <div
          class="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[33vh] overflow-y-auto pr-2"
        >
          <div
            v-for="(permissions, moduleName) in groupedPermissions"
            :key="moduleName"
            class="border p-4 rounded-md bg-gray-50"
          >
            <h4 class="font-semibold text-gray-800 mb-3 capitalize">
              {{ moduleName }} Module
            </h4>
            <div class="flex flex-col gap-2">
              <CheckBox
                v-for="permission in permissions"
                :key="permission.name"
                :id="permission.name"
                :label="permission.name"
                :value="permission.name"
                :model-value="formData.permissions"
                @update:model-value="handleModelChange"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <ButtonSubmit :text="buttonText" />
    </form>
  </div>
</template>
