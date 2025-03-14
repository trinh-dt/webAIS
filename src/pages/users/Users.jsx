import React, { useMemo, useState } from "react"
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap"
import BreadCrumb from "../../components/BreadCrumb"
import TableCommon from "../../components/TableCommon"
const Users = () => {
  const [data, setData] = useState([])
  const [showSearch, setShowSearch] = useState(false)
  const [searchValues, setSearchValues] = useState({})

  const columns = useMemo(
    () => [
      {
        accessorKey: "username",
        header: () => "Tên đăng nhập",
        size: 20,
        meta: {
          allowSearch: true
        }
      },
      {
        accessorKey: "email",
        header: () => "Email",
        size: 30,
        meta: {
          allowSearch: true
        }
      },
      {
        accessorKey: "role",
        header: () => "Vai trò",
        size: 30,
        meta: {
          allowSearch: true
        }
      }
    ],
    []
  )

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Quản lý người dùng" pageTitle="Trang chủ" />
          <Row>
            <Col>
              <Card>
                <CardHeader className="border-0">
                  <div className="d-flex align-items-center">
                    <h5 className="card-title mb-0 flex-grow-1">Danh sách người dùng</h5>
                    <div className="flex-shrink-0">
                      <div className="d-flex flex-wrap gap-2">
                        <button type="button" className="btn btn-info" onClick={() => setShowSearch(!showSearch)}>
                          <i className="ri-search-line me-1 align-bottom"></i> Tìm kiếm
                        </button>
                        <button className="btn btn-success add-btn" onClick={() => {}}>
                          <i className="ri-add-line align-bottom"></i> Thêm mới
                        </button>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="p-4">
                  <TableCommon columns={columns} data={data} showSearch={showSearch} searchValues={searchValues} setSearchValues={setSearchValues}/>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Users
