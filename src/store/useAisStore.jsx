import { create } from "zustand"

const useAisStore = create((set) => ({
  vesselList: [],
  selectedVessel: null,
  setSelectedVessel: (value) => {
    set(() => ({ selectedVessel: value }))
  },
  setVesselList: (value) => {
    set(() => ({ vesselList: value }))
  }
}))

export default useAisStore
