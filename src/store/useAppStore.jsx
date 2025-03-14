import { create } from "zustand";

const useAppStore = create((set) => ({
  isLoading: 0,
  increaseLoading: () => set((state) => ({ isLoading: state.isLoading + 1 })),
  decreaseLoading: () => set((state) => ({ isLoading: state.isLoading - 1 })),
}));

export default useAppStore;
