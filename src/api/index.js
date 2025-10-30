import axios from "axios";

const BASE_URL = "http://13.209.239.240/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json", // 데이터 형식
    "Access-Control-Allow-Origin": "*", // 모든 출처 허용
  },
});

// 웰컴 페이지 - 가게 목록 조회
export const fetchStoresByCoord = async (x, y) => {
  const res = await api.get("/stores/search-by-coord", { params: { x, y } });
  return res.data;
};

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
//

// 회원가입 - ocr 추출
export const extractStoreOcr = async (formData) => {
  const res = await api.post("/stores/ocr", formData);
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

// 카드 뉴스 페이지 -/api/v1/sns-cards/generate
export const generateText = async ({ type, userText }) => {
  const res = await api.post("/sns-cards/generate", { type, userText });
  return res.data;
};

// 카드 뉴스 페이지 - /api/v1/sns-cards/background POST
export const backgroundImg = async (payload) => {
  const res = await api.post("/sns-cards/background", payload);
  return res.data;
};
// 테스트용
export const backgroundImg2 = async ({
  storeUuid,
  storeName,
  cardType,
  menuName,
  generatedText,
  template,
  ratio,
  theme,
}) => {
  const res = await api.post("/sns-cards/background2", {
    storeUuid,
    storeName,
    cardType,
    menuName,
    generatedText,
    template,
    ratio,
    theme,
  });
  return res.data;
};

// 카드 뉴스 페이지
export const postPresignedUrl = async (storeUuid) => {
  // post(파라미터 포함) 요청
  const res = await api.post("/sns-cards/final/presigned-url", null, {
    params: { storeUuid },
  });
  return res.data;
};
// 카드 뉴스 페이지 - 카드 등록
export const postCard = async ({ storeUuid, finalUrl }) => {
  const res = await api.post("/sns-cards/final", { storeUuid, finalUrl });
  return res.data;
};

// 카메라 페이지 - /api/v1/photo/guide-file
export const guideFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/photo/guide-file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
