import { create } from "zustand";

const useGuideStore = create((set) => ({
  guideImg: null,
  guideText: null,
  setGuide: ({ guideImg, guideText }) => set({ guideImg, guideText }),
}));

export default useGuideStore;
