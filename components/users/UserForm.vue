<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import { ArrowLeftIcon } from "@heroicons/vue/24/solid";
import { usePositionStore } from "~/stores/position";
import { useRoleStore } from "~/stores/role";
import { useUserStore } from "~/stores/user";
import BaseInput from "~/components/utilities/BaseInput";
import Email from "~/components/utilities/Form/Email.vue";
import Input from "~/components/utilities/Form/Input.vue";
import Select from "~/components/utilities/Form/Select.vue";
import BaseMultipleSelect from "~/components/utilities/BaseMultipleSelect.vue";
import ButtonSubmit from "~/components/utilities/ButtonSubmit";

const props = defineProps({ user: Object });
const emit = defineEmits(["save", "back"]);

const positionStore = usePositionStore();
const roleStore = useRoleStore();
const userStore = useUserStore();

const buttonText = ref("Submit");
const formData = ref({
  username: "",
  name: "",
  email: "",
  password: "",
  state: 1,
  position_id: "",
  roles: [],
});

const onChangeEmail = (val) => {
  formData.value.email = val
}
const onChangeName = (val) => {
  formData.value.name = val
}
const onChangePosition = (val) => {
  formData.value.position_id = parseInt(val)
}
const onChangeState = (val) => {
  formData.value.state = val
}
const onChangeUsername = (val) => {
  formData.value.username = val
}
const submitForm = () => {
  emit("save", formData.value);
};

onMounted(() => {
  roleStore.fetchOptions();
  positionStore.getOption();
})
</script>

<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <button @click="emit('back', 'table')"
      class="flex items-center text-greneon gap-2 p-2 border border-greneon rounded-md hover:bg-green-200 mb-5">
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
          <Input label="Full Name" placeholder="Enter your full name" :model-value="formData.name"
            @update:model-value="onChangeName" />
        </div>
        <div class="w-full">
          <Input label="Username" placeholder="Enter your username" :model-value="formData.username"
            @update:model-value="onChangeUsername" />
        </div>
        <div class="w-full">
          <Email label="Email" placeholder="Enter your email" :model-value="formData.email"
            @update:model-value="onChangeEmail" />
        </div>
        <div class="w-full">
          <BaseMultipleSelect v-model="formData.roles" :options="roleStore.options" label="Roles"
            placeholder="Select roles.." />
        </div>
        <div class="w-full">
          <Select label="Position" placeholder="Select position.." :options="positionStore.options"
            :model-value="formData.position_id" @update:model-value="onChangePosition" />
        </div>
        <div class="w-full">
          <Select label="State" placeholder="Select state.." :model-value="formData.state"
            :options="userStore.stateOptions" @update:model-value="onChangeState" />
        </div>
      </div>
      <div>
        <ButtonSubmit :text="buttonText" />
      </div>
    </form>
  </div>
</template>
