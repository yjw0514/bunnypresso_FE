import { useAppDispatch } from '@/store/hooks';
import { logout } from '@/store/slice/authSlice';
import { getCookie, setCookie } from '@/utils/cookies';
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
    console.log('error response : ', error.response.status);
    if (error.response.status === 401) {
      if (error.response.data.message === 'token expired') {
        // 권한없음. 엑세스 토큰 만료
        const refreshToken = getCookie('refreshToken');
        try {
          const res = await refreshChk(refreshToken);
          const { accessToken } = res.data;
          setCookie('accessToken', accessToken);
          errorConfig.headers.Authorization = `Bearer ${accessToken}`;
          axios(errorConfig);
        } catch (err) {
          console.log(err);
        }
      } else {
        const dispatch = useAppDispatch();
        dispatch(logout());
      }
    }

    // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
    // 응답 오류가 있는 작업 수행
    return Promise.reject(error);
  }
);
