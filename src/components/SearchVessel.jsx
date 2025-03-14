import React, { useCallback, useState } from "react"
import { Button, Col, Input, Label, Row, ListGroup, ListGroupItem } from "reactstrap"
import { genSvgColorUrl } from "../helpers/common-helper"
import Select from "react-select"
import { searchTypesLOV } from "../helpers/constants"
import { vesselService } from "../services/vessel-service"
import { toast } from "react-toastify"
import { tranformApiData } from "../helpers/common-helper"
import useAisStore from "../store/useAisStore"

const SearchVessel = ({ onVesselSelect }) => {
  const [searchValue, setSearchValue] = useState("")
  const [searchType, setSearchType] = useState(searchTypesLOV[0].value)
  const [showSearchResult, setShowSearchResult] = useState(false)

  const selectedVessel = useAisStore((state) => state.selectedVessel)
  const setSelectedVessel = useAisStore((state) => state.setSelectedVessel)
  const setVesselList = useAisStore((state) => state.setVesselList)
  const vesselList = useAisStore((state) => state.vesselList)
  
  const handleSearch = () => {
    setShowSearchResult(true)
    if (!searchValue || !searchType) {
      getVesselList({})
    } else {
      getVesselList({
        [searchType]: searchValue
      })
    }
  }

  const getVesselList = useCallback(async (thamSoObject = {}) => {
    try {
      const response = await vesselService.getVesselList(thamSoObject)
      const vessels = response?.DM_Tau || []
      setVesselList(vessels)
    } catch (error) {
      console.error("Error fetching vessel list:", error)
      toast.error("Có lỗi xảy ra khi tải danh sách tàu")
    }
  }, [])

  return (
    <React.Fragment>
      <div className="search-container topbar-head-dropdown ms-1 d-flex align-items-center position-relative">
        <div className="d-flex align-items-center gap-2">
          <Select
            options={searchTypesLOV}
            value={searchTypesLOV.find((type) => type.value === searchType)}
            onChange={(e) => setSearchType(e.value)}
            styles={{
              control: (base) => ({
                ...base,
                minWidth: "120px"
              })
            }}
          />
          <Input
            placeholder="Nhập từ khoá tìm kiếm"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button
            color="info"
            className="d-flex align-items-center justify-content-center"
            style={{ width: "200px" }}
            onClick={handleSearch}
          >
            <i className="ri-search-2-line align-middle me-2"></i> Tìm kiếm
          </Button>
        </div>
        {showSearchResult && (
        <div className="bg-primary text-white position-absolute top-100 start-0 w-100 p-3">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span>Kết quả tìm kiếm</span>
            <span onClick={() => setShowSearchResult(false)} className="fs-20 cursor-pointer">
              <i className="ri-close-circle-line"></i>
            </span>
          </div>
          <div style={{ maxHeight: "300px", overflowY: "auto" }}>
            {vesselList.map((vessel, index) => {
              vessel = tranformApiData(vessel)
              return (
                <div
                  className="py-2 cursor-pointer hover-bg-light"
                  key={index}
                  onClick={() => {
                    setSelectedVessel(vessel)
                    setShowSearchResult(false)
                  }}
                >
                  <i className="ri-radio-button-line me-2"></i>
                  {vessel?.VesselName || vessel?.MMSI}
                </div>
              )
            })}
          </div>
        </div>
      )}
      </div>
      
    </React.Fragment>
  )
}

export default SearchVessel
