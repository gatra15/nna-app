<template>
  <nav class="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <!-- Home Link -->
      <li class="inline-flex items-center">
        <NuxtLink to="/dashboard" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
          <HomeIcon /> <span class="ml-2">Home</span>
        </NuxtLink>
      </li>

      <!-- Dynamic Breadcrumb Items -->
      <li v-for="(crumb, index) in breadcrumbs" :key="index" :aria-current="index === breadcrumbs.length - 1 ? 'page' : null">
        <div class="flex items-center">
          <ChevronIcon />
          
          <!-- Link for all items except the last one -->
          <NuxtLink 
            v-if="index !== breadcrumbs.length - 1"
            :to="crumb.path"
            class="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
          >
            {{ crumb.label }}
          </NuxtLink>

          <!-- Last breadcrumb (current page, no link) -->
          <span v-else class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
            {{ crumb.label }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";
import HomeIcon from "~/assets/icons/HomeIcon.vue";
import ChevronIcon from "~/assets/icons/ChevronIcon.vue";

const route = useRoute();

// Generate dynamic breadcrumb paths
const breadcrumbs = computed(() => {
  const pathArray = route.path.split("/").filter((p) => p);
  return pathArray.map((segment, index) => {
    return {
      label: segment.charAt(0).toUpperCase() + segment.slice(1), // Capitalize first letter
      path: "/" + pathArray.slice(0, index + 1).join("/"), // Generate full path
    };
  });
});
</script>
