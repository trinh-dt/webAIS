import { jwtDecode } from "jwt-decode"

export const setAccessToken = (token) => {
  return localStorage.setItem("accessToken", token)
}

export const getToken = () => {
  return localStorage.getItem("accessToken")
}

export const setRefreshToken = (refreshToken) => {
  return localStorage.setItem("refreshToken", refreshToken)
}

export const getRefreshToken = () => {
  return localStorage.getItem("refreshToken")
}

export const deleteAccessToken = () => {
  localStorage.removeItem("accessToken")
}

export const deleteRefreshToken = () => {
  localStorage.removeItem("refreshToken")
}

export const isTokenValid = (token) => {
  if (!token) return false

  try {
    const decoded = jwtDecode(token)
    const currentTime = Math.floor(Date.now() / 1000)

    return decoded.exp > currentTime
  } catch (error) {
    console.error("Error decoding token:", error)
    return false
  }
}
