import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';

import BasicButton from '@/components/Button/BasicButton';
import BasicModal from '@/components/Modal/BasicModal';
import useModal from '@/hooks/useModal';
import { addComma } from '@/utils/addComma';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { getMenuDetail, takeOrder } from '@/lib/api/menu';
import Loading from '@/components/Loading';
import { menuType } from '@/dto/menuDto';
import { BiArrowBack } from 'react-icons/bi';

export default function Detail() {
  const [count, setCount] = useState(1);
  const [menu, setMenu] = useState<menuType>();
  const [isHot, setIsHot] = useState(true);
  const [oneOption, setOneOption] = useState(false);
  const { isOpen, openModal, closeModal } = useModal();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setOneOption(!!router.query.hasOneOption);
  }, [oneOption]);
  // 메뉴 상세정보 api
  const { isLoading, isError, data, error, isSuccess } = useQuery(
    ['menuId'],
    () => getMenuDetail(id as string),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const { detail } = data.data;
        setMenu(detail);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  if (isLoading) {
    return <Loading />;
  }
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
        menu: menu?.name,
        count,
      };
    } else {
      params = {
        userId: localStorage.getItem('userId') as string,
        menu: menu?.name,
        isHot,
        count,
      };
    }
    try {
      await takeOrder(params);
      router.push('/story');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full px-3 pt-3 pb-4 flex-between">
        <div className="flex items-center space-x-3">
          <button onClick={() => router.back()}>
            <BiArrowBack size={20} />
          </button>
          <h2 className="font-semibold">메뉴 상세</h2>
        </div>
      </div>
      <div className="mt-[30px]" style={{ height: 'calc(100vh - 52px)' }}>
        {menu && (
          <div className="flex flex-col items-center justify-center h-full mx-5 space-y-6">
            <Image
              src={menu?.img_url}
              alt="coffee"
              priority
              width="200"
              height="200"
            />
            <div className="flex flex-col items-center pb-5 border-b border-b-gray-200">
              <h2 className="text-xl font-semibold">{menu.name}</h2>
              <p className="mt-1 text-sm font-light text-gray-400">
                {menu.en_name}
              </p>
              <p className="mt-3 text-sm font-normal text-center text-gray-500 ">
                {menu.desc}
              </p>
            </div>
            <div>
              <p className="mb-3 text-gray-500 text-md">
                {addComma(menu.price)}원 (테이크아웃 {addComma(menu.takeout)}
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
              onClick={openModal}
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
              {menu?.name}&nbsp;
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

export async function getServerSideProps({
  params: { id },
}: {
  params: { id: string };
}) {
  return {
    props: {},
  };
}
