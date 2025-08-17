import axios from "axios";

const BASE_URL = "https://localhost:8080/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 웰컴 페이지
export const fetchStoresByCoord = async (x, y) => {
  const res = await api.get("/stores/search-by-coord", { params: { x, y } });
  return res.data;
};

export const matchStore = async (store) => {
  const res = await api.post("/stores/match", store);
  return res.data;
};

// 카드 뉴스 페이지

/* 
/api/v1/sns-cards/templates	GET
/api/v1/sns-cards/upload	POST
/api/v1/sns-cards	POST
/api/v1/sns-cards/{cardId}/download	GET
*/
// /api/v1/sns-cards/generate	POST
export const generateText = async ({ type, userText }) => {
  const res = await api.post("/sns-cards/generate", { type, userText });
  return res.data;
};

/*
/api/v1/main	GET
	
/api/v1/cards	GET
/api/v1/calendar/month	GET
/api/v1/calendar/events	POST
/api/v1/calendar/events/{eventId}	GET
/api/v1/calendar/events/{eventId}	PATCH
/api/v1/calendar/events/delete/{eventId}	DELETE
/api/v1/external/festivals	GET

	
/api/v1/picture/upload	POST
/api/v1/picture/review	GET
	
/api/v1/map/find/{businessId}	GET
/api/v1/map/search/{business}	GET
/api/v1/partnerships	GET
/api/v1/partnerships/request/{business}	POST
/api/v1/partnerships/delete/{business}	DELETE
	
/api/v1/report/upload	POST
/api/v1/report/{reportId}	GET
/api/v1/report/reviews/crawl	POST
/api/v1/report/reviews	GET
/api/v1/report/{reportId}/insights	POST
/api/v1/report/{reportId}/insights/{insightId}	GET
	
/api/v1/marketing	GET
*/
