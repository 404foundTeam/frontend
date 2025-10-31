import axios from "axios";
import useAuthStore from "../store/useAuthStore";

const BASE_URL = "http://13.209.239.240/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json", // 데이터 형식
    "Access-Control-Allow-Origin": "*", // 모든 출처 허용
  },
});
api.interceptors.request.use(
  (config) => {
    // Zustand 스토어에서 accessToken을 가져옴 getState() 사용
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      // 토큰이 있다면, 헤더에 'Authorization' 값을 추가
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    // 요청 오류가 발생했을 때 수행할 로직
    return Promise.reject(error);
  }
);

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
