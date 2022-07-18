/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_URL } from "constant";

const requestAbortCode = "ECONNABORTED";

export const setToken = async (token: string) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearToken = async () => {
  axios.defaults.headers.common["Authorization"] = "";
};


axios.defaults.baseURL = API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.timeout = 360000;
// axios.defaults.withCredentials = true;

const RequestClient = class {
  constructor() {
    //
  }

  async get(endpoint: string, params = {}) {
    try {
      const response = await axios.get(endpoint, params);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async post(endpoint: string, body: {}, params = {}) {
    try {
      const response = await axios.post(endpoint, body, params);

      return response;
    } catch (error: any) {
      this.handleError(error);
      return error.response;
    }
  }

  async put(endpoint: string, body: {}, params = {}) {
    try {
      const response = await axios.put(endpoint, body, params);
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }

  async delete(endpoint: string, data?: {}) {
    try {
      const response = await axios.delete(endpoint, { data });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }
  async upload(endpoint: string, file: File) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response;
    } catch (error) {
      this.handleError(error);
    }
  }
  handleError(error: any) {
    // if (error.response && error.response.status === 401) {
    //   // Handle logout/refresh token here...
    // }
    if (
      error.code === requestAbortCode ||
      ("response" in error && error.response === undefined)
    ) {
      // delay(1000);
      error.recall = true;
    }
    throw error;
  }
};

const client = new RequestClient();

export { client };
