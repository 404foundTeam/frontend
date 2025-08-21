import { create } from "zustand";
// uuid 전역 상태 관리
const useUuidStore = create((set) => ({
  storeUuid: "어웨이커피",
  isNew: null,
  storeName: null,
  setUuid: ({ storeUuid, isNew, storeName }) =>
    set({ storeUuid, isNew, storeName }),
}));

export default useUuidStore;
