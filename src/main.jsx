import { createRoot } from "react-dom/client"
import App from "./App.jsx"

import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./assets/scss/themes.scss"
import { AuthProvider } from "./context/AuthContext.jsx"
import "./index.css"
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <App />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        theme="light"
      />
    </AuthProvider>
  </BrowserRouter>
)
