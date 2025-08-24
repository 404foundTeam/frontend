import { create } from "zustand";

const useUuidStore = create((set) => ({
  storeUuid: null,
  storeName: null,
  roadAddress: null,
  isNew: null,
  setUuid: ({ storeUuid, storeName, roadAddress, isNew }) =>
    set({ storeUuid, storeName, roadAddress, isNew }),
}));

export default useUuidStore;
