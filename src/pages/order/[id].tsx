import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import BasicButton from '@/components/Button/BasicButton';
import BasicModal from '@/components/Modal/BasicModal';
import useModal from '@/hooks/useModal';
import { addComma } from '@/utils/addComma';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const menu = {
  img: '/image/menu/coffee.png',
  name: '아메리카노',
  engName: 'Americano',
  price: 2500,
  takeout: 1800,
  desc: '[진한 고소함] 견과류 풍미와 초콜릿처럼 달콤 쌉싸름한 맛이 밸런스 있게 어우러진 균형잡힌 바디감의 커피',
};

export default function Detail() {
  const [count, setCount] = useState(1);

  const {
    query: { id },
  } = useRouter();
  const { isOpen, modalHandler } = useModal();
  return (
    <>
      <ul>
        {id && (
          <li className="flex flex-col items-center mx-5 space-y-2">
            {/* <div className="w-[78px] h-[78px] bg-gray-100 rounded-3xl border border-gray-200 relative"> */}
            <Image src={menu.img} alt="coffee" width="200" height="200" />
            {/* </div> */}
            <div className="flex flex-col items-center pb-5 border-b border-b-gray-200">
              <h2 className="text-xl font-semibold">{menu.name}</h2>
              <p className="mt-1 text-sm font-light text-gray-400">
                {menu.engName}
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
                  <AiOutlineMinus
                    size={10}
                    className="w-5 h-5 px-1 font-bold text-gray-400 border border-gray-400 rounded-full"
                  />
                  <p>{count}</p>
                  <AiOutlinePlus
                    size={10}
                    className="w-5 h-5 px-1 text-gray-400 border border-gray-400 rounded-full"
                  />
                </div>
              </div>
              <div className="flex justify-center mt-4 space-x-2">
                <button className="text-gray-400 bg-gray-100 border border-gray-400 w-14 rounded-xl">
                  Hot
                </button>
                <button className="text-gray-400 bg-gray-100 border border-gray-400 w-14 rounded-xl">
                  Ice
                </button>
              </div>
            </div>
            <BasicButton
              utilType="fill"
              className="!px-3 !py-2 !mt-6 !rounded-3xl"
              name="바로 주문하기"
              onClick={modalHandler}
            />
          </li>
        )}
      </ul>
      {isOpen && (
        <BasicModal
          title="주문 확인"
          isOpen={isOpen}
          modalHandler={modalHandler}
        >
          <div>선택하신 상품을 주문하시겠습니까?</div>
        </BasicModal>
      )}
    </>
  );
}
