import { defineStore } from "pinia";
import { useDocumentService } from "~/services/DocumentService";

export const useDocumentStore = defineStore("document", {
  state: () => ({
    documents: [],
    document: [],
    loading: false,
    error: null,
  }),

  actions: {
    setDocument(doc) {
      this.documents = doc;
    },

    async fetchData(params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const docService = useDocumentService();
        const res = await docService.getData(params);
        return {
          items: res.data,
          total: res.total,
        };
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching documents:", error);
      } finally {
        this.loading = false;
      }
    },

    async getById(id) {
      this.loading = true;
      this.error = null;

      try {
        const docService = useDocumentService();
        const res = docService.getDataById(id);
        this.document = res;
      } catch (error) {
        this.error = error.message;
        console.error("Error get detail document", error);
      } finally {
        this.loading = false;
      }
    },

    async getDocumentShare(type) {
      this.loading = true;
      this.error = null;

      try {
        const docService = useDocumentService();
        const res = await docService.getDocumentShare(type);
        console.log("res: ", res);
        this.setDocument(res.data);
      } catch (error) {
        this.error = error.message;
        console.error("Error fetching documents:", error);
      } finally {
        this.loading = false;
      }
    },

    async addData(data) {
      this.loading = true;
      this.error = null;

      try {
        const docService = useDocumentService();
        const newDoc = await docService.create(data);
        this.documents.push(newDoc);
      } catch (error) {
        this.error = error.message;
        console.error(`Error creating document: `, error);
      }
    },

    async updateData(id, data) {
      this.loading = true;
      this.error = null;

      try {
        const docService = useDocumentService();
        const updatedDoc = await docService.update(id, data);

        // Perbarui dokumen di state jika ditemukan
        const index = this.documents.findIndex((doc) => doc.id === id);
        if (index !== -1) {
          this.documents[index] = updatedDoc;
        }
      } catch (error) {
        this.error = error.message;
        console.error("Error updating document:", error);
      } finally {
        this.loading = false;
      }
    },

    async deleteData(id) {
      this.loading = true;
      this.error = null;

      try {
        const docService = useDocumentService();
        await docService.delete(id);

        // Hapus dari state jika perlu
        this.documents = this.documents.filter((doc) => doc.id !== id);
      } catch (error) {
        this.error = error.message;
        console.error("Error deleting document:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
