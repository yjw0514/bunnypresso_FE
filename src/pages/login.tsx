import React from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { isSignUp, login, logout } from '@/store/slice/authSlice';
import BasicInput from '@/components/Input/BasicInput';
import FullButton from '@/components/Button/FullButton';
import { signIn } from '@/lib/api/auth';
import { getCookie, setCookie } from '@/utils/cookies';
import { loginSchema } from '@/utils/schema';
import { LoginValue } from '@/dto/loginDto';
import { CustomLoginError } from '@/dto/errorDto';

export default function Login() {
  const dispatch = useAppDispatch();
  const isSignupSuccess = useAppSelector((state) => state.auth.isSignupSuccess);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm<LoginValue>({
    resolver: yupResolver(loginSchema),
  });

  // 로그인 api
  const { mutate: loginMutate, isLoading: isLoginLoading } = useMutation(
    signIn,
    {
      onSuccess: ({ data }, variables, context) => {
        const { accessToken, refreshToken, userId, name } = data;
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        if (!getCookie('accessToken') || !getCookie('refreshToken')) {
          dispatch(logout());
          return;
        }
        dispatch(login());
        reset();
        localStorage.setItem('name', name);
        localStorage.setItem('userId', userId);
        dispatch(isSignUp(false));
        router.push('/');
      },

      onError: (error: CustomLoginError) => {
        if (error.response) {
          const { type, message } = error.response.data;
          setError(type, {
            type,
            message,
          });
        }
      },
    }
  );

  // submit handler
  const loginHandler: SubmitHandler<LoginValue> = (data) => {
    loginMutate(data);
  };

  return (
    <div className="h-screen p-4 flex-center">
      <section className="w-full max-w-sm max-h-max">
        <h3 className="mb-10 text-3xl font-bold text-center">로그인</h3>
        <form className="w-full" onSubmit={handleSubmit(loginHandler)}>
          {isSignupSuccess ? (
            <div className="mb-4 text-center text-md text-primary">
              회원가입이 완료되었습니다.
              <br /> 로그인을 해주세요.
            </div>
          ) : null}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-900 text-md "
            >
              Email
            </label>

            <BasicInput
              register={register('email')}
              type="text"
              placeholder="이메일을 입력해주세요."
              isError={!!errors.email}
              errorMsg={errors.email?.message}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-900 text-md "
            >
              Password &nbsp;
              <span className="text-xs text-gray-500">
                숫자와 문자를 조합한 6~10자리
              </span>
            </label>

            <BasicInput
              register={register('password')}
              type="password"
              placeholder="•••••••••"
              isError={!!errors.password}
              errorMsg={errors.password?.message}
              autoComplete="on"
            />
          </div>

          <FullButton name="로그인" disabled={isLoginLoading} />
          <div className="flex justify-end">
            <button
              className="mt-4 text-gray-700 underline underline-offset-4 hover:"
              onClick={() => router.push('/signup')}
              type="button"
            >
              회원가입 하러가기
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
