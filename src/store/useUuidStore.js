import { create } from "zustand";

const useUuidStore = create((set) => ({
  storeUuid: "85e105b5-eb2c-4b03-bb9d-25765e33f0d8",
  storeName: "어웨이커피",
  isNew: null,
  setUuid: ({ storeUuid, isNew, storeName }) =>
    set({ storeUuid, isNew, storeName }),
}));

export default useUuidStore;
