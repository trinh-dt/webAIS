import React, { useState } from "react";
import { Col, Input, Label, Row, Spinner } from "reactstrap";
import apiHelper from "../../helpers/api-helper";
import { toast } from "react-toastify";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { userService } from "../../services/user-service";

const schema = yup
  .object({
    oldPassword: yup.string().required("Mật khẩu hiện tại là bắt buộc").matches("^(?:.{6,30}|)$", "Mật khẩu có độ dài từ 6-30 ký tự"),
    newPassword: yup.string().required("Mật khẩu mới là bắt buộc").matches("^(?:.{6,30}|)$", "Mật khẩu có độ dài từ 6-30 ký tự"),
    confirmPassword: yup
      .string()
      .required("Xác nhận mật khẩu là bắt buộc")
      .oneOf([yup.ref("newPassword"), null], "Mật khẩu xác nhận không khớp")
  })
  .required();

const defaultValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: defaultValues,
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await userService.updatePwd(data);
      toast.success("Thay đổi mật khẩu thành công");
      reset(defaultValues)
    } catch (err) {
      console.log("error: ", err)
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Row className="g-2">
        <Col lg={4}>
          <div>
            <Label htmlFor="oldPassword-field" className="form-label">
              Mật khẩu hiện tại
            </Label>
            <Controller
              name="oldPassword"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="password"
                  id="oldPassword-field"
                  className="form-control"
                  placeholder="**********"
                  onChange={onChange}
                  value={value || ""}
                  invalid={!!errors.oldPassword}
                />
              )}
            />
            {errors.oldPassword && <div className="invalid-feedback">{errors.oldPassword.message}</div>}
          </div>
        </Col>

        <Col lg={4}>
          <div>
            <Label htmlFor="newPassword-field" className="form-label">
              Mật khẩu mới
            </Label>
            <Controller
              name="newPassword"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="password"
                  id="newPassword-field"
                  className="form-control"
                  placeholder="**********"
                  onChange={onChange}
                  value={value || ""}
                  invalid={!!errors.newPassword}
                />
              )}
            />
            {errors.newPassword && <div className="invalid-feedback">{errors.newPassword.message}</div>}
          </div>
        </Col>

        <Col lg={4}>
          <div>
            <Label htmlFor="confirmPassword-field" className="form-label">
              Xác nhận mật khẩu
            </Label>
            <Controller
              name="confirmPassword"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  type="password"
                  id="confirmPassword-field"
                  className="form-control"
                  placeholder="**********"
                  onChange={onChange}
                  value={value || ""}
                  invalid={!!errors.confirmPassword}
                />
              )}
            />
            {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword.message}</div>}
          </div>
        </Col>

        {/* <Col lg={12}>
          <div className="mb-3">
            <Link to="#" className="link-primary text-decoration-underline">
              Quên mật khẩu ?
            </Link>
          </div>
        </Col> */}

        <Col lg={12}>
          <div className="text-end">
            <button type="button" className="btn btn-primary" onClick={handleSubmit(onSubmit)} disabled={isLoading}>
            <span className="d-flex align-items-center g-2">{isLoading ? <Spinner size="sm" className="flex-shrink-0" /> : ""} Xác nhận</span>
            </button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ChangePassword;
