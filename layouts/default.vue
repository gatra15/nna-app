<template>
  <div class="bg-matcha flex h-screen">
    <Sidebar />
    <main class="ml-56 flex-1 p-4 overflow-y-auto">
      <slot />
      <ChangePasswordModal />
    </main>
  </div>
</template>

<script setup>
import ChangePasswordModal from "~/components/users/ChangePasswordModal.vue";

definePageMeta({
  middleware: "auth",
});

import Sidebar from "~/components/app/Sidebar.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

await useAsyncData("user", () => userStore.loadUser());
</script>

<style></style>
