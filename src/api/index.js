import axios from "axios";

const BASE_URL = "http://13.209.239.240/api/v1";
// const BASE_URL = "http://13.209.239.240:8080/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json", // 데이터 형식
    "Access-Control-Allow-Origin": "*", // 모든 출처 허용
  },
});

// 헤더에 넣기1
// api.interceptors.response.use((response) => {
//   if (response.config.url.includes("/stores/match")) {
//     const { storeUuid, storeName, isNew } = response.data;

//     api.defaults.headers.common["Store-UUID"] = storeUuid;
//     api.defaults.headers.common["Store-NAME"] = storeName;
//     api.defaults.headers.common["Store-ISNEW"] = isNew;
//   }

//   return response;
// });

// 웰컴 페이지
// 가게 목록 조회
export const fetchStoresByCoord = async (x, y) => {
  const res = await api.get("/stores/search-by-coord", { params: { x, y } });
  return res.data;
};
// 업장 등록
export const matchStore = async (store) => {
  const res = await api.post("/stores/match", store);
  return res.data;

  // 헤더에 넣기2
  // const { storeUuid, storeName, isNew } = res.data;

  // api.defaults.headers.common["Store-UUID"] = storeUuid;
  // api.defaults.headers.common["Store-NAME"] = storeName;
  // api.defaults.headers.common["Store-ISNEW"] = isNew;
};

// 카드 뉴스 페이지
// /api/v1/sns-cards/generate	POST
export const generateText = async ({ type, userText }) => {
  const res = await api.post("/sns-cards/generate", { type, userText });
  return res.data;
};

// /api/v1/sns-cards/background POST
export const backgroundImg = async ({
  storeUuid,
  storeName,
  cardType,
  menuName,
  generatedText,
  template,
  ratio,
  theme,
}) => {
  const res = await api.post("/sns-cards/background", {
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

export const postPresignedUrl = async (storeUuid) => {
  // post(파라미터 포함) 요청
  const res = await api.post("/sns-cards/final/presigned-url", null, {
    params: { storeUuid },
  });
  return res.data;
};

export const postCard = async ({ storeUuid, finalUrl }) => {
  const res = await api.post("/sns-cards/final", { storeUuid, finalUrl });
  return res.data;
};
