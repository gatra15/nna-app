<template>
  <OuterContainer title="ADMIN" sub_title="Permission" :isLoading="isLoading">
    <template #content>
      <CoomingSoon />
    </template>
  </OuterContainer>
</template>

<script setup>
import { ref } from "vue";
import OuterContainer from "~/components/app/OuterContainer.vue";
import CoomingSoon from "~/components/page/CoomingSoon.vue";

useHead({
  title: "Permission",
});
</script>
