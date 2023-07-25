import React from 'react';
import { useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import FullButton from '@/components/Button/FullButton';
import BasicInput from '@/components/Input/BasicInput';
import { SignUpValue } from '@/dto/signupDto';
import { signUp } from '@/lib/api/auth';
import { SignUpSchema } from '@/utils/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '@/store/hooks';
import { isSignUp } from '@/store/slice/authSlice';

export default function SignUp() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<SignUpValue>({
    resolver: yupResolver(SignUpSchema),
  });

  // 회원가입 api
  const {
    mutate: signUpMutate,
    isLoading: signUpLoading,
    isSuccess: signUpSuccess,
  } = useMutation(signUp, {
    onSuccess: (data, variables, context) => {
      dispatch(isSignUp(true));
      reset();
      router.push('/login');
    },
    onError: (error: any, variable, context) => {
      console.log('onError -> ', error, variable);
      const { type, message } = error.response.data;
      setError(type, {
        type,
        message,
      });
    },
  });

  const signUpHandler: SubmitHandler<SignUpValue> = (data) => {
    signUpMutate(data);
  };

  return (
    <div className="h-screen p-4 flex-center">
      <section className="w-full max-w-sm max-h-max">
        <h3 className="mb-10 text-3xl font-bold text-center">회원가입</h3>
        <form className="w-full" onSubmit={handleSubmit(signUpHandler)}>
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
              htmlFor="name"
              className="block mb-2 font-medium text-gray-900 text-md "
            >
              Name
            </label>

            <BasicInput
              register={register('name')}
              type="text"
              placeholder="성함 또는 닉네임을 입력하세요."
              isError={!!errors.name}
              errorMsg={errors.name?.message}
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

          <FullButton name="회원가입" disabled={signUpLoading} />
          <div className="flex justify-end">
            <button
              className="mt-4 text-gray-700 underline underline-offset-4 hover:"
              onClick={() => router.push('/login')}
              type="button"
            >
              로그인 하러가기
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
