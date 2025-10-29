import { useState } from "react";

export function useSignForm() {
  const [account, setAccount] = useState({
    userName: "",
    email: "",
    userId: "",
    password: "",
  });

  const [store, setStore] = useState({
    placeId: "",
    storeName: "",
    roadAddress: "",
    longitude: "",
    latitude: "",
    verified: null,
  });

  return {
    account,
    setAccount,
    store,
    setStore,
  };
}
