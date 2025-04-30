<template>
  <li>
    <button @click="toggle"
      class="group flex items-center w-full text-left text-xs font-medium text-gray-800 hover:bg-matcha hover:rounded-md px-2 py-[1px] hover:text-lempung-100">
      <!-- Expand/Collapse Icon (Show Only If Folder Has Children) -->
      <div class="w-5 h-5 flex items-center justify-center mr-2">
        <component v-if="children.length" :is="isOpen ? MinusCircleIcon : PlusCircleIcon"
          class="w-5 h-5 text-matcha group-hover:text-lempung-100 transition-colors" />
      </div>

      <!-- Folder Icon -->
      <FolderOuterIcon class="text-lempung group-hover:text-lempung-100 transition-colors" />
      <span class="ml-2 group-hover:text-lempung-100">{{ name }}</span>
    </button>

    <!-- Render Child Folders If Exists -->
    <ul v-if="isOpen && children.length" class="mt-1 ml-6 space-y-1">
      <Folder v-for="(child, index) in children" :key="index" :name="child.name" :children="child.children" />
    </ul>
  </li>
</template>

<script setup>
import { ref } from "vue";
import FolderOuterIcon from "~/assets/icons/FolderOuterIcon.vue";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/vue/24/solid"; // Using Heroicons

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  children: {
    type: Array,
    default: () => [],
  },
});

const isOpen = ref(false);

const toggle = () => {
  if (props.children.length) {
    isOpen.value = !isOpen.value;
  }
};
</script>
