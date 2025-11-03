import axios from "axios";
import useAuthStore from "../store/useAuthStore";
import { redirect } from "react-router-dom";

const BASE_URL = "http://13.209.239.240/api/v1";

export const api = axios.create({
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
export const createSnsCardText = async ({ type, userText }) => {
  const res = await api.post("/sns-cards/generate", { type, userText });
  return res.data;
};

// 카드 뉴스 페이지 - /api/v1/sns-cards/background POST
export const createSnsCardBackground = async (payload) => {
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
export const getPresignedUrlForCard = async (storeUuid) => {
  // post(파라미터 포함) 요청
  const res = await api.post("/sns-cards/final/presigned-url", null, {
    params: { storeUuid },
  });
  return res.data;
};

// 카드 뉴스 페이지 - 카드 등록
export const uploadFinalSnsCard = async ({ storeUuid, finalUrl }) => {
  const res = await api.post("/sns-cards/final", { storeUuid, finalUrl });
  return res.data;
};

// 카메라 페이지 - /api/v1/photo/guide-file
export const uploadGuideFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/photo/guide-file", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// 지도 - 나의 업장 위치 조회
export const fetchMyStore = async () => {
  const res = await api.get("/partnership");
  return res.data;
};

// 지도 - 키워드/업종 검색
export const searchPartnerStores = async ({
  keyword = "",
  category = "",
  longitude,
  latitude,
}) => {
  const res = await api.get("/partnership/search", {
    params: {
      keyword,
      category,
      longitude,
      latitude,
    },
  });
  return res.data;
};

// 지도 - 제휴 요청
export const requestPartnership = async (payload) => {
  const res = await api.post("/partnership/request", payload);
  return res.data;
};

// 제휴 관리 - 제휴 맺은 업장
export const getPartnerList = async () => {
  const res = await api.get("/partnership/active");
  return res.data; 
};

// 제휴 관리 - 제휴 상세 내용 조회 (GET)
export const getPartnerDetails = async (partnershipId) => {
  const res = await api.get(`/partnership/content/${partnershipId}`);
  return res.data; 
};

// 제휴 관리 - 제휴 숨기기 (DELETE)
export const hidePartnership = async (partnershipId) => {
  const res = await api.delete(`/partnership/hide/${partnershipId}`);
  return res.data;
};

// 제휴 관리 - 내가 요청 보낸 목록 (GET)
export const getSentRequests = async () => {
  const res = await api.get("/partnership/request/sent");
  return res.data; 
};

// 제휴 관리 - 제휴 요청 삭제 (DELETE)
export const deletePartnership = async (partnershipId) => {
  const res = await api.delete(`/partnership/delete/${partnershipId}`);
  return res.data; 
};

// 제휴 관리 - 내가 받은 요청 목록 (GET)
export const getReceivedRequests = async () => {
  const res = await api.get("/partnership/request/received");
  return res.data; // 서버에서 받은 배열 [ { partnershipId, ... }, ... ]
};

// 제휴 관리 - 요청 수락 (POST)
export const acceptPartnership = async (partnershipId) => {
  const res = await api.post(`/partnership/accept/${partnershipId}`);
  return res.data;
};

// 제휴 관리 - 요청 거절 (POST)
export const rejectPartnership = async (partnershipId) => {
  const res = await api.post(`/partnership/reject/${partnershipId}`);
  return res.data;
};