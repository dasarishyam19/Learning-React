import axiosClient from './axiosClient';

/**
 * A generic API service wrapping the configured Axios instance.
 * Simplifies HTTP method calls and returns the extracted payload data.
 */
const apiService = {
    get: async (url, config = {}) => {
        const response = await axiosClient.get(url, config);
        return response.data;
    },

    post: async (url, data, config = {}) => {
        const response = await axiosClient.post(url, data, config);
        return response.data;
    },

    put: async (url, data, config = {}) => {
        const response = await axiosClient.put(url, data, config);
        return response.data;
    },

    patch: async (url, data, config = {}) => {
        const response = await axiosClient.patch(url, data, config);
        return response.data;
    },

    delete: async (url, config = {}) => {
        const response = await axiosClient.delete(url, config);
        return response.data;
    },
};

export default apiService;
