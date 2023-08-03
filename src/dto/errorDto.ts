// 로그인 onError 에러 타입
type loginErrorType = {
  type: 'email' | 'password';
  message: string;
  loginSuccess: boolean;
};
export interface CustomLoginError extends Error {
  response?: {
    status: number;
    headers: string;
    data: loginErrorType;
  };
}

// 회원가입 onError 에러 타입
type signUpErrorType = {
  type: 'email' | 'password' | 'name';
  message: string;
  loginSuccess: boolean;
};
export interface CustomSignupError extends Error {
  response?: {
    status: number;
    headers: string;
    data: signUpErrorType;
  };
}
