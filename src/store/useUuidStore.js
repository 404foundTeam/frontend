// src/store/useUuidStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUuidStore = create(
  persist(
    (set) => ({
      storeUuid: "616069a7-4ca5-4595-89d8-d008ce839af3",
      storeName: "홍아저씨초밥",
      roadAddress: "경기 용인시 기흥구 죽전로15번길 11-7",
      isNew: true,
      dataVersion: 1,
      setStoreInfo: (uuid, name) => set({ storeUuid: uuid, storeName: name }),
      incrementDataVersion: () =>
        set((state) => ({ dataVersion: state.dataVersion + 1 })),
      setUuid: ({ storeUuid, storeName, roadAddress, isNew }) =>
        set({ storeUuid, storeName, roadAddress, isNew }),
    }),
    {
      name: "store-storage", // localStorage에 저장될 때 사용될 키(key) 이름입니다.
    }
  )
);

export default useUuidStore;

