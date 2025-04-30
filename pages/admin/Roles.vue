<template>
  <OuterContainer title="ROLE" sub_title="User" :isLoading="isLoading">
    <template #content> <CoomingSoon /> </template>
  </OuterContainer>
</template>

<script setup>
import OuterContainer from "~/components/app/OuterContainer.vue";
import CoomingSoon from "~/components/page/CoomingSoon.vue";

useHead({
  title: "Role",
});
</script>
