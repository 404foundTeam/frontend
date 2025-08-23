import { create } from "zustand";

const useTextStore = create((set) => ({
  generatedText:
    "추석 연휴에도 정상 영업합니다.\n 가족과 함께 특별한 시간을 보내세요!",
  setText: ({ generatedText }) => set({ generatedText }),
}));

export default useTextStore;
