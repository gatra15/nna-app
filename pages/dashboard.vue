<template>
  <MasterContainer title="DASHBOARD" sub_title="Dashboard"> </MasterContainer>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

import MasterContainer from "~/components/utilities/MasterContainer.vue";

useHead({
  title: "Dashboard",
});
</script>
