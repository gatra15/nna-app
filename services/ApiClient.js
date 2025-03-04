import { useApi } from "@/composables/useApi";

export class ApiClient {
  constructor() {
    this.api = useApi();
  }

  async get(url, params = {}) {
    return await this.api.request(url, { method: "GET", params });
  }

  async post(url, data = {}) {
    return await this.api.request(url, { method: "POST", data });
  }

  async put(url, data = {}) {
    return await this.api.request(url, { method: "PUT", data });
  }

  async delete(url, params = {}) {
    return await this.api.request(url, { method: "DELETE", params });
  }
}
