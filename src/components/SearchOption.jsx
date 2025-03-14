import React, { useEffect, useState } from "react"
import Select from "react-select"
import { Button, Col, Input, Row } from "reactstrap"

//SimpleBar

//import images

const SearchOption = () => {
  const [value, setValue] = useState("")
  const onChangeData = (value) => {
    setValue(value)
  }

  return (
    <React.Fragment>
      <form className="app-search d-md-block">
        <Row style={{ width: "1024px" }}>
          <Col md="3">
            <Select
              options={[
                { value: "1", label: "Phân loại" },
                { value: "2", label: "Loại tàu" },
                { value: "3", label: "Màu sắc" },
                { value: "4", label: "Khối lượng" },
                { value: "6", label: "Vị trí" }
              ]}
            />
          </Col>
          <Col md="4">
            <div className="position-relative">
              <Input
                type="text"
                className="form-control"
                placeholder="Nhập từ khoá tìm kiếm..."
                id="search-options"
                value={value}
                onChange={(e) => {
                  onChangeData(e.target.value)
                }}
              />
              <span className="mdi mdi-magnify search-widget-icon"></span>
              <span
                className="mdi mdi-close-circle search-widget-icon search-widget-icon-close d-none"
                id="search-close-options"
              ></span>
            </div>
          </Col>
        </Row>
      </form>
    </React.Fragment>
  )
}

export default SearchOption
