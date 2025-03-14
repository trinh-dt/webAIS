import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import SimpleBar from "simplebar-react"
//import logo

//Import Components
import { Container } from "reactstrap"
import VerticalLayout from "./VerticalLayouts"

const Sidebar = ({ layoutType }) => {
  useEffect(() => {
    var verticalOverlay = document.getElementsByClassName("vertical-overlay")
    if (verticalOverlay) {
      verticalOverlay[0].addEventListener("click", function () {
        document.body.classList.remove("vertical-sidebar-enable")
      })
    }
  })

  const addEventListenerOnSmHoverMenu = () => {
    // add listener Sidebar Hover icon on change layout from setting
    if (document.documentElement.getAttribute("data-sidebar-size") === "sm-hover") {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover-active")
    } else if (document.documentElement.getAttribute("data-sidebar-size") === "sm-hover-active") {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover")
    } else {
      document.documentElement.setAttribute("data-sidebar-size", "sm-hover")
    }
  }
  return (
    <React.Fragment>
      <div className="app-menu navbar-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <span className="text-white fw-bold fs-5">MyAIS</span>

              {/* <img src={logoSm} alt="" height="22" /> */}
            </span>
            <span className="logo-lg">
              <span className="text-white fw-bold fs-2">MyAIS</span>

              {/* <img src={logoDark} alt="" height="17" /> */}
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <span className="text-white fw-bold fs-5">MyAIS</span>

              {/* <img src={logoSm} alt="" height="22" /> */}
            </span>
            <span className="logo-lg">
              <span className="text-white fw-bold fs-2">MyAIS</span>
              {/* <img src={logoLight} alt="" height="17" /> */}
            </span>
          </Link>
          <button
            onClick={addEventListenerOnSmHoverMenu}
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>
        <React.Fragment>
          <SimpleBar id="scrollbar" className="h-100">
            <Container fluid>
              <div id="two-column-menu"></div>
              <ul className="navbar-nav" id="navbar-nav">
                <VerticalLayout layoutType={layoutType} />
              </ul>
            </Container>
          </SimpleBar>
          <div className="sidebar-background"></div>
        </React.Fragment>
      </div>
      <div className="vertical-overlay"></div>
    </React.Fragment>
  )
}

export default Sidebar
