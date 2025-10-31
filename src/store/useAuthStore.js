  // src/store/useAuthStore.js
  import { create } from "zustand";
  import { persist } from "zustand/middleware";

  const useAuthStore = create(
    persist(
      (set) => ({
        accessToken: "",
        storeUuid: "",
        storeName: "",
        roadAddress: "",
        dataVersion: 1,

        setAuthStore: (accessToken, storeName, roadAddress) =>
          set({
            accessToken: accessToken,
            storeName: storeName,
            roadAddress: roadAddress,
          }),
        clearAuthStore: () =>
          set({ accessToken: "", storeUuid: "", storeName: "", roadAddress: "" }),
        incrementDataVersion: () =>
          set((state) => ({ dataVersion: state.dataVersion + 1 })),
      }),
      {
        name: "store-storage", // localStorage에 저장될 때 사용될 키(key) 이름입니다.
      }
    )
  );

  export default useAuthStore;
