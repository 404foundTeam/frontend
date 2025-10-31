import axios from "axios";

const BASE_URL = "http://13.209.239.240/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json", // 데이터 형식
    "Access-Control-Allow-Origin": "*", // 모든 출처 허용
  },
});

// 로그인
export const login = async ({ userId, password }) => {
  const res = await api.post("/auth/login", { userId, password });
  return res.data;
};

// 회원가입 -아이디 중복 확인
export const exists = async ({ userId }) => {
  const res = await api.get("/users/exists", {
    params: { userId },
  });
  return res.data;
};

// 회원가입 - 가게 목록 조회
export const fetchStoresByCoord = async (x, y) => {
  const res = await api.get("/stores/search-by-coord", { params: { x, y } });
  return res.data;
};

// 회원가입 - ocr 추출
export const extractStoreOcr = async (formData) => {
  const res = await api.post("/stores/ocr", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// 회원가입 - 진위여부
export const verifyStoreLicense = async ({
  storeNumber,
  representativeName,
  openDate,
}) => {
  const res = await api.post("/stores/verify", {
    storeNumber,
    representativeName,
    openDate,
  });
  return res.data;
};

// 회원가입 - 서버에 등록
export const signup = async (payload) => {
  const res = await api.post("/auth/signup", payload);
  return res.data;
};
