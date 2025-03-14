import React from "react"
import { Route, Routes } from "react-router-dom"
import AuthGuard from "../guards/AuthGuard"
import GuestGuard from "../guards/GuestGuard"
import Layout from "../layouts/index"
import ForgotPassword from "../pages/authentication/ForgotPassword"
import Login from "../pages/authentication/Login"
import Register from "../pages/authentication/Register"
import Alt404 from "../pages/error/Alt404"
import Home from "../pages/home/Home"
import AISMap from "../pages/map/AISMap"
import Profile from "../pages/profile/Profile"
import Ship from "../pages/ship/Ship"
import Users from "../pages/users/Users"

const publicRoutes = [
  { path: "/auth/login", component: <Login /> },
  { path: "/auth/register", component: <Register /> },
  { path: "/auth/forgot-password", component: <ForgotPassword /> }
]
const privateRoutes = [
  { path: "/", exact: true, component: <AISMap /> },
  { path: "/profile", component: <Profile /> },
  { path: "/map", component: <AISMap /> },
  { path: "/ship", component: <Ship /> },
  { path: "/users", component: <Users /> }
]

const errorRoutes = [{ path: "*", component: <Alt404 /> }]

const AppRoutes = () => {
  return (
    <Routes>
      <Route>
        {privateRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <AuthGuard>
                <Layout>{route.component}</Layout>
              </AuthGuard>
            }
            key={idx}
            exact={true}
          />
        ))}
      </Route>
      <Route>
        {publicRoutes.map((route, idx) => (
          <Route
            path={route.path}
            element={
              <GuestGuard>
                <>{route.component}</>
              </GuestGuard>
            }
            key={idx}
            exact={true}
          />
        ))}
      </Route>
      <Route>
        {errorRoutes.map((route, idx) => (
          <Route path={route.path} element={<>{route.component}</>} key={idx} exact={true} />
        ))}
      </Route>
    </Routes>
  )
}

export default AppRoutes
