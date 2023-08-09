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

type nameType = {
  name: string;
};
export const updateProfileName = (name: string) => {
  return instance.patch('/update-name', { name });
};

export const updateProfileImg = (data: FormData | null) => {
  return instance({
    url: '/update-file',
    method: 'patch',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};

export const getProfileImg = () => {
  return instance.get('/profile');
};

const AuthApi = {
  signIn,
  signUp,
  updateProfileName,
  updateProfileImg,
  refreshChk,
  getProfileImg,
};
export default AuthApi;
