// lib/axiosClient.ts
import axios from "axios";
import Cookies from "js-cookie";

const host_url = process.env.NEXT_PUBLIC_HOST_URL || "http://localhost:8080";

const getAuth = () => ({
  token: Cookies.get("token"),
  refreshToken: Cookies.get("refreshToken"),
});

const clearAuth = () => {
  Cookies.remove("token");
  Cookies.remove("refreshToken");
};

const redirectLogin = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

const axiosClient = axios.create({
  baseURL: host_url,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach access token to every request
axiosClient.interceptors.request.use((config) => {
  const { token } = getAuth();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue: Array<{ resolve: (t: string) => void; reject: (e: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else if (token) p.resolve(token);
  });
  failedQueue = [];
};

axiosClient.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    const { refreshToken } = getAuth();

    // Token revoked
    if (err.response?.status === 401 && err.response?.data?.status === "REVOKED") {
      clearAuth();
      redirectLogin();
      return Promise.reject(new Error("Token revoked"));
    }

    // Invalid refresh token
    if (
      err.response?.status === 403 &&
      err.response?.data?.code === "INVALIDREFRESHTOKEN"
    ) {
      clearAuth();
      redirectLogin();
      return Promise.reject(new Error("Invalid refresh token"));
    }

    // Access token expired / unauthorized
    if (err.response?.status === 401 && !original._retry) {
      if (!refreshToken) {
        clearAuth();
        redirectLogin();
        return Promise.reject(err);
      }

      if (isRefreshing) {
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          original.headers.Authorization = `Bearer ${token}`;
          return axiosClient(original);
        });
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post(`${host_url}/auth/refresh`, {
          refreshToken,
        });

        const { token: newToken, refreshToken: newRefreshToken } = response.data;

        Cookies.set("token", newToken, { expires: 1 });
        Cookies.set("refreshToken", newRefreshToken, { expires: 7 });

        axiosClient.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);

        original.headers.Authorization = `Bearer ${newToken}`;
        return axiosClient(original);
      } catch (refreshError: any) {
        processQueue(refreshError, null);

        if (
          refreshError.response?.status === 403 &&
          refreshError.response?.data?.code === "INVALIDREFRESHTOKEN"
        ) {
          clearAuth();
          redirectLogin();
          return Promise.reject(new Error("Invalid refresh token"));
        }

        clearAuth();
        redirectLogin();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default axiosClient;
