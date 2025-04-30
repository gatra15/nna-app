<template>
  <OuterContainer title="Dashboard" sub_title="Dasboard" :isLoading="isLoading">
    <template #content>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full mt-5">
        <GridCard title="title 1" desc="desc 1" />
        <GridCard title="title 2" desc="desc 1" />
        <GridCard title="title 3" desc="desc 1" />
        <GridCard title="title 4" desc="desc 1" />
      </div>
    </template>
  </OuterContainer>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});

import OuterContainer from "~/components/app/OuterContainer.vue";
import GridCard from "~/components/utilities/GridCard.vue";

const isLoading = ref(false);

useHead({
  title: "Dashboard",
});
</script>
