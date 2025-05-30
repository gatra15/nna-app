import { ref } from "vue";

export function usePaginatedTable(fetchCallback) {
  const parameter = ref({
    page: 1,
    per_page: 10,
    q: "",
    filters: {},
  });

  const items = ref([]);
  const totalRows = ref(0);

  const fetchData = async () => {
    if (typeof fetchCallback === "function") {
      const response = await fetchCallback({ ...parameter.value });
      items.value = response?.items || [];
      totalRows.value = response?.total || 0;
    } else {
      throw new Error("fetchCallback must be a function");
    }
  };

  const setPage = async (page) => {
    parameter.value.page = page;
    await fetchData();
  };

  const setPerPage = async (perPage) => {
    parameter.value.per_page = perPage;
    parameter.value.page = 1;
    await fetchData();
  };

  const setSearchQuery = async (query) => {
    parameter.value.q = query;
    parameter.value.page = 1;
    await fetchData();
  };

  const setFilters = async (newFilters) => {
    parameter.value.filters = newFilters;
    parameter.value.page = 1;
    await fetchData();
  };

  return {
    parameter,
    items,
    totalRows,
    fetchData,
    setPage,
    setPerPage,
    setSearchQuery,
    setFilters,
  };
}
