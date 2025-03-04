<template>
  <form class="space-y-4 md:space-y-6" @submit.prevent="handleLogin">
    <div>
      <label for="username" class="block mb-2 text-sm font-medium text-gray-900"
        >Your username</label
      >
      <input
        type="text"
        name="username"
        id="username"
        v-model="username"
        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-greneon focus:border-greneon block w-full p-2.5"
        placeholder="your_username"
        required=""
      />
    </div>
    <div>
      <label
        for="password"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Password</label
      >
      <input
        type="password"
        name="password"
        id="password"
        v-model="password"
        placeholder="password"
        class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-greneon focus:border-greneon block w-full p-2.5"
        required=""
      />
    </div>

    <button
      type="submit"
      class="w-full text-white bg-greneon hover:bg-greneon-200 hover:shadow-lg focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      :disabled="loading"
    >
      {{ loading ? "Sign in..." : "Sign" }}
    </button>
    <p v-if="errorMessage" class="text-red-500 text-sm">
      {{ errorMessage }}
    </p>
    <div class="flex items-center justify-between">
      <div class="flex items-start">
        <p class="text-sm font-light text-gray-500">
          Don’t have an account yet?
          <a href="#" class="font-medium text-green-600 hover:underline">Sign up</a>
        </p>
      </div>
      <a href="#" class="text-sm font-medium text-green-600 hover:underline"
        >Forgot password?</a
      >
    </div>
  </form>
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";

const emit = defineEmits(["submit"]);
const props = defineProps({
  errorMessage: {
    required: true,
  },
  loading: Boolean,
});

const username = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");

const handleLogin = async () => {
  if (!username.value || !password.value) {
    errorMessage.value = "Username and password are required.";
    return;
  }

  loading.value = true;
  errorMessage.value = "";

  try {
    await new Promise((resolve) => {
      emit("submit", {
        username: username.value,
        password: password.value,
        callback: resolve,
      });
    });
    if (props.errorMessage) {
      errorMessage.value = props.errorMessage;
    } else {
      errorMessage.value = "";
    }
  } catch (error) {
    errorMessage.value = error.message || "Login failed.";
  } finally {
    loading.value = false;
  }
};
</script>

<style></style>
