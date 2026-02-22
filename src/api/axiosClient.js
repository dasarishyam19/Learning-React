import axios from 'axios';
import useAuthStore from '../store/authStore';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const axiosClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000, // 10 seconds timeout
});

// Request Interceptor
axiosClient.interceptors.request.use(
    (config) => {
        // Retrieve the state dynamically before each request
        const state = useAuthStore.getState();
        const token = state.user?.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

// Response Interceptor
axiosClient.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors (Token Expiration)
        if (error.response?.status === 401 && !originalRequest._retry) {
            // Prevent infinite loops
            if (originalRequest.url === '/auth/refresh') {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            const state = useAuthStore.getState();
            const refreshToken = state.user?.refreshToken;

            // If no refresh token exists, perform immediate logout
            if (!refreshToken) {
                state.logout();
                return Promise.reject(error);
            }

            // If already refreshing, queue the subsequent requests
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosClient(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            isRefreshing = true;

            try {
                // Attempt token refresh
                const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
                    refreshToken,
                });

                const newToken = data.token;
                const newRefreshToken = data.refreshToken || refreshToken;

                // Update the auth store with new tokens
                if (state.user) {
                    state.login({
                        ...state.user,
                        token: newToken,
                        refreshToken: newRefreshToken,
                    });
                }

                // Fulfill queued requests with the new token
                processQueue(null, newToken);

                // Retry the original request with the new token
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosClient(originalRequest);
            } catch (refreshError) {
                // If the refresh token exchange fails, log out the user and clear queue
                processQueue(refreshError, null);
                state.logout();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        // You can also add generic retry logic here for 5xx network errors, but we rely on React Query for that since it has built-in retries for GET requests.

        // Replay standardized error format for UI to consume easily
        const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
        return Promise.reject(new Error(errorMessage));
    }
);

export default axiosClient;
