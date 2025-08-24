// src/store/useUuidStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUuidStore = create(
  persist(
    (set) => ({
      storeUuid: null,
      storeName: null,
      roadAddress: null,
      isNew: null,
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

