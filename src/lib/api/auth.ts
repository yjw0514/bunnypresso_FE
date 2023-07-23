import { LoginValue } from '@/dto/loginDto';
import { SignUpValue } from '@/dto/signupDto';
import { instance } from '@/lib/api/index';

export const signIn = ({ email, password }: LoginValue) => {
  return instance.post(
    '/login',
    { email, password },
    { withCredentials: true }
  );
};

export const signUp = ({ email, name, password }: SignUpValue) => {
  return instance.post('/signup', {
    email,
    name,
    password,
  });
};

export const refreshChk = (refreshToken: string) => {
  return instance.post('/refresh', { refreshToken });
};

export const updateProfile = ({ name }: { name: string }) => {
  return instance.patch('/update-profile', { name });
};

const AuthApi = { signIn, signUp, updateProfile, refreshChk };
export default AuthApi;
