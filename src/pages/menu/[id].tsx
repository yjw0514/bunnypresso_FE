import React, { useEffect, useState } from 'react';
import { GetStaticPaths } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import BasicButton from '@/components/Button/BasicButton';
import BasicModal from '@/components/Modal/BasicModal';
import useModal from '@/hooks/useModal';
import { addComma } from '@/utils/addComma';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { takeOrder } from '@/lib/api/menu';
import { menuType } from '@/dto/menuDto';
import DetailHeader from '@/components/Menu/DetailHeader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import axios from 'axios';
import { logout } from '@/store/slice/authSlice';

export default function Detail({ menu: { detail } }: any) {
  const [count, setCount] = useState(1);
  const [isHot, setIsHot] = useState(true);
  const [oneOption, setOneOption] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setOneOption(!!router.query.hasOneOption);
  }, [router.query.hasOneOption]);

  const countHandler = (e: React.MouseEvent<HTMLElement>) => {
    const isMinus = e.currentTarget.dataset['id'] === 'minus';
    if (isMinus) {
      setCount((prev) => prev - 1);
      return;
    }
    setCount((prev) => prev + 1);
  };

  const temperatureHandler = (e: React.MouseEvent<HTMLElement>) => {
    const isHot = e.currentTarget.dataset['id'] === 'hot';
    setIsHot(isHot);
  };

  const orderHandler = async () => {
    let params = null;
    if (oneOption) {
      params = {
        userId: localStorage.getItem('userId') as string,
        menu: detail?.name,
        count,
      };
    } else {
      params = {
        userId: localStorage.getItem('userId') as string,
        menu: detail?.name,
        isHot,
        count,
      };
    }
    try {
      await takeOrder(params);
      router.push('/story');
    } catch (err) {
      console.log('order error', err);
      if (axios.isAxiosError(err) && err.response?.status === 401) {
        dispatch(logout());
        return router.replace(`/?type=login`);
      }
    }
  };

  const openOrderModal = () => {
    if (!isLoggedIn) {
      return router.replace(`/?type=login`);
    }
    openModal();
  };

  return (
    <>
      <DetailHeader />
      <div className="mt-[30px]" style={{ height: 'calc(100vh - 52px)' }}>
        {detail && (
          <div className="flex flex-col items-center justify-center h-full mx-5 space-y-6">
            <Image
              src={detail?.img_url}
              alt="coffee"
              priority
              width="200"
              height="200"
            />
            <div className="flex flex-col items-center pb-5 border-b border-b-gray-200">
              <h2 className="text-xl font-semibold">{detail.name}</h2>
              <p className="mt-1 text-sm font-light text-gray-400">
                {detail.en_name}
              </p>
              <p className="mt-3 text-sm font-normal text-center text-gray-500 ">
                {detail.desc}
              </p>
            </div>
            <div>
              <p className="mb-3 text-gray-500 text-md">
                {addComma(detail.price)}원 (테이크아웃{' '}
                {addComma(detail.takeout)}
                원)
              </p>
              <div className="mt-2 flex-between">
                <p>수량</p>
                <div className="flex items-center space-x-2">
                  <button
                    disabled={count === 1}
                    onClick={countHandler}
                    data-id="minus"
                    className=" count-btn"
                  >
                    <AiOutlineMinus size={10} strokeWidth="10" />
                  </button>
                  <p>{count}</p>
                  <button
                    onClick={countHandler}
                    data-id="plus"
                    className="w-5 h-5 px-1 text-gray-400 border border-gray-400 rounded-full count-btn"
                    disabled={count === 10}
                  >
                    <AiOutlinePlus size={10} strokeWidth="10" />
                  </button>
                </div>
              </div>
              {!oneOption && (
                <div className="flex justify-center mt-4 space-x-2">
                  <button
                    onClick={temperatureHandler}
                    data-id="hot"
                    className={`temp-btn ${isHot ? 'temp-active' : ''}`}
                  >
                    Hot
                  </button>
                  <button
                    onClick={temperatureHandler}
                    data-id="ice"
                    className={`temp-btn ${isHot ? '' : 'temp-active'}`}
                  >
                    Ice
                  </button>
                </div>
              )}
            </div>
            <BasicButton
              utilType="fill"
              className="!px-3 !py-2 !mt-10 !rounded-3xl"
              name="바로 주문하기"
              onClick={openOrderModal}
            />
          </div>
        )}
      </div>
      {isOpen && (
        <BasicModal
          title="주문 확인"
          isOpen={isOpen}
          closeModal={closeModal}
          onConfirm={orderHandler}
        >
          <div className="text-center">
            <span className="font-bold text-md text-primary">
              {detail?.name}&nbsp;
              {count}잔
            </span>
            {!oneOption && <span>({isHot ? 'Hot' : 'Ice'})</span>}
            <p className="mt-1">선택하신 음료를 주문하시겠습니까?</p>
          </div>
        </BasicModal>
      )}
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/menu`);
  const { menu } = await res.json();
  const paths = menu.map((el: menuType) => ({
    params: { id: el._id },
  }));
  return { paths, fallback: false };
};
export async function getStaticProps({ params }: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_AUTH_API_URL}/menu/${params.id}`
  );
  const menu = await res.json();
  return {
    props: {
      menu,
    },
  };
}
