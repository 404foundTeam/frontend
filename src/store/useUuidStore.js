import { create } from "zustand";

const useUuidStore = create((set) => ({
  storeUuid: "463fdc6a-8fea-46ad-ab4e-91c6e00c3c45",
  storeName: "어웨이커피",
  isNew: null,
  setUuid: ({ storeUuid, isNew, storeName }) =>
    set({ storeUuid, isNew, storeName }),
}));

export default useUuidStore;
