<template>
  <OuterContainer title="ADMIN" sub_title="Permission" :isLoading="isLoading">
    <template #content>
      <CoomingSoon />
    </template>
  </OuterContainer>
</template>

<script setup>
import CategoryTable from "~/components/document/CategoryTable.vue";
import CoomingSoon from "~/components/page/CoomingSoon.vue";
import OuterContainer from "~/components/app/OuterContainer.vue";

useHead({
  title: "Permission",
});
</script>
