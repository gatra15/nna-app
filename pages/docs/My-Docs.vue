<template>
  <FolderContainer :statePage="statePage" title="DOCS" sub_title="My Docs">
    <!-- Tree Folder -->
    <template #tree>
      <div v-if="isLoading">Loading folders...</div>
      <FileTree :treeData="category" />
    </template>

    <!-- Table -->
    <template #table>
      <div v-if="isLoading">Loading folders...</div>
      <DocumentTable :documents="documentStore.documents" @open-detail="openDetail" />
    </template>

    <template #content>
      <div class="fixed bottom-10 right-10">
        <button @click="openModal"
          class="text-matcha hover:text-white border border-matcha hover:bg-matcha rounded-full shadow-lg transition duration-300">
          <PlusCircleIcon class="h-10 w-10" />
        </button>
      </div>
      <ModalForm title="Add Document" @closeModal="closeModalForm()" @submit="submit" :isModalOpen="isModalOpen">
        <template #left>
          <Input label="Title" :model-value="form.title" name="title" @update:model-value="onChangeTitle" />
          <DatePicker label="Date" :model-value="form.document_date" name="document_date"
            @update:model-value="onChangeDocumentDate" />
          <Select label="Category" :model-value="form.category" name="category" @update:model-value="onChangeCategory"
            :options="categoryStore.options" />
          <Select label="Type" :model-value="form.type" name="type" @update:model-value="onChangeType"
            :options="typeList" />
        </template>
        <template #combined>
          <Upload placeholder="Upload or Drag Document" :modal-value="form.files" name="files"
            @update:modal-value="onChangeFiles" />
        </template>
        <template #right>
          <TextArea label="Description" :model-value="form.descriptions" name="description"
            @update:model-value="onChangeDescription" />
          <Select label="Share User" :model-value="form.shared_users" name="shared_users"
            @update:model-value="onChangeShareUser" :options="userStore.options" />
          <Select label="Share Position" :model-value="form.shared_positions" name="shared_positions"
            @update:model-value="onChangeSharePosition" :options="positionStore.options" />
        </template>
      </ModalForm>
      <Modal :isOpen="isOpen" @go-back="closeModal()" :data="documentStore.document" />

    </template>
  </FolderContainer>
  <!-- Modal -->
</template>

<script setup>
// import BaseInput from "~/components/utilities/BaseInput.vue";
import DatePicker from "~/components/utilities/Form/DatePicker.vue"
import DocumentTable from "~/components/utilities/Table/DocumentTable.vue";
import FolderContainer from "~/components/utilities/FolderContainer.vue";
import FileTree from "~/components/utilities/FileTree.vue";
import Input from "~/components/utilities/Form/Input.vue";
import Modal from "~/components/utilities/Modal.vue";
import ModalForm from "~/components/utilities/ModalForm.vue";
import Select from "~/components/utilities/Form/Select.vue";
import TextArea from "~/components/utilities/Form/TextArea.vue";
import Upload from "~/components/utilities/Form/Upload.vue";
import { useCategoryStore } from "~/stores/category";
import { useDocumentStore } from "~/stores/document";
import { usePositionStore } from "~/stores/position";
import { useTypeStore } from "~/stores/type";
import { useUserStore } from "~/stores/user";
import { onMounted, computed, ref, watch } from "vue";
import { PlusCircleIcon } from "@heroicons/vue/24/solid";

// C
const columns = [
  { field: "id", label: "ID" },
  { field: "title", label: "Title" },
  { field: "description", label: "Description" },
];
const categoryStore = useCategoryStore();
const category = computed(() => categoryStore.categories);

// D
const documentStore = useDocumentStore();

// F
const form = ref({
  title: "",
  descriptions: "",
  type: 0,
  category: 0,
  files: null,
  document_date: "",
  shared_users: [],
  shared_positions: [],
});

// I
const isLoading = ref(true);
const isModalOpen = ref(false);
const isOpen = ref(false);

// P
const positionStore = usePositionStore();

// T
const typeStore = useTypeStore();
const typeList = computed(() => {
  return form.value.category !== 0 ? typeStore.options.filter((type) => type.foreign_id === form.value.category) : []
})

// U
const userStore = useUserStore();

onMounted(async () => {
  await documentStore.fetchData();
  await categoryStore.fetchCategories();
  await categoryStore.getOption();
  await positionStore.getOption();
  await typeStore.fetchTypes();
  await typeStore.getOption();
  await userStore.getOption();
  isLoading.value = false;
});

watch(() => form.value.category, (newVal) => {
  console.log("Category :", newVal)
})

// Function
const closeModal = () => {
  isOpen.value = false;
};
const closeModalForm = () => {
  isModalOpen.value = false;
};
const openDetail = (item) => {
  isOpen.value = true
  documentStore.getById(item.id)
};
const openModal = () => {
  isModalOpen.value = true;
};
const submit = () => {
  documentStore.addData(form.value).
    then(() => {
      documentStore.fetchData();
    }).finally(() => {
      isModalOpen.value = false
    })
}

// v-model
const onChangeCategory = (val) => {
  form.value.category = parseInt(val, 10)
  const typ = form.value.category !== 0 ? typeStore.options.filter((type) => type.foreign_id === form.value.category) : []
  console.log("typeList: ", typ)
}
const onChangeDescription = (val) => {
  form.value.descriptions = val
}
const onChangeDocumentDate = (val) => {
  form.value.document_date = val
}
const onChangeFiles = (val) => {
  form.value.files = val
}
const onChangeTitle = (val) => {
  form.value.title = val
}
const onChangeType = (val) => {
  form.value.type = val
}

useHead({
  title: "My Docs",
});
</script>
