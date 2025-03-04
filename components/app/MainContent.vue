<template>
  <div class="p-4 sm:ml-64">
    <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div class="flex items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800" v-for="i in 3"
          :key="i">
          <p class="text-2xl text-gray-400 dark:text-gray-500">
            <slot name="icon"></slot>
          </p>
        </div>
      </div>
      <div class="flex items-center justify-center h-48 mb-4 rounded-sm bg-gray-50 dark:bg-gray-800">
        <slot name="icon"></slot>
      </div>
    </div>
  </div>
</template>
