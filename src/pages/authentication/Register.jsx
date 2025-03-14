import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Spinner } from "reactstrap"
import ParticlesAuth from "./ParticlesAuth"

import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import apiHelper from "../../helpers/api-helper"
import { toast } from "react-toastify"

// import images
import logoLight from "../../assets/images/logo-light.png"
import { useAuth } from "../../hooks/useAuth"

const schema = yup
  .object({
    username: yup
      .string()
      .required("Tên đăng nhập là bắt buộc")
      .matches("^.{3,30}$", "Tên đăng nhập có độ dài từ 3-30 ký tự"),
    password: yup
      .string()
      .required("Mật khẩu là bắt buộc")
      .matches("^(?:.{6,30}|)$", "Mật khẩu có độ dài từ 6-30 ký tự"),
    email: yup
      .string()
      .required("Email là bắt buộc")
      .matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", "Email không hợp lệ")
  })
  .required()

const defaultValues = {
  username: "",
  password: "",
  email: ""
}

const Register = (props) => {
  document.title = "Đăng ký | MyAIS"
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  let navigate = useNavigate()

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
      let res = await apiHelper.post("/api/auth/register", data)
      toast.success("Đăng ký tài khoản thành công")
      navigate("/auth/login")
    } catch (err) {
      console.log("error: ", err)
      toast.error(err.message)
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
                      <h5 className="text-primary">Đăng ký tài khoản</h5>
                      <p className="text-muted">Nhập đầy đủ các thông tin để đăng ký</p>
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
                        <div className="mb-3">
                          <Label htmlFor="email-field" className="form-label">
                            Địa chỉ email
                          </Label>
                          <Controller
                            name="email"
                            control={control}
                            render={({ field: { onChange, value } }) => (
                              <Input
                                id="email-field"
                                className="form-control"
                                placeholder="name@example.com"
                                type="text"
                                onChange={onChange}
                                value={value || ""}
                                invalid={!!errors.email}
                              />
                            )}
                          />
                          {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
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
                              {isLoading ? <Spinner size="sm" className="flex-shrink-0" /> : ""} Đăng ký
                            </span>
                          </Button>
                        </div>
                      </form>
                    </div>
                  </CardBody>
                </Card>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Đã có tài khoản?
                    <Link to="/auth/login" className="fw-semibold text-primary text-decoration-underline ps-1">
                      Đăng nhập
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

export default Register
