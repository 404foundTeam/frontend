import { create } from "zustand";

const useActiveStroe = create((set) => ({
  activeTab: "MY",
  setActive: (activeTab) => set({ activeTab }),
}));

export default useActiveStroe;
