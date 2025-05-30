<template>
  <li>
    <button
      @click="handleClick"
      class="group flex items-center w-full text-left text-xs font-medium text-gray-800 hover:bg-matcha hover:rounded-md px-2 py-[1px] hover:text-lempung-100"
    >
      <div class="w-5 h-5 flex items-center justify-center mr-2">
        <component
          v-if="children.length"
          :is="isOpen ? MinusCircleIcon : PlusCircleIcon"
          class="w-5 h-5 text-matcha group-hover:text-lempung-100 transition-colors"
        />
      </div>

      <FolderOuterIcon
        class="text-lempung group-hover:text-lempung-100 transition-colors"
      />
      <span class="ml-2 group-hover:text-lempung-100">{{ name }}</span>
    </button>

    <ul v-if="isOpen && children.length" class="mt-1 ml-6 space-y-1">
      <Folder
        v-for="(child, index) in children"
        :key="index"
        :id="child.id"
        :name="child.name"
        :children="child.children"
        :category-id="id"
        @filter="emit('filter', $event)"
      />
    </ul>
  </li>
</template>

<script setup>
import { ref } from "vue";
import FolderOuterIcon from "~/assets/icons/FolderOuterIcon.vue";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/vue/24/solid";

const props = defineProps({
  id: { type: Number, required: true }, // id untuk folder ini
  name: { type: String, required: true },
  children: { type: Array, default: () => [] },
  categoryId: { type: Number, default: null }, // hanya akan dipakai di child
});

const emit = defineEmits(["filter"]);
const isOpen = ref(false);

const toggle = () => {
  if (props.children.length) {
    isOpen.value = !isOpen.value;
  }
};

const handleClick = () => {
  // Jika parent (punya children)
  if (props.children.length) {
    emit("filter", {
      category_id: props.id,
      type_id: null,
    });
  } else {
    emit("filter", {
      category_id: props.categoryId,
      type_id: props.id,
    });
  }
  toggle();
};
</script>
