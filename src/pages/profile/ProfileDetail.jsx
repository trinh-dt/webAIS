import React, { useEffect, useState } from "react"
import { Col, Input, Label, Row, Spinner } from "reactstrap"
import { toast } from "react-toastify"
import { useForm, Controller } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { useAuth } from "../../hooks/useAuth"
import apiHelper from "../../helpers/api-helper"
import { userService } from "../../services/user-service"

const schema = yup
  .object({
    username: yup.string(),
    fullName: yup.string().nullable(),
    email: yup
      .string()
      .required("Email là bắt buộc")
      .matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", "Email không hợp lệ"),
    phone: yup.string().nullable(),
    address: yup.string().nullable()
  })
  .required()

const defaultValues = {
  username: "",
  fullName: null,
  email: "",
  phone: null,
  address: null
}

const ProfileDetail = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useAuth()

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
    console.log(data)
    setIsLoading(true)
    try {
      await userService.editProfile(data)
      toast.success("Cập nhật thông tin thành công")
      // reset(defaultValues)
    } catch (error) {
      console.log("error: ", error)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    reset(user)
  }, [user])

  return (
    <>
      <Row className="g-2">
        <Col lg={6}>
          <div>
            <Label htmlFor="username-field" className="form-label">
              Tên đăng nhập
            </Label>
            <Controller
              name="username"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  id="username-field"
                  className="form-control"
                  onChange={onChange}
                  value={value || ""}
                  disabled
                />
              )}
            />
          </div>
        </Col>
        <Col lg={6}>
          <div>
            <Label htmlFor="fullName-field" className="form-label">
              Họ và tên
            </Label>
            <Controller
              name="fullName"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  id="fullName-field"
                  className="form-control"
                  placeholder="Nhập họ và tên"
                  onChange={onChange}
                  value={value || ""}
                  invalid={!!errors.fullName}
                />
              )}
            />
            {errors.fullName && <div className="invalid-feedback">{errors.fullName.message}</div>}
          </div>
        </Col>
        <Col lg={6}>
          <div>
            <Label htmlFor="email-field" className="form-label">
              Địa chỉ email
            </Label>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  id="email-field"
                  className="form-control"
                  placeholder="Nhập địa chỉ email"
                  onChange={onChange}
                  value={value || ""}
                  invalid={!!errors.email}
                />
              )}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>
        </Col>
        <Col lg={6}>
          <div>
            <Label htmlFor="phone-field" className="form-label">
              Số điện thoại
            </Label>
            <Controller
              name="phone"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  id="phone-field"
                  className="form-control"
                  placeholder="Nhập số điện thoại"
                  onChange={onChange}
                  value={value || ""}
                  invalid={!!errors.phone}
                />
              )}
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
          </div>
        </Col>
        <Col lg={12}>
          <div>
            <Label htmlFor="address-field" className="form-label">
              Địa chỉ
            </Label>
            <Controller
              name="address"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="text"
                  id="address-field"
                  className="form-control"
                  placeholder="Nhập địa chỉ"
                  onChange={onChange}
                  value={value || ""}
                  invalid={!!errors.address}
                />
              )}
            />
            {errors.address && <div className="invalid-feedback">{errors.address.message}</div>}
          </div>
        </Col>
        <Col lg={12}>
          <div className="text-end">
            <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
              <span className="d-flex align-items-center g-2">
                {isLoading ? <Spinner size="sm" className="flex-shrink-0" /> : ""} Cập nhật
              </span>
            </button>
          </div>
        </Col>
      </Row>
    </>
  )
}

export default ProfileDetail
