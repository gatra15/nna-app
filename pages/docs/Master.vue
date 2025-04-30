<template>
  <OuterContainer title="DOC" sub_title="Master Data" :isLoading="isLoading">
    <template #content>
      <CategoryTable />
    </template>
  </OuterContainer>
</template>

<script setup>
import CategoryTable from "~/components/document/CategoryTable.vue";
import OuterContainer from "~/components/app/OuterContainer.vue";

useHead({
  title: "Doc Master",
});
</script>
