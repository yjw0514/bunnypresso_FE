import { useEffect, useState } from 'react';
import BasicButton from '@/components/Button/BasicButton';
import BasicModal from '@/components/Modal/BasicModal';
import MainBanner from '@/components/Home/MainBanner';

import useModal from '@/hooks/useModal';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slice/authSlice';
import { getCookie } from '@/utils/cookies';

const Home = () => {
  const [name, setName] = useState<string | null>(null);
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    isOpen: isOpenLogout,
    closeModal: closeLogout,
    openModal: openLogout,
  } = useModal();

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
  }, [isLoggedIn]);
  useEffect(() => {
    if (!getCookie('accessToken')) {
      dispatch(logout());
    }
  }, [getCookie('accessToken')]);

  return (
    <div className="h-screen pb-24 overflow-scroll bg-gray-100 wrapper scrollbar-hide">
      <div>
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <img
              className=" w-14 h-14"
              src="https://source.boringavatars.com/beam/?colors=264653,2a9d8f,e9c46a,f4a261,e76f51"
              alt="profile-image"
            />
            <div className="font-semibold text-black text-md">
              <p>
                {name}님, <br />
                안녕하세요!
              </p>
            </div>
          </div>
        ) : null}

        <div className="fixed top-4 right-4">
          {isLoggedIn ? (
            <BasicButton name="로그아웃" onClick={openLogout} />
          ) : (
            <BasicButton name="로그인" onClick={() => router.push('/login')} />
          )}
        </div>
        {/* <div className="relative w-3/4 max-w-sm mt-8 h-3/4"> */}
        {/* <Image
          src="/image/banner/banner1.jpg"
          alt="banner"
          sizes="100%"
          priority={true}
          layout="fill"
          className="rounded-lg"
        /> */}
        {/* </div> */}
        <MainBanner />

        {isOpenLogout ? (
          <BasicModal
            isOpen={isOpenLogout}
            closeModal={closeLogout}
            onConfirm={onLogout}
            title="로그아웃"
          >
            <div>로그아웃하시겠습니까?</div>
          </BasicModal>
        ) : null}
      </div>
    </div>
  );
};

export default Home;
