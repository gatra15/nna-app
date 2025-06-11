<template>
  <OuterContainer title="DOCS" sub_title="Shared" :is-loading="isLoading">
    <!-- Table -->
    <template #content>
      <DocumentTable :documents="documentStore.documents" @open-detail="openDetail" />
      <Modal
        :data="selectedDocument"
        :isOpen="isOpen"
        :is-edit="editable"
        :is-delete="deletable"
        @edit="openEditModal"
        @go-back="closeModal"
      />
    </template>
  </OuterContainer>
</template>

<script setup>
import OuterContainer from "~/components/app/OuterContainer.vue";
import DocumentTable from "~/components/utilities/Table/DocumentTable.vue";
import Modal from "~/components/utilities/Modal.vue";
import ModalForm from "~/components/utilities/ModalForm.vue"; // tambahkan jika belum ada

import { onMounted, ref } from "vue";
import { useDocumentStore } from "~/stores/document";

// Store
const documentStore = useDocumentStore();

// State
const editable = ref(false);
const deletable = ref(false);
const isLoading = ref(true);
const isOpen = ref(false); // untuk modal detail
const isModalOpen = ref(false); // untuk modal edit
const selectedDocument = ref(null);
const form = ref(defaultForm());

function defaultForm() {
  return {
    title: "",
    descriptions: "",
    type: 0,
    category: 0,
    files: null,
    document_date: "",
    shared_users: [],
    shared_positions: [],
  };
}

// Lifecycle
onMounted(async () => {
  await documentStore.getDocumentShare("user");
  isLoading.value = false;
});

// Logic
const openDetail = (doc) => {
  selectedDocument.value = doc;
  isOpen.value = true;
};

const closeModal = () => {
  selectedDocument.value = null;
  isOpen.value = false;
};

const openEditModal = (doc) => {
  form.value = {
    title: doc.title ?? "",
    descriptions: doc.descriptions ?? "",
    type: doc.type?.id ?? 0,
    category: doc.category?.id ?? 0,
    files: doc.files ?? null,
    document_date: doc.document_date?.edited ?? "",
    shared_users: doc.shared_users ?? [],
    shared_positions: doc.shared_positions ?? [],
  };
  isModalOpen.value = true;
  isOpen.value = false;
};

const closeModalForm = () => {
  isModalOpen.value = false;
  form.value = defaultForm();
};

const submitEdit = async () => {
  // handle submit edit di sini
  isModalOpen.value = false;
  await documentStore.getDocumentShare("user");
  console.log(documentStore.documents);
};

useHead({ title: "Shared" });
</script>
