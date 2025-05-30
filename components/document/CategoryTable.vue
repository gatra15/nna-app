<template>
  <div class="p-4 bg-white shadow-md rounded-lg">
    <div v-if="categoryStore.loading" class="text-center py-4 text-blue-500">
      Loading data...
    </div>
    <div v-if="categoryStore.error" class="text-center py-4 text-red-500">
      {{ categoryStore.error }}
    </div>

    <!-- Table Scrollable Container -->
    <div class="max-h-[500px] overflow-y-auto">
      <BaseTable
        v-if="!categoryStore.loading && !categoryStore.error && state === 'table'"
      >
        <thead>
          <tr class="bg-gray-200">
            <th class="w-1/2 px-4 py-2 border border-gray-300">Kategori</th>
            <th class="w-1/2 px-4 py-2 border border-gray-300">Tipe Dokumen</th>
            <th class="w-16 text-center px-4 py-2 border border-gray-300">Aksi</th>
          </tr>
        </thead>
        <tbody v-for="category in categoryStore.folder" :key="category.id">
          <BaseTableRow :columns="[category.name, '']">
            <template #col-0>
              {{ category.name }}
              <button @click="openEditModal(category, true)" class="ml-5">
                (
                <PencilIcon class="w-4 h-4 inline-block text-matcha" /> )
              </button>
            </template>
            <template #col-1>
              <PlusIcon
                class="w-5 h-5 inline-block font-extrabold text-matcha hover:rotate-90 transition-transform cursor-pointer"
                @click="addType(category.id)"
              />
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
                <button @click="openEditModal(documentType, false)" class="ml-5">
                  (
                  <PencilIcon class="w-4 h-4 inline-block text-matcha" /> )
                </button>
              </template>
              <template #actions>
                <button @click="deleteType(category, index)" class="text-red-600">
                  <TrashIcon class="w-5 h-5 inline-block" />
                </button>
              </template>
            </BaseTableRow>
          </template>
        </tbody>
      </BaseTable>
    </div>

    <!-- Tombol Tambah Kategori -->
    <button
      @click="addCategory"
      class="mt-4 px-4 py-2 bg-matcha text-white rounded"
      v-if="state === 'table'"
    >
      Tambah Kategori
    </button>
    <Form
      @back="closeForm"
      @submitForm="submit"
      buttonText="Submit"
      :className="selectedItem"
      :state="state"
      :menu="menu"
    >
      <template #form>
        <Input
          label="Name"
          :model-value="form.name"
          name="name"
          placeholder="Input name"
          @update:model-value="onChangeName"
        />
      </template>
    </Form>

    <!-- Modal -->
    <BaseModal
      title="Edit Data"
      :isOpen="isOpen"
      :isCategory="isCategory"
      :initialData="selectedItem"
      @submit="saveEdit"
      @close-modal="closeModal"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCategoryStore } from "~/stores/category";
import { useTypeStore } from "~/stores/type";
import BaseTable from "~/components/document/master/BaseTable.vue";
import BaseTableRow from "~/components/document/master/BaseTableRow.vue";
import BaseModal from "~/components/utilities/BaseModal.vue";
import Form from "~/components/utilities/Form.vue";
import Input from "~/components/utilities/Form/Input.vue";
import Modal from "~/components/utilities/Modal";
import { PencilIcon, TrashIcon, PlusIcon } from "@heroicons/vue/24/solid";

// Store & Data
const categoryStore = useCategoryStore();
const typeStore = useTypeStore();

const form = ref({
  name: "",
  category: "",
});
const isEditingCategory = ref(true);
const isCategory = ref(false);
const isOpen = ref(false);
const menu = ref("");
const selectedItem = ref({ id: null, name: "" });
const state = ref("table");

// Lifecycle
onMounted(async () => {
  await categoryStore.getFolder();
});

// Method
const addCategory = () => {
  state.value = "form";
  menu.value = "Category";
};
const addType = (id) => {
  state.value = "form";
  menu.value = "Type";
  form.value.category = id;
};
const closeModal = () => {
  isOpen.value = false;
};
const closeForm = (value) => {
  state.value = value;
};
const deleteCategory = async (id) => {
  if (confirm("Yakin ingin menghapus kategori ini?")) {
    await categoryStore.delete(id);
    await categoryStore.getFolder();
  }
};
const deleteType = async (category, index) => {
  const type = category.children[index];
  if (confirm(`Yakin ingin menghapus tipe dokumen "${type.name}"?`)) {
    await typeStore.delete(type.id);
    await categoryStore.getFolder();
  }
};
const onChangeName = (val) => {
  form.value.name = val;
};
const openEditModal = (item, value) => {
  isOpen.value = true;
  isCategory.value = value;
  isEditingCategory.value = value;
  selectedItem.value = { ...item };
};
const saveEdit = async (updatedItem) => {
  if (isEditingCategory.value) {
    await categoryStore.update(updatedItem.id, {
      name: updatedItem.name,
    });
  } else {
    const category = categoryStore.folder.find(
      (cat) => cat.children && cat.children.some((doc) => doc.id === updatedItem.id)
    );

    if (category) {
      await typeStore.update(updatedItem.id, {
        category: category.id,
        name: updatedItem.name,
      });
    }
  }

  categoryStore.getFolder();
};
const submit = async (id) => {
  if (menu.value === "Category") {
    await categoryStore
      .create({
        name: form.value.name,
      })
      .finally(() => {
        state.value = "table";
        categoryStore.getFolder();
      });
  } else {
    await typeStore
      .add({
        name: form.value.name,
        category: form.value.category,
      })
      .finally(() => {
        state.value = "table";
        categoryStore.getFolder();
      });
  }
};
</script>
