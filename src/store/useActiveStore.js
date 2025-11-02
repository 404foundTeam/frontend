import { create } from "zustand";

const useActiveStroe = create((set) => ({
  myActive: "MY",
  smartActive: "report",
  setMyActive: (myActive) => set({ myActive }),
  setSmartActive: (smartActive) => set({ smartActive }),
}));

export default useActiveStroe;
