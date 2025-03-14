import classnames from "classnames"
import React, { useEffect, useState } from "react"
import { toast } from "react-toastify"
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap"
import BreadCrumb from "../../components/BreadCrumb"
import { init } from "../../context/AuthContext"
import { useAuth } from "../../hooks/useAuth"
import { userService } from "../../services/user-service"
import ChangePassword from "./ChangePassword"
import ProfileDetail from "./ProfileDetail"

const Profile = () => {
  document.title = "Thông tin cá nhân | MyAIS"
  const { user, dispatch } = useAuth()
  const [activeTab, setActiveTab] = useState("1")

  const tabChange = (tab) => {
    if (activeTab !== tab) setActiveTab(tab)
  }

  useEffect(() => {
    getProfile()
  }, [])

  const getProfile = async () => {
    try {
      const res = await userService.getUserInfo()
      dispatch(init({ isAuthenticated: true, user: res.data }))
    } catch (err) {
      console.log("error: ", error)
      toast.error(err.message)
    }
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Thông tin cá nhân" pageTitle="Trang chủ" />
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <Nav className="nav-tabs-custom rounded card-header-tabs border-bottom-0" role="tablist">
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "1" })}
                        onClick={() => {
                          tabChange("1")
                        }}
                        type="button"
                      >
                        <i className="fas fa-home"></i>
                        Thông tin chung
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        to="#"
                        className={classnames({ active: activeTab === "2" })}
                        onClick={() => {
                          tabChange("2")
                        }}
                        type="button"
                      >
                        <i className="far fa-user"></i>
                        Đổi mật khẩu
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody className="p-4">
                  <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                      <ProfileDetail />
                    </TabPane>

                    <TabPane tabId="2">
                      <ChangePassword />
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Profile
