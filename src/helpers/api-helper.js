import axios from "axios"
import qs from "qs"
import {
  deleteAccessToken,
  deleteRefreshToken,
  getRefreshToken,
  getToken,
  isTokenValid,
  setAccessToken
} from "./tokenHelper"
import { userService } from "../services/user-service"

// Create axios instance
const instance = axios.create({
  timeout: 100000,
  headers: {
    "Content-Type": "application/json"
  },
  baseURL: import.meta.env.VITE_API_URL
})

// Request interceptor
instance.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    return successHandle(response)
  },
  async (error) => {
    const originalRequest = error.config
    if (
      originalRequest &&
      !originalRequest.url.includes("/login") &&
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true
      originalRequest._retryCount = originalRequest._retryCount || 0

      if (originalRequest._retryCount >= 3) {
        deleteAccessToken()
        deleteRefreshToken()
        return Promise.reject(error)
      }

      originalRequest._retryCount += 1

      try {
        const refreshToken = getRefreshToken()
        if (refreshToken && isTokenValid(refreshToken)) {
          const response = await userService.refreshToken(refreshToken || "")
          const { token } = response.data
          setAccessToken(token)

          // Retry the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${token}`
          return instance(originalRequest)
        } else {
          deleteAccessToken()
          deleteRefreshToken()
          throw new Error("RefreshToken is invalid")
        }
      } catch (error) {
        console.log("🚀 ~ error:", error)
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

// Success handler
const successHandle = (response) => {
  if (response.status === 200 || response.status === 201) {
    if (!response.headers["content-type"]?.includes("application/json")) {
      return response
    }
    return response.data
  }
  return {}
}

// GET request
async function get(url, params = {}, headers = {}, responseType) {
  let validParams = params

  if (params) {
    validParams = Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== ""))
  }

  const request = {
    params: validParams,
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
    headers: {
      ...headers
    },
    responseType
  }

  return instance.get(url, request)
}

// POST request
async function post(url, data, headers = {}, responseType) {
  const request = {
    headers,
    responseType
  }

  return instance.post(url, data, request)
}

// PUT request
async function put(url, data, headers = {}, responseType) {
  const request = {
    headers,
    responseType
  }

  return instance.put(url, data, request)
}

// POST FormData
async function postFormData(url, formData, headers = {}, responseType) {
  const request = {
    headers: {
      ...headers,
      "Content-Type": "multipart/form-data"
    },
    responseType
  }

  return instance.post(url, formData, request)
}

// Exporting the functions
export default {
  get,
  post,
  put,
  postFormData
}
