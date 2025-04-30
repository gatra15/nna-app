<template>
  <OuterContainer title="DOCS" sub_title="Shared">
    <!-- Table -->
    <template #content>
      <DocumentTable :documents="documentStore.documents" @open-detail="openDetail" />
      <Modal :isOpen="isOpen" @go-back="closeModal()" :data="documentStore.document" />
    </template>
  </OuterContainer>
  <!-- Modal -->
</template>

<script setup>
import DocumentTable from "~/components/utilities/Table/DocumentTable.vue";
import Modal from "~/components/utilities/Modal.vue";
import OuterContainer from "~/components/app/OuterContainer.vue";
import { useCategoryStore } from "~/stores/category";
import { useDocumentStore } from "~/stores/document";
import { useUserStore } from "~/stores/user";
import { onMounted, computed, ref, watch } from "vue";

// D
const documentStore = useDocumentStore();

// I
const isLoading = ref(true);
const isModalOpen = ref(false);
const isOpen = ref(false);

onMounted(async () => {
  await documentStore.getDocumentShare('user');
  isLoading.value = false;
});
const closeModal = () => {
  isOpen.value = false;
};
const openDetail = (item) => {
  isOpen.value = true
  documentStore.getById(item.document_id)
};

useHead({
  title: "Shared",
});
</script>
