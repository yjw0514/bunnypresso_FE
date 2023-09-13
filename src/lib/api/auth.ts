import { LoginValue } from '@/dto/loginDto';
import { SignUpValue } from '@/dto/signupDto';
import storage from '@/firebase/storage';
import { instance } from '@/lib/api/index';
import { getDownloadURL, ref } from 'firebase/storage';

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

export const updateProfileImg = (file: string | null) => {
  return instance.patch('/update-file', { file });
};
// export const updateProfileImg = (data: string | null) => {
//   return instance({
//     url: '/update-file',
//     method: 'patch',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//     data,
//   });
// };

export const getProfileImg = async () => {
  const {
    data: { file },
  } = await instance.get('/profile');
  if (file) {
    // 기존에 저장된 이미지 파일이 있는 경우 파이어베이스에서 해당 이미지 파일을 가져온다.
    const imageRef = ref(storage, `images/${file}`);
    const img = await getDownloadURL(imageRef);
    return img;
  }
  return null;
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
