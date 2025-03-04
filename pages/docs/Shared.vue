<template>
    <MasterContainer title="DOCS" sub_title="Shared with me">
        <template #content>
            <MasterTable :columns="columns" :rows="rows" />
        </template>
    </MasterContainer>
</template>

<script setup>
import { ref } from "vue";
import MasterContainer from "~/components/utilities/MasterContainer.vue";
import MasterTable from "~/components/utilities/MasterTable.vue";

const columns = ref([
    { key: "document", label: "Documents" },
    { key: "modified", label: "Modified" },
]);

const rows = ref([
    { document: "Surat Masuk", modified: "by admin at 07 Feb 2025" },
    { document: "Surat Keluar", modified: "by admin at 07 Feb 2025" },
]);

const editDocs = (user) => {
    console.log("Editing user:", user);
};

const delDocs = (index) => {
    rows.value.splice(index, 1);
};

useHead({
  title: "Shared"
})
</script>
