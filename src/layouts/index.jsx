import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

//import Components
import Header from "./Header"
import Sidebar from "./Sidebar"
import Footer from "./Footer"
import useLayoutStore from "../store/useLayoutStore"
import RightSidebar from "../components/RightSidebar"

const Layout = (props) => {
  const layoutType = useLayoutStore((state) => state.layoutType)
  const leftSidebarType = useLayoutStore((state) => state.leftSidebarType)
  const layoutModeType = useLayoutStore((state) => state.layoutModeType)
  const layoutWidthType = useLayoutStore((state) => state.layoutWidthType)
  const layoutPositionType = useLayoutStore((state) => state.layoutPositionType)
  const topbarThemeType = useLayoutStore((state) => state.topbarThemeType)
  const leftsidbarSizeType = useLayoutStore((state) => state.leftsidbarSizeType)
  const leftSidebarViewType = useLayoutStore((state) => state.leftSidebarViewType)
  const leftSidebarImageType = useLayoutStore((state) => state.leftSidebarImageType)
  const preloader = useLayoutStore((state) => state.preloader)
  const sidebarVisibilitytype = useLayoutStore((state) => state.sidebarVisibilitytype)
  const changeLeftsidebarViewType = useLayoutStore((state) => state.changeLeftsidebarViewType)
  const changeLeftsidebarSizeType = useLayoutStore((state) => state.changeLeftsidebarSizeType)
  const changeSidebarTheme = useLayoutStore((state) => state.changeSidebarTheme)
  const changeLayoutMode = useLayoutStore((state) => state.changeLayoutMode)
  const changeLayoutWidth = useLayoutStore((state) => state.changeLayoutWidth)
  const changeLayoutPosition = useLayoutStore((state) => state.changeLayoutPosition)
  const changeTopbarTheme = useLayoutStore((state) => state.changeTopbarTheme)
  const changeLayout = useLayoutStore((state) => state.changeLayout)
  const changeSidebarImageType = useLayoutStore((state) => state.changeSidebarImageType)
  const changeSidebarVisibility = useLayoutStore((state) => state.changeSidebarVisibility)
  const changePreLoader = useLayoutStore((state) => state.changePreLoader)
  /*
    layout settings
    */
  useEffect(() => {
    if (
      layoutType ||
      leftSidebarType ||
      layoutModeType ||
      layoutWidthType ||
      layoutPositionType ||
      topbarThemeType ||
      leftsidbarSizeType ||
      leftSidebarViewType ||
      leftSidebarImageType ||
      sidebarVisibilitytype
    ) {
      window.dispatchEvent(new Event("resize"))
      changeLeftsidebarViewType(leftSidebarViewType)
      changeLeftsidebarSizeType(leftsidbarSizeType)
      changeSidebarTheme(leftSidebarType)
      changeLayoutMode(layoutModeType)
      changeLayoutWidth(layoutWidthType)
      changeLayoutPosition(layoutPositionType)
      changeTopbarTheme(topbarThemeType)
      changeLayout(layoutType)
      changeSidebarImageType(leftSidebarImageType)
      changeSidebarVisibility(sidebarVisibilitytype)
    }
  }, [
    layoutType,
    leftSidebarType,
    layoutModeType,
    layoutWidthType,
    layoutPositionType,
    topbarThemeType,
    leftsidbarSizeType,
    leftSidebarViewType,
    leftSidebarImageType,
    sidebarVisibilitytype
  ])
  /*
    call dark/light mode
    */
  const onChangeLayoutMode = (value) => {
    if (changeLayoutMode) {
      changeLayoutMode(value)
    }
  }

  const [headerClass, setHeaderClass] = useState("")
  // class add remove in header
  useEffect(() => {
    window.addEventListener("scroll", scrollNavigation, true)
  })
  function scrollNavigation() {
    var scrollup = document.documentElement.scrollTop
    if (scrollup > 50) {
      setHeaderClass("topbar-shadow")
    } else {
      setHeaderClass("")
    }
  }

  useEffect(() => {
    if (sidebarVisibilitytype === "show" || layoutType === "vertical" || layoutType === "twocolumn") {
      document.querySelector(".hamburger-icon").classList.remove("open")
    } else {
      document.querySelector(".hamburger-icon").classList.add("open")
    }
  }, [sidebarVisibilitytype, layoutType])

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header headerClass={headerClass} layoutModeType={layoutModeType} onChangeLayoutMode={onChangeLayoutMode} />
        <Sidebar layoutType={layoutType} />
        <div className="main-content">{props.children}</div>
      </div>
      <RightSidebar />
    </React.Fragment>
  )
}

Layout.propTypes = {
  children: PropTypes.object
}

export default Layout
