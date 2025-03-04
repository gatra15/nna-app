<template>
  <div class="p-4">
    <ul class="space-y-2">
      <Folder v-for="(folder, index) in treeData" :key="index" :name="folder.name" :children="folder.children" />
    </ul>
  </div>
</template>

<script setup>
import Folder from "./Folder.vue";

const props = defineProps({
  treeData: {
    type: Array,
    required: true,
  },
});
</script>
