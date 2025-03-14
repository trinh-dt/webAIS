import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Card, CardBody, Col, Container, Input, Label, Row, Button, Alert, Spinner } from "reactstrap"
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
    email: yup
      .string()
      .required("Email là bắt buộc")
      .matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", "Email không hợp lệ")
  })
  .required()

const defaultValues = {
  email: ""
}

const ForgotPassword = () => {
  document.title = "Quên mật khẩu | MyAIS"
  const [isLoading, setIsLoading] = useState(false)

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
      let res = await apiHelper.post("/api/auth/forgot-password", data)
      toast.success("Gửi yêu cầu lấy lại mật khẩu thành công")
    } catch (err) {
      console.log("error: ", err)
      toast.error(err)
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
                      <h5 className="text-primary">Quên mật khẩu?</h5>
                      <lord-icon
                        src="https://cdn.lordicon.com/rhvddzym.json"
                        trigger="loop"
                        colors="primary:#0ab39c"
                        className="avatar-xl"
                        style={{ width: "120px", height: "120px" }}
                      ></lord-icon>
                    </div>
                    <Alert className="border-0 alert-warning text-center mb-2 mx-2" role="alert" key={123}>
                      Nhập địa chỉ email và hướng dẫn sẽ được gửi tới ban!
                    </Alert>
                    <div className="p-2 mt-3">
                      <form action="#">
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
                              {isLoading ? <Spinner size="sm" className="flex-shrink-0" /> : ""} Xác nhận
                            </span>
                          </Button>
                        </div>
                      </form>
                    </div>
                  </CardBody>
                </Card>

                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Quay lại...{" "}
                    <Link to="/auth/login" className="fw-bold text-primary text-decoration-underline">
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

export default ForgotPassword
