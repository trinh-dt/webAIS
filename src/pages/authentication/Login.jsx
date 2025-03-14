import React, { useEffect, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button, Card, CardBody, Col, Container, Input, Label, Row, Spinner } from "reactstrap"
import ParticlesAuth from "./ParticlesAuth"

import { yupResolver } from "@hookform/resolvers/yup"
import { Controller, useForm } from "react-hook-form"
import * as yup from "yup"

// import images
import { toast } from "react-toastify"
import logoLight from "../../assets/images/logo-light.png"
import { init } from "../../context/AuthContext"
import { setAccessToken, setRefreshToken } from "../../helpers/tokenHelper"
import { useAuth } from "../../hooks/useAuth"
import { userService } from "../../services/user-service"

const schema = yup
  .object({
    username: yup
      .string()
      .required("Tên đăng nhập là bắt buộc")
      .matches("^.{3,30}$", "Tên đăng nhập có độ dài từ 3-30 ký tự"),
    password: yup
      .string()
      .required("Mật khẩu là bắt buộc")
      .matches("^(?:.{6,30}|)$", "Mật khẩu có độ dài từ 6-30 ký tự")
  })
  .required()

const defaultValues = {
  username: "",
  password: "",
  rememberMe: false
}

const Login = () => {
  document.title = "Login | MyAIS"
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { dispatch } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    register
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const response = await userService.login(data.username, data.password)
      setAccessToken(response.data.token)
      setRefreshToken(response.data.refreshToken)

      const userResponse = await userService.getUserInfo()
      dispatch(init({ isAuthenticated: true, user: userResponse.data }))

      // xử lý đưa về trang trước đó
      let from = "/"
      if (location.state?.from?.pathname) {
        if (location.state.from.pathname.indexOf("login") >= 0) {
          from = "/"
        } else {
          from = location.state.from
        }
      }
      navigate(from)
    } catch (error) {
      toast.error("Tên đăng nhập hoặc mật khẩu không đúng")
      console.log(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 text-white-50">
                  <div>
                    <Link to="/" className="d-inline-block auth-logo text-white fs-1 fw-bold">
                      MyAIS
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Welcome Back!</h5>
                      <p className="text-muted">Đăng nhập để sử dụng các chức năng.</p>
                    </div>
                    <div className="p-2 mt-4">
                      <form action="#">
                        <div className="mb-3">
                          <Label htmlFor="username-field" className="form-label">
                            Tên đăng nhập
                          </Label>
                          <Controller
                            name="username"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <Input
                                id="username-field"
                                className="form-control"
                                placeholder="Tên đăng nhập"
                                type="text"
                                onChange={onChange}
                                value={value || ""}
                                invalid={!!errors.username}
                              />
                            )}
                          />
                          {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
                        </div>

                        <div className="mb-3">
                          <div className="float-end">
                            <Link to="/auth/forgot-password" className="text-muted">
                              Quên mật khẩu?
                            </Link>
                          </div>
                          <Label className="form-label" htmlFor="password-field">
                            Mật khẩu
                          </Label>
                          <Controller
                            name="password"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <div className="position-relative auth-pass-inputgroup">
                                <Input
                                  type={showPassword ? "text" : "password"}
                                  className="form-control pe-5 password-input"
                                  placeholder="Mật khẩu"
                                  id="password-field"
                                  onChange={onChange}
                                  value={value || ""}
                                  invalid={!!errors.password}
                                />
                                <button
                                  className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                  type="button"
                                  id="password-addon"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  <i className="ri-eye-fill align-middle"></i>
                                </button>
                              </div>
                            )}
                          />
                          {errors.password && (
                            <div className="invalid-feedback  d-inline-block">{errors.password.message}</div>
                          )}
                        </div>

                        <div className="form-check">
                          <Controller
                            name="rememberMe"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <Input
                                id="rememberMe-field"
                                className="form-check-input"
                                type="checkbox"
                                onChange={onChange}
                                value={value || ""}
                              />
                            )}
                          />
                          <Label className="form-check-label" htmlFor="rememberMe-field">
                            Ghi nhớ đăng nhập
                          </Label>
                        </div>

                        <div className="mt-4">
                          <Button
                            color="success"
                            className="btn btn-success w-100 d-flex justify-content-center"
                            type="submit"
                            onClick={handleSubmit(onSubmit)}
                            disabled={isLoading}
                          >
                            <span className="d-flex align-items-center">
                              {isLoading ? <Spinner size="sm" className="flex-shrink-0" /> : ""} Đăng nhập
                            </span>
                          </Button>
                        </div>
                      </form>
                    </div>
                  </CardBody>
                </Card>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Chưa có tài khoản?
                    <Link to="/auth/register" className="fw-semibold text-primary text-decoration-underline ps-1">
                      Đăng ký
                    </Link>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  )
}

export default Login
