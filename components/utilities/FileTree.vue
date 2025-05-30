<template>
  <div class="p-4">
    <div class="mb-2">
      <button
        @click="clearFilter"
        class="text-xs text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 px-3 py-1 rounded"
      >
        Clear Filter
      </button>
    </div>
    <ul class="space-y-2">
      <Folder
        v-for="(folder, index) in treeData"
        :key="index"
        :id="folder.id"
        :name="folder.name"
        :children="folder.children"
        @filter="emit('filter', $event)"
      />
    </ul>
  </div>
</template>

<script setup>
import Folder from "./Folder.vue";
const props = defineProps({ treeData: Array });
const emit = defineEmits(["filter"]);

const clearFilter = () => {
  emit("filter", {
    category_id: null,
    type_id: null,
  });
};
</script>
