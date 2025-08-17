import { create } from "zustand";
// uuid 전역 상태 관리
const storeUuid = create((set) => ({
  uuid: null,
  setUuid: (uuid) => set({ uuid }),
}));

export default storeUuid;
