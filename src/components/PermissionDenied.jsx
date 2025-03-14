import React from "react";
import { Alert, Card, Col, Container, Row } from "reactstrap";
import BreadCrumb from "./BreadCrumb";
import { Link } from "react-router-dom";

const PermissionDenied = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Lỗi truy cập" pageTitle="Trang chủ" />
          <Row className="d-flex justify-content-center">
            <Col lg={5} className="text-center">
              <Alert color="danger">
                <div>
                  <lord-icon
                    src="https://cdn.lordicon.com/etwtznjn.json"
                    trigger="loop"
                    colors="primary:#405189,secondary:#0ab39c"
                    className="avatar-xl"
                    style={{ width: "120px", height: "120px" }}
                  ></lord-icon>
                </div>
                <strong className="fs-4">Truy cập bị từ chối</strong>
                <div className="fs-6 mt-2">Bạn không có quyền truy cập trang này.</div>
                <div className="mb-2">Liên hệ với quản trị viên để được cấp quyền hoặc quay lại trang chủ và duyệt các trang khác.</div>
                <Link to="/" className="btn btn-primary">
                  <i className="mdi mdi-home me-1"></i>Về trang chủ
                </Link>
              </Alert>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default PermissionDenied;
