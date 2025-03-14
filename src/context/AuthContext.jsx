import React, { createContext, useEffect, useReducer, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Spinners from "../components/Spinner"
import { deleteAccessToken, deleteRefreshToken, getRefreshToken, getToken, isTokenValid } from "../helpers/tokenHelper"
import { userService } from "../services/user-service"

/* Initial state */
const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  infoStaffLogin: null
}

/* Reducer function */
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      const { isAuthenticated, user, infoStaffLogin } = action.payload
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
        infoStaffLogin
      }
    }
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        isInitialized: true,
        user: null,
        infoStaffLogin: null
      }
    default:
      return state
  }
}

/* Action creators */
export const init = (payload) => ({
  type: "INIT",
  payload
})

export const logout = () => {
  deleteAccessToken()
  deleteRefreshToken()
  return {
    type: "LOGOUT"
  }
}

/* Context creation */
const AuthContext = createContext({
  ...initialState,
  dispatch: () => null
})

/* AuthProvider component */
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    dispatch(init({ isAuthenticated: true, user: {username: 'Admin'} }))
    // const checkTokens = async () => {
    //   setIsLoading(true)
    //   const accessToken = getToken()
    //   const refreshToken = getRefreshToken()
    //   try {
    //     if (isTokenValid(accessToken) || isTokenValid(refreshToken)) {
    //       const userResponse = await userService.getUserInfo()
    //       dispatch(init({ isAuthenticated: true, user: userResponse.data }))
    //     } else {
    //       dispatch(logout())
    //       if (location.pathname.indexOf("auth") === 0) {
    //         navigate("/auth/login")
    //       }
    //     }
    //   } catch (error) {
    //     console.error("Error during token check:", error)
    //     toast.error("An error occurred. Please try again later")
    //     dispatch(init({ isInitialized: true }))
    //     deleteAccessToken()
    //     navigate("/auth/login")
    //   } finally {
    //     setIsLoading(false)
    //   }
    // }

    // checkTokens()
  }, [dispatch])

  if (isLoading) {
    return <Spinners />
  }

  return <AuthContext.Provider value={{ ...state, dispatch }}>{children}</AuthContext.Provider>
}

export default AuthContext
