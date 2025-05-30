<template>
  <OuterContainer title="DOCS" sub_title="Shared" :is-loading="isLoading">
    <!-- Table -->
    <template #content>
      <DocumentTable :documents="documentStore.documents" @open-detail="openDetail" />
      <Modal :isOpen="isOpen" @go-back="closeModal()" :data="documentStore.document" />
    </template>
  </OuterContainer>
  <!-- Modal -->
</template>

<script setup>
import OuterContainer from "~/components/app/OuterContainer.vue";
import DocumentTable from "~/components/utilities/Table/DocumentTable.vue";
import Modal from "~/components/utilities/Modal.vue";

import { onMounted, computed, ref, watch } from "vue";
import { usePaginatedTable } from "~/composables/usePaginatedTable";
import { useCategoryStore } from "~/stores/category";
import { useDocumentStore } from "~/stores/document";
import { useUserStore } from "~/stores/user";

// State
const statePage = ref("table");
const selectedDocument = ref(null);

// Store & Data
const documentStore = useDocumentStore();

const isLoading = ref(true);
const isModalOpen = ref(false);
const isOpen = ref(false);

// Composable Logic (SOLID)

// Column

// LifeCycle
onMounted(async () => {
  await documentStore.getDocumentShare("user");
  isLoading.value = false;
});

// UI Logic
const closeModal = () => {
  isOpen.value = false;
};
const openDetail = (item) => {
  isOpen.value = true;
  documentStore.getById(item.document_id);
};

useHead({
  title: "Shared",
});
</script>
