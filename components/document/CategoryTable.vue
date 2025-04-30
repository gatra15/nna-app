<template>
  <div class="p-4 bg-white shadow-md rounded-lg">
    <div v-if="categoryStore.loading" class="text-center py-4 text-blue-500">
      Loading data...
    </div>
    <div v-if="categoryStore.error" class="text-center py-4 text-red-500">
      {{ categoryStore.error }}
    </div>

    <BaseTable v-if="!categoryStore.loading && !categoryStore.error">
      <thead>
        <tr class="bg-gray-200">
          <th class="w-1/2 px-4 py-2 border border-gray-300">Kategori</th>
          <th class="w-1/2 px-4 py-2 border border-gray-300">Tipe Dokumen</th>
          <th class="w-16 text-center px-4 py-2 border border-gray-300">
            Aksi
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="category in categoryStore.categories"
          :key="category.id"
        >
          <BaseTableRow :columns="[category.name, '']">
            <template #col-0>
              {{ category.name }}
              <button @click="openEditModal(category, true)" class="ml-5">
                ( <PencilIcon class="w-4 h-4 inline-block text-blue-600" /> )
              </button>
            </template>
            <template #actions>
              <button @click="deleteCategory(category.id)" class="text-red-600">
                <TrashIcon class="w-5 h-5 inline-block" />
              </button>
            </template>
          </BaseTableRow>

          <template v-if="category.children">
            <BaseTableRow
              v-for="(documentType, index) in category.children"
              :key="documentType.id"
              :columns="['↳', documentType.name]"
            >
              <template #col-1>
                {{ documentType.name }}
                <button
                  @click="openEditModal(documentType, false)"
                  class="ml-5"
                >
                  ( <PencilIcon class="w-4 h-4 inline-block text-blue-600" /> )
                </button>
              </template>
              <template #actions>
                <button
                  @click="deleteDocumentType(category, index)"
                  class="text-red-600"
                >
                  <TrashIcon class="w-5 h-5 inline-block" />
                </button>
              </template>
            </BaseTableRow>
          </template>
        </template>
      </tbody>
    </BaseTable>

    <!-- Tombol Tambah Kategori -->
    <button
      @click="addCategory"
      class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
    >
      Tambah Kategori
    </button>

    <!-- Modal -->
    <Modal
      ref="modalCrud"
      title="Edit Data"
      :initialData="selectedItem"
      @submit="saveEdit"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "~/stores/category";
import BaseTable from "~/components/document/master/BaseTable.vue";
import BaseTableRow from "~/components/document/master/BaseTableRow.vue";
import BaseInput from "~/components/utilities/BaseInput";
import Modal from "~/components/utilities/Modal";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/vue/24/solid";

const categoryStore = useCategoryStore();

onMounted(async () => {
  await categoryStore.fetchCategories();
});

const modalCrud = ref(null);
const selectedItem = ref({ id: null, name: "" });
const isEditingCategory = ref(true);

// **Buka Modal untuk Edit Kategori atau Dokumen**
const openEditModal = (item, isCategory = true) => {
  selectedItem.value = { ...item };
  isEditingCategory.value = isCategory;

  if (modalCrud.value) {
    modalCrud.value.openModal();
  }
};

// **Simpan Perubahan**
const saveEdit = async (updatedItem) => {
  if (isEditingCategory.value) {
    await categoryStore.updateCategory(updatedItem.id, {
      name: updatedItem.name,
    });
  } else {
    // Temukan kategori yang memiliki tipe dokumen yang sedang diedit
    const category = categoryStore.categories.find(
      (cat) =>
        cat.children && cat.children.some((doc) => doc.id === updatedItem.id)
    );

    if (category) {
      const documentType = category.children.find(
        (doc) => doc.id === updatedItem.id
      );
      if (documentType) {
        documentType.name = updatedItem.name;
      }
    }
  }
};
</script>
