import { create } from "zustand";

const useTextStore = create((set) => ({
  generatedText: null,
  setText: ({ generatedText }) => set({ generatedText }),
}));

export default useTextStore;
