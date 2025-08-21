import { create } from "zustand";

const useCardStore = create((set) => ({
  url: null,
  ratio: null,
  template: null,
  remainingFreeCount: null,
  setCard: ({ url, ratio, template, remainingFreeCount }) =>
    set({ url, ratio, template, remainingFreeCount }),
}));

export default useCardStore;
