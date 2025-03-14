import React, { useState } from "react"
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap"

//import images
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import avatar1 from "../assets/images/users/avatar-1.jpg"
import { useAuth } from "../hooks/useAuth"
import { userService } from "../services/user-service"
import { logout } from "../context/AuthContext"

let baseURL = import.meta.env.VITE_API_URL

const ProfileDropdown = () => {
  // Inside your component
  const { user, dispatch } = useAuth()
  const navigate = useNavigate()

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false)
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown)
  }

  const handleLogout = async() => {
    try {
      // await userService.logout()
      dispatch(logout())
      toast.success("Đã đăng xuất")
    } catch (err) {
      toast.error(err)
    }
  }
  return (
    <React.Fragment>
      <Dropdown isOpen={isProfileDropdown} toggle={toggleProfileDropdown} className="ms-sm-3 header-item topbar-user">
        <DropdownToggle tag="button" type="button" className="btn shadow-none">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={user?.avatar ? `${baseURL}/api/files/avatar/${user?.avatar}` : avatar1}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{user?.username}</span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">{user?.email}</span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end">
          <h6 className="dropdown-header">Xin chào {user?.username}!</h6>
          <DropdownItem
            onClick={() => {
              navigate("/profile")
            }}
          >
            <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
            <span className="align-middle">Thông tin cá nhân</span>
          </DropdownItem>
          {/* <DropdownItem href="/apps-chat">
            <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{' '}
            <span className="align-middle">Messages</span>
          </DropdownItem>
          <DropdownItem href="#">
            <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>{' '}
            <span className="align-middle">Taskboard</span>
          </DropdownItem>
          <DropdownItem href="/pages-faqs">
            <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>{' '}
            <span className="align-middle">Help</span>
          </DropdownItem> 
          <div className="dropdown-divider"></div>
          <DropdownItem href="/pages-profile">
            <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>{' '}
            <span className="align-middle">
              Balance : <b>$5971.67</b>
            </span>
          </DropdownItem>
          <DropdownItem href="/pages-profile-settings">
            <span className="badge bg-success-subtle text-success mt-1 float-end">New</span>
            <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>{' '}
            <span className="align-middle">Settings</span>
          </DropdownItem>
          <DropdownItem href="/auth-lockscreen-basic">
            <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>{' '}
            <span className="align-middle">Lock screen</span>
          </DropdownItem> */}
          <DropdownItem onClick={() => handleLogout()}>
            <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
            <span className="align-middle" data-key="t-logout">
              Đăng xuất
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default ProfileDropdown
