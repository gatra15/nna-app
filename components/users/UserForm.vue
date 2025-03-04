<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import BaseInput from "~/components/utilities/BaseInput";
import BaseMultipleSelect from "~/components/utilities/BaseMultipleSelect.vue";
import ButtonSubmit from "~/components/utilities/ButtonSubmit";

const props = defineProps({ user: Object });
const emit = defineEmits(["save", "back"]);

const formData = ref({
  username: "",
  name: "",
  email: "",
  password: "",
  state: 1,
  position_id: "",
  roles: [],
});

watch(
  () => props.user,
  (newValue) => {
    formData.value = newValue
      ? { ...newValue }
      : {
          username: "",
          name: "",
          email: "",
          state: "",
          position_id: "",
          roles: [],
        };
  },
  { immediate: true }
);

const rolesOptions = [
  { value: "Administrator", name: "Administrator" },
  { value: "User", name: "User" },
  { value: "Director", name: "Director" },
  { value: "Manager", name: "Manager" },
  { value: "Staff", name: "Staff" },
];

const stateOptions = [
  { value: 1, name: "active" },
  { value: 2, name: "inactive" },
];

const positionOptions = [
  { value: 1, name: "Director" },
  { value: 2, name: "Manager" },
  { value: 3, name: "Staff" },
  { value: 4, name: "Other" },
];

const submitForm = () => {
  emit("save", formData.value);
};

const buttonText = ref("Submit");
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <button
      @click="emit('back', 'table')"
      class="flex items-center text-greneon gap-2 p-2 border border-greneon rounded-md hover:bg-green-200 mb-5"
    >
      <ArrowLeftIcon class="w-6 h-6 text-greneon" />
      <span>Back</span>
    </button>
    <h2 class="text-lg font-semibold mb-4">
      {{ user?.id ? "Edit User" : "Add User" }}
    </h2>

    <!-- Form -->
    <form @submit.prevent="submitForm">
      <div class="grid gap-4 sm:grid-cols-2 sm:gap-6 mb-10">
        <div class="w-full">
          <BaseInput
            v-model="formData.name"
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
          />
        </div>
        <div class="w-full">
          <BaseInput
            v-model="formData.username"
            type="text"
            label="Username"
            placeholder="Enter your username"
          />
        </div>
        <div class="w-full">
          <BaseInput
            v-model="formData.email"
            type="email"
            label="Email"
            placeholder="Enter your email"
          />
        </div>
        <div class="w-full">
          <BaseMultipleSelect
            v-model="formData.roles"
            :options="rolesOptions"
            label="Roles"
            placeholder="Select roles.."
          />
        </div>
        <div class="w-full">
          <BaseInput
            v-model="formData.position_id"
            :options="positionOptions"
            label="Position"
            type="select"
            placeholder="Select position.."
          />
        </div>
        <div class="w-full">
          <BaseInput
            v-model="formData.state"
            :options="stateOptions"
            label="State"
            type="select"
            placeholder="Select state.."
          />
        </div>
      </div>
      <div><ButtonSubmit :text="buttonText" /></div>
    </form>
  </div>
</template>
