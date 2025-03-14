import apiHelper from "../helpers/api-helper"

class VesselService {
  getVesselList = async (thamSo) => {
    return await apiHelper.post("/api/Ship/Data/DoRequest", {
      "procedureName": "Proc_DM_Tau_Search",
      "thamSo": JSON.stringify(thamSo)
    })
  }

  getVesselRoute = async (thamSo) => {
    return await apiHelper.post("/api/Ship/Data/DoRequest", {
      "procedureName": "Proc_HanhTrinh_Search",
      "thamSo": JSON.stringify(thamSo)
    })
  }
}

export const vesselService = new VesselService()
