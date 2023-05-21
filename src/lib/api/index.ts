import { getCookie } from '@/utils/cookies';
import axios from 'axios';

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
    // TODO:엑세스 토큰 만료 시 리프레시 토큰 보내기

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
  function (error) {
    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);
