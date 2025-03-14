import { defineElement } from "lord-icon-element"
import { loadAnimation } from "lottie-web"
import React from "react"
import AppRoutes from "./routes/AppRoutes"

// register lottie and define custom element
defineElement(loadAnimation)

function App(props) {
  return <AppRoutes />
}

export default App
