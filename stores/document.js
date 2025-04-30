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

    async fetchData() {
      this.loading = true;
      this.error = null;

      try {
        const docService = useDocumentService();
        const res = await docService.getData();
        this.setDocument(res);
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
        const res = await docService.getById(id);
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
  },
});
