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
    placeName: "",
    roadAddress: "",
    verified: false,
    longitude: "",
    latitude: "",
  });

  return {
    account,
    setAccount,
    store,
    setStore,
  };
}
