import { LoginValue } from '@/dto/loginDto';
import { SignUpValue } from '@/dto/signupDto';
import { instance } from '@/lib/api/index';

export const signIn = ({ name, password }: LoginValue) => {
  return instance.post('/login', { name, password }, { withCredentials: true });
};

export const signUp = ({ name, password }: SignUpValue) => {
  return instance.post('/signup', {
    name,
    password,
  });
};

export const refreshChk = (refreshToken: string) => {
  return instance.post('/refresh', { refreshToken });
};

const AuthApi = { signIn, signUp };
export default AuthApi;
