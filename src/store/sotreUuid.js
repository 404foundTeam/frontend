import { create } from "zustand";
// uuid 전역 상태 관리
const storeUuid = create((set) => ({
  storeUuid: null,
  isNew: null,
  storeName: null,
  setUuid: ({ storeUuid, isNew, storeName }) =>
    set({ storeUuid, isNew, storeName }),
}));

export default storeUuid;
