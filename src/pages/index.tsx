import { useEffect, useState } from 'react';
import Image from 'next/image';
import BasicButton from '@/components/Button/BasicButton';
import BasicModal from '@/components/Modal/BasicModal';

import useModal from '@/hooks/useModal';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { logout } from '@/store/slice/authSlice';
import { getCookie } from '@/utils/cookies';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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

  const bannerSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

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
        <section className="flex flex-col mt-10 space-y-4 h-3/4">
          <p className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-200 to-primary">
            Welcome to <br />
            BunnyPresso
            <br />
          </p>
          <Slider
            {...bannerSettings}
            className="w-10/12 max-h-[500px] max-w-md mx-auto"
          >
            {new Array(3).fill(null).map((item, idx) => {
              return (
                <div className="w-full rounded-lg" key={`banner-${idx}`}>
                  <img
                    src={`/image/banner${idx + 1}.jpg`}
                    alt="banner"
                    className="w-full h-full rounded-lg shadow-md"
                  />
                </div>
              );
            })}
          </Slider>
        </section>

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
