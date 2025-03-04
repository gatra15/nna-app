<template>
  <FolderContainer title="DOCS" sub_title="My Docs">
    <!-- Tree Folder -->
    <template #tree>
      <FileTree :treeData="folders" />
    </template>

    <!-- Table -->
    <template #table>
      <FileTable :files="files" />
    </template>
  </FolderContainer>
</template>

<script setup>
import FolderContainer from "~/components/utilities/FolderContainer.vue";
import FileTree from "~/components/utilities/FileTree.vue";
import FileTable from "~/components/utilities/FileTable.vue";
import { useFolderStore } from "~/stores/folder";

const folderStore = useFolderStore();
const folders = folderStore.folders; // Get folders from Pinia store

const files = [
  { name: "report.pdf", size: "2MB", type: "PDF" },
  { name: "image.jpg", size: "1.5MB", type: "Image" },
  { name: "document.docx", size: "800KB", type: "Word" },
];

useHead({
  title: "My Docs"
})
</script>
