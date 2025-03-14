import React, { useState } from "react"
import { Button, Col, Dropdown, DropdownMenu, DropdownToggle, Input, Label, Row } from "reactstrap"
import { genSvgColorUrl } from "../helpers/common-helper"

const lstLoaiTau = [
  { id: "dredger", label: "Dredger" },
  { id: "cargo", label: "Cargo" },
  { id: "fishing", label: "Fishing" },
  { id: "tanker", label: "Tanker" },
  { id: "tug", label: "Tug" },
  { id: "passenger", label: "Passenger" },
  { id: "towing", label: "Towing" },
  { id: "diving", label: "Diving" },
  { id: "military", label: "Military" },
  { id: "wingInGround", label: "Wing in ground" },
  { id: "highSpeedCraft", label: "High speed craft" },
  { id: "sailing", label: "Sailing" },
  { id: "pilot", label: "Pilot" },
  { id: "sar", label: "Sar" },
  { id: "tender", label: "Tender" },
  { id: "medical", label: "Medical" },
  { id: "other", label: "Other" },
  { id: "na", label: "N/A" }
]
const ConfigVessel = () => {
  const [isConfigVesselDropdown, setIsConfigVesselDropdown] = useState(false)
  const [danhSach, setDanhSach] = useState("tatCa")
  const [thietBi, setThietBi] = useState(["classA", "classB", "aToN", "baseStation"])
  const [loaiTau, setLoaiTau] = useState(lstLoaiTau.map((item) => item.id) || [])
  const [trangThai, setTrangThai] = useState([])
  const [quocTich, setQuocTich] = useState([])
  const [dichDen, setDichDen] = useState([])
  const [tramThu, setTramThu] = useState([])

  const toggleConfigVesselDropdown = () => {
    setIsConfigVesselDropdown(!isConfigVesselDropdown)
  }

  const handleThietBiChange = (type) => {
    setThietBi((prev) => {
      if (prev.includes(type)) {
        return prev.filter((item) => item !== type)
      }
      return [...prev, type]
    })
  }

  const handleLoaiTauChange = (type) => {
    setLoaiTau((prev) => {
      if (prev.includes(type)) {
        return prev.filter((item) => item !== type)
      }
      return [...prev, type]
    })
  }

  const renderLoaiTauCheckbox = (id, label, color = "#0f0") => (
    <Col md={3}>
      <div className="form-check form-check-info mb-3">
        <Input
          className="form-check-input"
          type="checkbox"
          id={id}
          checked={loaiTau.includes(id)}
          onChange={() => handleLoaiTauChange(id)}
        />
        <Label className="form-check-label d-flex align-items-center" htmlFor={id}>
          <img src={genSvgColorUrl(color)} alt={label} className="me-2" />
          {label}
        </Label>
      </div>
    </Col>
  )

  const renderConfigRow = (label, children) => (
    <Row className="mb-3">
      <Col md={2}>{label}</Col>
      <Col md={10} className="d-flex flex-row gap-4 flex-wrap">
        {children}
      </Col>
    </Row>
  )

  return (
    <React.Fragment>
      <Dropdown
        isOpen={isConfigVesselDropdown}
        toggle={toggleConfigVesselDropdown}
        className="topbar-head-dropdown ms-1 header-item bg-primary"
      >
        <DropdownToggle className="btn btn-primary bg-primary fs-16 text-white" style={{ borderColor: "transparent" }}>
          Hiển thị
          <i className="ri-arrow-down-s-line align-middle"></i>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-lg p-0 dropdown-menu-end" style={{ width: "900px" }}>
          <div className="p-3 border-top-0 border-start-0 border-end-0 border bg-primary text-white">
            <Row className="align-items-center">
              <Col>
                <Row className="mb-3">
                  <Col md={2}>Danh sách</Col>
                  <Col md={10} className="d-flex flex-row gap-5 flex-wrap">
                    <div className="form-check form-radio-info mb-3">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="danhSach"
                        id={"tatCa"}
                        checked={danhSach === "tatCa"}
                        onChange={() => setDanhSach("tatCa")}
                      />
                      <Label className="form-check-label" htmlFor={"tatCa"}>
                        Tất cả
                      </Label>
                    </div>
                    <div className="form-check form-radio-info mb-3">
                      <Input
                        className="form-check-input"
                        type="radio"
                        name="danhSach"
                        id={"danhSachTheoDoi"}
                        checked={danhSach === "danhSachTheoDoi"}
                        onChange={() => setDanhSach("danhSachTheoDoi")}
                      />
                      <Label className="form-check-label" htmlFor={"danhSachTheoDoi"}>
                        Tàu trong danh sách theo dõi
                      </Label>
                    </div>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={2}>Thiết bị</Col>
                  <Col md={10} className="d-flex flex-row gap-5 flex-wrap">
                    <div className="form-check form-check-info mb-3">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id={"classA"}
                        checked={thietBi.includes("classA")}
                        onChange={() => handleThietBiChange("classA")}
                      />
                      <Label className="form-check-label" htmlFor={"classA"}>
                        Class A
                      </Label>
                    </div>
                    <div className="form-check form-check-info mb-3">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id={"classB"}
                        checked={thietBi.includes("classB")}
                        onChange={() => handleThietBiChange("classB")}
                      />
                      <Label className="form-check-label" htmlFor={"classB"}>
                        Class B
                      </Label>
                    </div>
                    <div className="form-check form-check-info mb-3">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id={"aToN"}
                        checked={thietBi.includes("aToN")}
                        onChange={() => handleThietBiChange("aToN")}
                      />
                      <Label className="form-check-label" htmlFor={"aToN"}>
                        AtoN
                      </Label>
                    </div>
                    <div className="form-check form-check-info mb-3">
                      <Input
                        className="form-check-input"
                        type="checkbox"
                        id={"baseStation"}
                        checked={thietBi.includes("baseStation")}
                        onChange={() => handleThietBiChange("baseStation")}
                      />
                      <Label className="form-check-label" htmlFor={"baseStation"}>
                        Base station
                      </Label>
                    </div>
                  </Col>
                </Row>

                {renderConfigRow(
                  "Loại tàu",
                  <>
                    <div className="d-flex flex-row gap-5">
                      <div className="cursor-pointer text-decoration-underline" onClick={() => setLoaiTau([])}>
                        Bỏ chọn
                      </div>
                      <div
                        className="cursor-pointer text-decoration-underline"
                        onClick={() => setLoaiTau(lstLoaiTau.map((item) => item.id))}
                      >
                        Chọn tất cả
                      </div>
                    </div>
                  </>
                )}
                <Row className="mb-3">
                  {renderLoaiTauCheckbox("dredger", "Dredger", "#a417fc")}
                  {renderLoaiTauCheckbox("cargo", "Cargo", "#029cdd")}
                  {renderLoaiTauCheckbox("fishing", "Fishing", "#fda101")}
                  {renderLoaiTauCheckbox("tanker", "Tanker", "#f12433")}
                  {renderLoaiTauCheckbox("tug", "Tug", "#177b54")}
                  {renderLoaiTauCheckbox("passenger", "Passenger", "#160d86")}
                  {renderLoaiTauCheckbox("towing", "Towing", "#c8f92e")}
                  {renderLoaiTauCheckbox("diving", "Diving", "#75f4f9")}
                  {renderLoaiTauCheckbox("military", "Military", "#85144b")}
                  {renderLoaiTauCheckbox("wingInGround", "Wing in ground", "#95b871")}
                  {renderLoaiTauCheckbox("highSpeedCraft", "High speed craft", "#f1fa3e")}
                  {renderLoaiTauCheckbox("sailing", "Sailing", "#e1ebb7")}
                  {renderLoaiTauCheckbox("pilot", "Pilot", "#090708")}
                  {renderLoaiTauCheckbox("sar", "Sar", "#7765fd")}
                  {renderLoaiTauCheckbox("tender", "Tender", "#eea290")}
                  {renderLoaiTauCheckbox("medical", "Medical", "#36fcf5")}
                  {renderLoaiTauCheckbox("other", "Other", "#27f92e")}
                  {renderLoaiTauCheckbox("na", "N/A", "#a5aaac")}
                </Row>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={12} className="d-flex justify-content-center">
                <Button color="info">Áp dụng</Button>
              </Col>
            </Row>
          </div>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  )
}

export default ConfigVessel
