import axios from "axios";

export const TestURL = "http://localhost:8080";
export const PromotionURL = "https://ggb-back-0b82d9178398.herokuapp.com"; // API배포시 url

// refreshAccessToken 로직
const refreshAccessToken = async (refreshToken: string) => {
  const response = await api.post("/token/exchangeToken", {
    refreshToken: refreshToken,
  });
  const accessToken = response.data.newAccessToken;

  sessionStorage.setItem("access", JSON.stringify(accessToken));

  return accessToken;
};

// 모든 요청을 api.* (ex.api.post("/endpoint"))으로 사용해 interceptors를 활용한다.
// const api = axios.create({ baseURL: TestURL, withCredentials: true });
const api = axios.create({ baseURL: PromotionURL, withCredentials: true });

// 요청 인터셉트
api.interceptors.request.use(
  function (config) {
    const token = JSON.parse(sessionStorage.getItem("access") || "");

    // 요청이 전달되기 전에 작업 수행;
    config.headers["Content-Type"] = "application/json";

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉트
api.interceptors.response.use(
  (response) => {
    // 요청이 성공적으로 들어온다면 response를 그대로 반환
    return response;
  },
  async (error) => {
    // 요청에 실패했다면 기존 요청을 저장
    const originalRequest = error.config;

    // 에러코드가 401 && 토큰 만료 && !originalRequest._retry (같은 요청이 이미 다시 시도되었는지 확인)
    if (error.response.status === 401 && !originalRequest._retry) {
      // 첫 요청에 위 if문을 통과했다면 재요청을 하기위해 originalRequest._retry를 추가하여 중복 재요청 방지
      originalRequest._retry = true;

      const refreshToken = JSON.parse(sessionStorage.getItem("refresh") || "");

      try {
        const accessToken = await refreshAccessToken(refreshToken);

        api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

        return api(originalRequest);
      } catch (error) {
        console.error(error);

        // 토큰 갱신에 실패한 경우 로그아웃 등 필요한 처리 작업 수행

        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
