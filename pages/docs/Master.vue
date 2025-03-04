<template>
  <MasterContainer title="DOCS" sub_title="Master Docs">
    <template #content>
      <MasterTable :columns="columns" :rows="rows" @edit="editDocs" @delete="delDocs" />
    </template>
  </MasterContainer>
</template>

<script setup>
import { ref } from "vue";
import MasterContainer from "~/components/utilities/MasterContainer.vue";
import MasterTable from "~/components/utilities/MasterTable.vue";

const columns = ref([
  { key: "id", label: "ID" },
  { key: "type", label: "Type" },
  { key: "category", label: "Category" },
]);

const rows = ref([
  { id: 1, type: "Surat Masuk", category: "Surat" },
  { id: 2, type: "Surat Keluar", category: "Surat" },
]);

const editDocs = (user) => {
  console.log("Editing user:", user);
};

const delDocs = (index) => {
  rows.value.splice(index, 1);
};

useHead({
  title: "Master"
})
</script>
