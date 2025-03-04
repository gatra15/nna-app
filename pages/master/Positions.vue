<script setup>
import { computed, ref, onMounted } from "vue";
import MasterGoodTable from "~/components/utilities/MasterGoodTable.vue";
import MasterContainer from "~/components/utilities/MasterContainer.vue";
import { PlusCircleIcon } from "@heroicons/vue/24/solid";
import { usePositionStore } from "~/stores/position";
import PositionForm from "~/components/positions/PositionForm.vue";
import LoadingScreen from "~/components/utilities/LoadingScreen.vue";

const positionStore = usePositionStore();
const selectedPosition = ref(null);
const statePage = ref("table");
const isLoading = ref(true);

const positions = computed(() => positionStore.positions);

const columns = [
  { field: "id", label: "ID" },
  { field: "name", label: "Name" },
];

onMounted(async () => {
  isLoading.value = true;
  await positionStore.fetchPosition();
  isLoading.value = false;
});

const openForm = (position) => {
  selectedPosition.value = position || null;
  statePage.value = "form";
};

const changeState = (params) => {
  statePage.value = params;
};

const handleSave = async (position) => {
  isLoading.value = true;
  if (selectedPosition.value?.id) {
    await positionStore.updatePosition(selectedPosition.value.id, position);
  } else {
    await positionStore.addPosition(position);
  }
  statePage.value = "table";
  await positionStore.fetchPosition();
  isLoading.value = false;
};

const deletePosition = async (position) => {
  if (confirm("Are you sure you want to delete this position?")) {
    isLoading.value = true;
    await positionStore.removePosition(position.id);
    await positionStore.fetchPosition();
    isLoading.value = false;
  }
};

useHead({
  title: "Positions",
});
</script>

<template>
  <MasterContainer title="MASTER" sub_title="Position" :isLoading="isLoading">
    <template #content>
      <div class="fixed bottom-6 right-6">
        <button
          @click="openForm(null)"
          class="text-green-500 hover:text-white border border-green-500 hover:bg-green-500 rounded-full shadow-lg transition duration-300"
        >
          <PlusCircleIcon class="h-10 w-10" />
        </button>
      </div>

      <MasterGoodTable
        v-if="statePage == 'table' && !isLoading"
        :columns="columns"
        :rows="positions"
        @edit="openForm"
        @delete="deletePosition"
      />

      <PositionForm
        v-if="statePage == 'form' && !isLoading"
        :position="selectedPosition"
        @save="handleSave"
        @back="changeState"
      />
    </template>
  </MasterContainer>
</template>

<style></style>
