import BasicButton from '@/components/Button/BasicButton';
import IconButton from '@/components/Button/IconButton';
import BasicModal from '@/components/Modal/BasicModal';
import useModal from '@/hooks/useModal';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { LoginValue } from '@/dto/loginDto';
import { loginSchema } from '@/utils/schema';
import BasicInput from '@/components/Input/BasicInput';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSingUp] = useState(false);

  const { isOpen: openLogin, modalHandler: loginModalHandler } = useModal();
  const { isOpen: openLogout, modalHandler: logoutModalHandler } = useModal();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginValue>({
    resolver: yupResolver(loginSchema),
  });

  const submitHandler: SubmitHandler<LoginValue> = (data) => {
    console.log(data);
  };

  const onCloseModal = () => {
    setIsSingUp(false);
    loginModalHandler();
  };
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
