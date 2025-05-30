<template>
  <FolderContainer :statePage="statePage" title="DOCS" sub_title="My Docs">
    <!-- Tree Folder -->
    <template #tree>
      <div v-if="isLoading">Loading folders...</div>
      <FileTree :treeData="category" @filter="handleFolderFilter" />
    </template>

    <!-- Table -->
    <template #table>
      <div v-if="isLoading">Loading folders...</div>
      <DocumentTable
        :documents="items"
        :page="parameter.page"
        :perPage="parameter.per_page"
        :total="totalRows"
        @open-detail="openDetail"
        @prev-page="setPage(parameter.page - 1)"
        @next-page="setPage(parameter.page + 1)"
      />
    </template>
    <template #content>
      <AddButton @openForm="openAddModal" />
      <ModalForm
        :isModalOpen="isModalOpen"
        :title="isEdit ? 'Edit Document' : 'Add Document'"
        @closeModal="closeModalForm"
        @submit="submit"
      >
        <template #left>
          <Input
            label="Title"
            :model-value="form.title"
            name="title"
            @update:model-value="onChangeTitle"
          />
          <DatePicker
            label="Date"
            :model-value="form.document_date"
            name="document_date"
            @update:model-value="onChangeDocumentDate"
          />
          <Select
            label="Category"
            :model-value="form.category"
            name="category"
            @update:model-value="onChangeCategory"
            :options="categoryStore.options"
          />
          <BaseMultipleSelect
            label="Share User"
            placeholder="Select share user.."
            v-model="form.shared_users"
            :options="userStore.options"
          />
        </template>
        <template #combined>
          <Upload
            placeholder="Upload or Drag Document"
            :modal-value="form.files"
            name="files"
            @update:modal-value="onChangeFiles"
          />
        </template>
        <template #right>
          <TextArea
            label="Description"
            :model-value="form.descriptions"
            name="description"
            @update:model-value="onChangeDescription"
          />
          <Select
            label="Type"
            :model-value="form.type"
            name="type"
            @update:model-value="onChangeType"
            :options="typeList"
          />
          <BaseMultipleSelect
            label="Share Position"
            placeholder="Select share position.."
            v-model="form.shared_positions"
            :options="positionStore.options"
          />
        </template>
      </ModalForm>
      <Modal
        :data="selectedDoc"
        :isOpen="isOpen"
        @edit="openEditModal"
        @go-back="closeModal"
      />
    </template>
  </FolderContainer>
  <!-- Modal -->
</template>

<script setup>
useHead({
  title: "My Docs",
});

// Utilities
import FolderContainer from "~/components/utilities/FolderContainer.vue";
import FileTree from "~/components/utilities/FileTree.vue";
import Modal from "~/components/utilities/Modal.vue";
import ModalForm from "~/components/utilities/ModalForm.vue";

// Form
import DatePicker from "~/components/utilities/Form/DatePicker.vue";
import Input from "~/components/utilities/Form/Input.vue";
import Select from "~/components/utilities/Form/Select.vue";
import TextArea from "~/components/utilities/Form/TextArea.vue";
import Upload from "~/components/utilities/Form/Upload.vue";

// Table
import DocumentTable from "~/components/utilities/Table/DocumentTable.vue";

// Component State & Function
import { ref, onMounted } from "vue";
import { usePaginatedTable } from "~/composables/usePaginatedTable";
import { useCategoryStore } from "~/stores/category";
import { useDocumentStore } from "~/stores/document";
import { usePositionStore } from "~/stores/position";
import { useTypeStore } from "~/stores/type";
import { useUserStore } from "~/stores/user";

// Component Icon
import { PlusCircleIcon } from "@heroicons/vue/24/solid";
import AddButton from "~/components/utilities/Table/AddButton.vue";
import BaseMultipleSelect from "~/components/utilities/BaseMultipleSelect.vue";

// State
const isEdit = ref(false);
const isModalOpen = ref(false);
const isOpen = ref(false);
const isSubmitting = ref(false);
const statePage = ref("table");
const selectedDoc = ref(null);

// Store & Data
const categoryStore = useCategoryStore();
const documentStore = useDocumentStore();
const positionStore = usePositionStore();
const typeStore = useTypeStore();
const userStore = useUserStore();

const category = computed(() => categoryStore.folder);
const isLoading = computed(() => documentStore.loading);
const typeList = computed(() => {
  return form.value.category !== 0
    ? typeStore.options.filter((type) => type.foreign_id === form.value.category)
    : [];
});

const defaultForm = () => ({
  title: "",
  descriptions: "",
  type: 0,
  category: 0,
  files: null,
  document_date: "",
  shared_users: [],
  shared_positions: [],
});

const form = ref(defaultForm());

const resetForm = () => {
  form.value = defaultForm();
};

const hasPermission = userStore.hasPermission;

// Composable Logic (SOLID)
const {
  parameter,
  items,
  totalRows,
  fetchData: fetchData,
  setPage,
  setPerPage,
  setSearchQuery,
  setFilters,
} = usePaginatedTable((params) => documentStore.fetchData(params));

// Lifecycle
onMounted(async () => {
  await fetchData();
  await categoryStore.getFolder();
  await categoryStore.getOptions();
  await positionStore.getOptions();
  await typeStore.fetchTypes();
  await typeStore.getOptions();
  await userStore.getOptions();
  isLoading.value = false;
});

// UI Logic
const closeModal = () => {
  isOpen.value = false;
};
const closeModalForm = () => {
  isModalOpen.value = false;
  resetForm();
};
const handleFolderFilter = async ({ category_id, type_id }) => {
  const filters = { category_id };
  if (type_id) filters.type_id = type_id;

  console.log(filters);

  setFilters(filters);
  setPage(1);
  await fetchData();
};
const openDetail = async (item) => {
  isOpen.value = true;
  selectedDoc.value = item;
};
const openAddModal = () => {
  resetForm();
  isEdit.value = false;
  isModalOpen.value = true;
};
const openEditModal = (document) => {
  form.value = {
    title: document.title ?? "",
    descriptions: document.descriptions ?? "",
    type: document.type.id ?? 0,
    category: document.category.id ?? 0,
    files: document.files ?? null,
    document_date: document.document_date.edited ?? "",
    shared_users: document.shared_users ?? [],
    shared_positions: document.shared_positions ?? [],
  };
  isEdit.value = true;
  isModalOpen.value = true;
  isOpen.value = false;
};

const submit = async () => {
  if (!form.value.title || !form.value.document_date || !form.value.category) {
    alert("Please fill out all required fields.");
    return;
  }

  isSubmitting.value = true;
  try {
    if (isEdit.value) {
      const id = selectedDoc.value.id;
      if (!id) {
        alert("ID is missing for update.");
        return;
      }
      await documentStore.updateData(id, form.value);
    } else {
      await documentStore.addData(form.value);
    }
    await fetchData();
  } finally {
    isSubmitting.value = false;
    isModalOpen.value = false;
  }
};
const onChangeCategory = (val) => {
  form.value.category = parseInt(val, 10);
};
const onChangeDescription = (val) => {
  form.value.descriptions = val;
};
const onChangeDocumentDate = (val) => {
  form.value.document_date = val;
};
const onChangeFiles = (val) => {
  form.value.files = val;
};
const onChangeShareUser = (val) => {
  form.value.shared_users = parseInt(val, 10);
};
const onChangeSharePosition = (val) => {
  form.value.shared_positions = parseInt(val, 10);
};
const onChangeTitle = (val) => {
  form.value.title = val;
};
const onChangeType = (val) => {
  form.value.type = parseInt(val, 10);
};
</script>
