import { defineStore } from "pinia";
import { useApi } from "~/composables/useApi";

export const useHandlerStore = defineStore("handler", {
  state: () => ({}),
  actions: {
    async downloadFile(id, fileName) {
      const api = useApi();

      try {
        // Menangani request untuk mendownload file (blob)
        const fileData = await api.request(`/documents/download/${id}`, {
          responseType: "blob",
        });

        // Membuat URL untuk file yang didownload
        const blob = new Blob([fileData], { type: "application/octet-stream" });
        const url = URL.createObjectURL(blob);

        // Membuat elemen anchor untuk mendownload
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName; // Nama file yang akan diunduh
        link.click();

        URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading the file:", error);
      }
    },
    async getFileUrl(id) {
      const api = useApi();

      try {
        const fileData = await api.request(`/documents/download/${id}`, {
          responseType: "blob",
        });

        const blob = new Blob([fileData], { type: "application/pdf" }); // pastikan PDF
        const url = URL.createObjectURL(blob);
        return url;
      } catch (error) {
        console.error("Error fetching file for preview:", error);
        return null;
      }
    },
  },
});
