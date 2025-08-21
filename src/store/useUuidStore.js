import { create } from "zustand";

const useUuidStore = create((set) => ({
  storeUuid: "e284a976-5b2c-47c7-b115-d350e47539c8",
  storeName: "어웨이커피",
  isNew: null,
  setUuid: ({ storeUuid, isNew, storeName }) =>
    set({ storeUuid, isNew, storeName }),
}));

export default useUuidStore;