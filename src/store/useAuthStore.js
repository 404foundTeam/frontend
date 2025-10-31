// src/store/useAuthStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      accessToken: "",
      storeUuid: "",
      placeName: "",
      roadAddress: "",
      dataVersion: 1,

      setAuthStore: (accessToken, placeName, storeUuid, roadAddress) =>
        set({
          accessToken: accessToken,
          placeName: placeName,
          storeUuid: storeUuid,
          roadAddress: roadAddress,
        }),
      clearAuthStore: () =>
        set({
          accessToken: "",
          storeUuid: "",
          placeName: "",
          roadAddress: "",
          dataVersion: 1,
        }),
      incrementDataVersion: () =>
        set((state) => ({ dataVersion: state.dataVersion + 1 })),
    }),
    {
      name: "store-storage", // localStorage에 저장될 때 사용될 키(key) 이름입니다.
    }
  )
);

export default useAuthStore;
