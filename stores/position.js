import { defineStore } from "pinia";
import { usePositionService } from "~/services/PositionService";

export const usePositionStore = defineStore("position", {
  state: () => ({
    positions: [],
    loading: false,
    error: null,
    position: {},
    options: [],
  }),
  actions: {
    setPosition(positionData) {
      this.positions = positionData;
    },

    clearPosition() {
      this.positions = null;
    },

    async fetchPosition(params = {}) {
      this.loading = true;
      this.error = null;

      try {
        const positionService = usePositionService();
        let res = await positionService.getData(params);

        return {
          items: res.data,
          total: res.total,
        };
      } catch (error) {
        console.error("Error fetching positions:", error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async getOptions() {
      this.loading = true;
      this.error = null;

      try {
        const positionService = usePositionService();
        const res = await positionService.getOptions();
        this.options = res.data;
      } catch (error) {
        this.error = error.message;
        console.error(`Error getting position Option`, error);
      } finally {
        this.loading = false;
      }
    },

    async fetchPositionById(positionId) {
      this.loading = true;
      this.error = null;

      try {
        const positionService = usePositionService();
        this.position = await positionService.getDataById(positionId);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async addPosition(positionData) {
      this.loading = true;
      this.error = null;

      try {
        const positionService = usePositionService();
        await positionService.create(positionData);
        await this.fetchPosition();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async updatePosition(positionId, positionData) {
      this.loading = true;
      this.error = null;

      try {
        const positionService = usePositionService();
        await positionService.update(positionId, positionData);
        await this.fetchPosition();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },

    async removePosition(positionId) {
      this.loading = true;
      this.error = null;

      try {
        const positionService = usePositionService();
        await positionService.delete(positionId);
        await this.fetchPosition();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
