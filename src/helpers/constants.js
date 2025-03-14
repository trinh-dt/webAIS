export const defaultSelectStyle = {
  multiValueLabel: (styles) => {
    return { ...styles, color: "white" };
  },
};

export const lovRole = [
  {label: 'user', value: 'USER'},
  {label: 'admin', value: 'ADMIN'},
]

export const searchTypesLOV = [
  { value: "All", label: "Tất cả" },
  { value: "VesselName", label: "VesselName" },
  { value: "MMSI", label: "MMSI" },
  { value: "IMONumber", label: "IMONumber" }
]

