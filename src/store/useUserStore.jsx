import { size } from "lodash";
import { create } from "zustand";

const useUserStore = create((set) => ({
  search: { searchText: "", status: "", size: 10 },
  setSearch: (value) => {
    set(() => ({ search: value }));
  },
}));

export default useUserStore;
