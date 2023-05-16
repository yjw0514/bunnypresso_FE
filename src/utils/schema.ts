import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  name: Yup.string()
    .required('닉네임 입력은 필수입니다.')
    .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
    .max(10, '닉네임은 최대 10글자 입니다.'),
  password: Yup.string()
    .required('비밀번호 입력은 필수입니다.')
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .max(10, '비밀번호는 최대 10글자 입니다.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,10}$/,
      '비밀번호는 숫자와 문자 조합을 입력해야 합니다.'
    ),
});

export const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .required('닉네임 입력은 필수입니다.')
    .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
    .max(10, '닉네임은 최대 10글자 입니다.'),
  password: Yup.string()
    .required('비밀번호 입력은 필수입니다.')
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .max(10, '비밀번호는 최대 10글자 입니다.')
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,10}$/,
      '비밀번호는 숫자와 문자 조합을 입력해야 합니다.'
    ),
});
