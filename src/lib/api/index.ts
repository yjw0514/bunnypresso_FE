import { getCookie, setCookie, removeCookie } from '@/utils/cookies';
import axios from 'axios';
import { refreshChk } from '@/lib/api/auth';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

axios.defaults.withCredentials = true;
instance.interceptors.request.use(
  function (req) {
    // 요청이 전달되기 전에 작업 수행
    const accessToken = getCookie('accessToken');
    if (req.headers && accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
    }
    // 헤더에 토큰 세팅

    return req;
  },
  function (error) {
    // 요청 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가하기
instance.interceptors.response.use(
  function (response) {
    // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 데이터가 있는 작업 수행
    return response;
  },
  async function (error) {
    const errorConfig = error.config;
    const { status, data } = error.response;
    console.log('error response : ', data);
    if (status === 401) {
      if (data.message === 'token expired') {
        // 권한없음. 엑세스 토큰 만료
        const refreshToken = getCookie('refreshToken');
        try {
          const res = await refreshChk(refreshToken);
          const { accessToken } = res.data;
          setCookie('accessToken', accessToken);
          errorConfig.headers.Authorization = `Bearer ${accessToken}`;
          return axios(errorConfig);
        } catch (err) {
          console.log(err);
        }
      } else {
        console.log('error', data);
        removeCookie('accessToken');
        removeCookie('refreshToken');
        localStorage.clear();
        // TODO: 배포 에러방지를 위한 임시 코드(수정필요)
        if (data.message === '토큰이 없습니다.') {
          // 로그인페이지로 리다이렉트
          window.location.href = '/login';
        }
      }
    }

    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);
