import BasicButton from '@/components/Button/BasicButton';
import IconButton from '@/components/Button/IconButton';
import BasicModal from '@/components/Modal/BasicModal';
import useModal from '@/hooks/useModal';
import { useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { isOpen: openLogin, modalHandler: loginModalHandler } = useModal();
  const { isOpen: openLogout, modalHandler: logoutModalHandler } = useModal();

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

      <div className="bg-clip-text bg-gradient-to-r from-pink-200 to-primary text-3xl mt-[8rem] font-bold text-transparent text-center ">
        Welcome to <br />
        BananaPresso
      </div>

      {openLogin && (
        <BasicModal
          isOpen={openLogin}
          modalHandler={loginModalHandler}
          btnName="로그인"
          title="Login"
        >
          <form>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                NickName
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-primary focus:border-primary block w-full p-2.5"
                placeholder="john.doe@company.com"
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-primary focus:border-primary block w-full p-2.5 "
                placeholder="•••••••••"
                required
                autoComplete="on"
              />
            </div>
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
