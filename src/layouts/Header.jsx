import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Dropdown, DropdownMenu, DropdownToggle, Form } from "reactstrap"

//import images
import logoSm from "../assets/images/logo-sm.png"
import logoDark from "../assets/images/logo-dark.png"
import logoLight from "../assets/images/logo-light.png"

//import Components
import SearchOption from "../components/SearchOption"
import FullScreenDropdown from "../components/FullScreenDropdown"
import ProfileDropdown from "../components/ProfileDropdown"
import LightDark from "../components/LightDark"
import useLayoutStore from "../store/useLayoutStore"
import ConfigVessel from "../components/ConfigVessel"
import SearchVessel from "../components/SearchVessel"

const Header = ({ onChangeLayoutMode, layoutModeType, headerClass }) => {
  const sidebarVisibilitytype = useLayoutStore((state) => state.sidebarVisibilitytype)
  const changeSidebarVisibility = useLayoutStore((state) => state.changeSidebarVisibility)

  const [search, setSearch] = useState(false)
  const toogleSearch = () => {
    setSearch(!search)
  }

  const toogleMenuBtn = () => {
    var windowSize = document.documentElement.clientWidth
    changeSidebarVisibility("show")

    if (windowSize > 767) document.querySelector(".hamburger-icon").classList.toggle("open")

    //For collapse horizontal menu
    if (document.documentElement.getAttribute("data-layout") === "horizontal") {
      document.body.classList.contains("menu")
        ? document.body.classList.remove("menu")
        : document.body.classList.add("menu")
    }

    //For collapse vertical and semibox menu
    if (
      sidebarVisibilitytype === "show" &&
      (document.documentElement.getAttribute("data-layout") === "vertical" ||
        document.documentElement.getAttribute("data-layout") === "semibox")
    ) {
      if (windowSize < 1025 && windowSize > 767) {
        document.body.classList.remove("vertical-sidebar-enable")
        document.documentElement.getAttribute("data-sidebar-size") === "sm"
          ? document.documentElement.setAttribute("data-sidebar-size", "")
          : document.documentElement.setAttribute("data-sidebar-size", "sm")
      } else if (windowSize > 1025) {
        document.body.classList.remove("vertical-sidebar-enable")
        document.documentElement.getAttribute("data-sidebar-size") === "lg"
          ? document.documentElement.setAttribute("data-sidebar-size", "sm")
          : document.documentElement.setAttribute("data-sidebar-size", "lg")
      } else if (windowSize <= 767) {
        document.body.classList.add("vertical-sidebar-enable")
        document.documentElement.setAttribute("data-sidebar-size", "lg")
      }
    }

    //Two column menu
    if (document.documentElement.getAttribute("data-layout") === "twocolumn") {
      document.body.classList.contains("twocolumn-panel")
        ? document.body.classList.remove("twocolumn-panel")
        : document.body.classList.add("twocolumn-panel")
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar" className={headerClass}>
        <div className="layout-width">
          <div className="navbar-header">
            <div className="d-flex">
              <div className="navbar-brand-box horizontal-logo">
                <Link to="/" className="logo logo-dark">
                  <span className="logo-sm">
                    <img src={logoSm} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoDark} alt="" height="17" />
                  </span>
                </Link>

                <Link to="/" className="logo logo-light">
                  <span className="logo-sm">
                    <img src={logoSm} alt="" height="22" />
                  </span>
                  <span className="logo-lg">
                    <img src={logoLight} alt="" height="17" />
                  </span>
                </Link>
              </div>

              <button
                onClick={toogleMenuBtn}
                type="button"
                className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger shadow-none"
                id="topnav-hamburger-icon"
              >
                <span className="hamburger-icon">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
              </button>
              <ConfigVessel />
              <SearchVessel />
            </div>

            <div className="d-flex align-items-center">
              <FullScreenDropdown />
              <LightDark layoutMode={layoutModeType} onChangeLayoutMode={onChangeLayoutMode} />
              <ProfileDropdown />
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  )
}

export default Header
