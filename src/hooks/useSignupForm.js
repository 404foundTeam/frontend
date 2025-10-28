import { useState } from "react";

export function useSignForm() {
  const [account, setAccount] = useState({
    userName: "",
    email: "",
    userId: "",
    password: "",
  });

  const [store, setStore] = useState({
    storeName: "",
    roadAddress: "",
    longitude: "",
    latitude: "",
    verified: "",
  });

  return {
    account,
    setAccount,
    store,
    setStore,
  };
}
