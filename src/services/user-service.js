import apiHelper from "../helpers/api-helper"

class UserService {
  /* auth */
  login = async (username, password) => {
    return await apiHelper.post("/api/auth/login", { username, password })
  }

  logout = async () => {
    return await apiHelper.post("/api/auth/logout", null)
  }

  refreshToken = async (refreshToken) => {
    return await apiHelper.post("/api/auth/refreshToken", { refreshToken })
  }

  getUserInfo = async () => {
    return await apiHelper.get("/api/users/currentUser")
  }

  updatePwd = async (data) => {
    await apiHelper.post(`/api/user/profile/updatePwd`, data)
  }
  editProfile = async (data) => {
    await apiHelper.post(`/api/user/profile/edit`, data)
  }

  /* user */
  eddUser = async (data) => {
    return await apiHelper.post(`/api/user/add`, data)
  }
  editUser = async (id, data) => {
    return await apiHelper.post(`/api/user/edit/${id}`, data)
  }
}
export const userService = new UserService()
