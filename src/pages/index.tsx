import { useEffect, useState } from 'react';
import BasicButton from '@/components/Button/BasicButton';
import IconButton from '@/components/Button/IconButton';
import BasicModal from '@/components/Modal/BasicModal';
import BasicInput from '@/components/Input/BasicInput';

import useModal from '@/hooks/useModal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { LoginValue } from '@/dto/loginDto';
import { loginSchema } from '@/utils/schema';
import { login, signUp } from '@/lib/api/auth/index';
import { useMutation } from 'react-query';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSingUp] = useState(false);

  const { isOpen: openLogin, modalHandler: loginModalHandler } = useModal();
  const { isOpen: openLogout, modalHandler: logoutModalHandler } = useModal();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm<LoginValue>({
    resolver: yupResolver(loginSchema),
  });

  // 회원가입 api
  const {
    mutate: signUpMutate,
    isLoading: signUpLoading,
    isSuccess: signUpSuccess,
  } = useMutation(signUp, {
    onMutate() {
      console.log('onMutate -> ');
    },
    onSuccess: (data, variables, context) => {
      setIsSingUp((prev) => !prev);
      localStorage.setItem('name', variables.name);
      // loginModalHandler();
    },
    onError: (error, variable, context) => {
      console.log('onError -> ', error, variable);
    },
  });

  // 로그인 api
  const { mutate: loginMutate, isLoading: loginLoading } = useMutation(login, {
    onMutate() {
      console.log('onMutate -> ');
    },
    onSuccess: (data, variables, context) => {
      console.log(data);
      setIsLoggedIn(true);
      localStorage.setItem('name', variables.name);
      // loginModalHandler();
    },
    // TODO: error 타입 해결
    onError: (error: any, variable, context) => {
      const { type, message } = error.response.data;
      console.log(type, message);
      setError(type, {
        type,
        message,
      });
    },
  });

  // submit handler
  const submitHandler: SubmitHandler<LoginValue> = (data) => {
    const { name, password } = data;
    if (isSignUp) {
      signUpMutate({ name, password });
      return;
    }
    loginMutate({ name, password });
  };

  // 로그인/회원가입 모달 닫기
  const onCloseModal = () => {
    setIsSingUp(false);
    loginModalHandler();
  };

  // 회원가입 후 인풋 초기화
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, formState]);

  return (
    <div className="container h-screen">
      {isLoggedIn && (
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg flex-center bg-[#dbdbdb]">
            <BsFillPersonFill size="34" color="#F3F3F3" />
          </div>
          <div className="font-semibold text-black text-md">
            <div>
              0000님, <br />
              안녕하세요!
            </div>
          </div>
        </div>
      )}
      <div></div>
      <div className="fixed top-4 right-4">
        {isLoggedIn ? (
          <IconButton onClick={logoutModalHandler}>
            <FiLogOut size="20px" />
          </IconButton>
        ) : (
          <BasicButton name="LogIn" onClick={loginModalHandler} />
        )}
      </div>

      <div>
        <p className="bg-clip-text bg-gradient-to-r from-pink-200 to-primary text-3xl mt-[8rem] font-bold text-transparent text-center ">
          Welcome to <br />
          BunnyPresso
          <br />
        </p>
        <span className="flex justify-center mt-6 text-3xl">🐰☕️</span>
      </div>

      {openLogin && (
        <BasicModal
          isOpen={openLogin}
          modalHandler={onCloseModal}
          btnName={isSignUp ? '회원가입' : '로그인'}
          title={isSignUp ? 'Welcome 🐰' : 'Enjoy your coffee ☕️'}
          onConfirm={handleSubmit(submitHandler)}
        >
          <form>
            {signUpSuccess && (
              <div className="mb-4 text-center text-md text-primary">
                회원가입이 완료되었습니다.
                <br /> 로그인을 해주세요.
              </div>
            )}
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
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
                className="block mb-2 text-sm font-medium text-gray-900 "
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
            {isSignUp ? (
              <p
                onClick={() => setIsSingUp(false)}
                className="text-sm text-right text-gray-500 underline underline-offset-4"
              >
                로그인
              </p>
            ) : (
              <p
                onClick={() => setIsSingUp(true)}
                className="text-sm text-right text-gray-500 underline underline-offset-4"
              >
                회원가입
              </p>
            )}
          </form>
        </BasicModal>
      )}
      {openLogout && (
        <BasicModal isOpen={openLogout} modalHandler={logoutModalHandler}>
          {isLoggedIn ? <div>로그아웃하시겠습니까?</div> : <div>로그인 폼</div>}
        </BasicModal>
      )}
    </div>
  );
}
