import { useEffect, useState } from 'react';
import BasicButton from '@/components/Button/BasicButton';
import IconButton from '@/components/Button/IconButton';
import BasicModal from '@/components/Modal/BasicModal';
import BasicInput from '@/components/Input/BasicInput';

import useModal from '@/hooks/useModal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { LoginValue } from '@/dto/loginDto';
import { loginSchema } from '@/utils/schema';
import { signIn, signUp } from '@/lib/api/auth';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { login, logout } from '@/store/slice/authSlice';
import axios from 'axios';

const Home = () => {
  const [isSignUp, setIsSingUp] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const dispatch = useAppDispatch();

  const {
    isOpen: isOpenLogin,
    closeModal: closeLogin,
    openModal: openLogin,
  } = useModal();
  const {
    isOpen: isOpenLogout,
    closeModal: closeLogout,
    openModal: openLogout,
  } = useModal();

  const router = useRouter();
  useEffect(() => {
    if (router.query.type === 'login') {
      console.log(router.pathname, router.query.type);
      openLogin();
      router.replace(`/`, undefined, { shallow: true });
    }
  }, []);

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
      // localStorage.setItem('name', variables.name);
    },
    onError: (error, variable, context) => {
      console.log('onError -> ', error, variable);
    },
  });

  // 로그인 api
  const { mutate: loginMutate, isLoading: loginLoading } = useMutation(signIn, {
    onMutate() {
      console.log('onMutate -> ');
    },
    onSuccess: (data, variables, context) => {
      console.log(data);
      dispatch(login());
      localStorage.setItem('name', variables.name);
      localStorage.setItem('userId', data.data.userId);
      closeLogin();
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
  const closeModal = () => {
    setIsSingUp(false);
    console.log(isOpenLogin);
    if (isOpenLogin) {
      closeLogin();
      return;
    }
    openLogin();
  };

  // 회원가입 후 인풋 초기화
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [reset, formState]);

  // 로그아웃
  const onLogout = () => {
    dispatch(logout());
    closeLogout();
  };

  useEffect(() => {
    if (isLoggedIn) {
      const user = localStorage.getItem('name');
      setName(user);
    }
  }, [localStorage.getItem('name')]);

  return (
    <div className="container h-screen">
      {isLoggedIn && (
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-lg flex-center bg-[#dbdbdb]">
            <BsFillPersonFill size="34" color="#F3F3F3" />
          </div>
          <div className="font-semibold text-black text-md">
            <div>
              {name}님, <br />
              안녕하세요!
            </div>
          </div>
        </div>
      )}

      <div className="fixed top-4 right-4">
        {isLoggedIn ? (
          <IconButton onClick={openLogout}>
            <FiLogOut size="20px" />
          </IconButton>
        ) : (
          <BasicButton name="LogIn" onClick={openLogin} />
        )}
      </div>

      <div>
        <p className="bg-clip-text bg-gradient-to-r from-pink-200 to-primary text-3xl mt-[4rem] font-bold text-transparent text-center ">
          Welcome to <br />
          BunnyPresso
          <br />
        </p>
        {/* <span className="flex justify-center mt-6 text-3xl">🐰☕️</span> */}
        <img
          className="w-3/4 mx-auto mt-8"
          src="https://www.banapresso.com/mo/static/media/greeting.b4aa8c76d4594b10386c.gif"
          alt="banapresso"
        />
      </div>

      {isOpenLogin && (
        <BasicModal
          isOpen={isOpenLogin}
          closeModal={closeModal}
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
      {isOpenLogout && (
        <BasicModal
          isOpen={isOpenLogout}
          closeModal={closeLogout}
          onConfirm={onLogout}
          title="로그아웃"
        >
          <div>로그아웃하시겠습니까?</div>
        </BasicModal>
      )}
    </div>
  );
};

export default Home;
