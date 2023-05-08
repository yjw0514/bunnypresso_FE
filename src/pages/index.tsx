import BasicButton from '@/components/Button/BasicButton';
import IconButton from '@/components/Button/IconButton';
import BasicModal from '@/components/Modal/BasicModal';
import useModal from '@/hooks/useModal';
import { useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { isOpen, modalHandler } = useModal();

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
          <IconButton onClick={modalHandler}>
            <FiLogOut size="20px" />
          </IconButton>
        ) : (
          <BasicButton name="LogIn" />
        )}
      </div>

      <div className="bg-clip-text bg-gradient-to-r from-pink-200 to-primary text-3xl mt-[8rem] font-bold text-transparent text-center ">
        Welcome to <br />
        BananaPresso
      </div>

      {isOpen && (
        <BasicModal isOpen={isOpen} modalHandler={modalHandler}>
          {isLoggedIn ? <div>로그아웃하시겠습니까?</div> : <div>로그인 폼</div>}
        </BasicModal>
      )}
    </div>
  );
}
