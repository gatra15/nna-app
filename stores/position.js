import { defineStore } from "pinia";
import { usePositionService } from "~/services/PositionService";

export const usePositionStore = defineStore("position", {
  state: () => ({
    positions: [],
    loading: false,
    error: null,
    position: {},
  }),
  actions: {
    setPosition(positionData) {
      this.positions = positionData;
    },

    clearPosition() {
      this.positions = null;
    },

    async fetchPosition() {
      this.loading = true;
      this.error = null;

      try {
        const positionService = usePositionService();
        const positions = await positionService.getPositions();

        this.positions = positions.data;
      } catch (error) {
        console.error("Error fetching positions:", error);
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchPositionById(positionId) {
      this.loading = true;
      this.error = null;

      try {
        const positionService = usePositionService();
        this.position = await positionService.getPositionById(positionId);
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
        await positionService.createPosition(positionData);
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
        await positionService.updatePosition(positionId, positionData);
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
        await positionService.deletePosition(positionId);
        await this.fetchPosition();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
