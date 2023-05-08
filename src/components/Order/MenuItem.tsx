import useModal from '@/hooks/useModal';
import { addComma } from '@/utils/addComma';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import BasicButton from '@/components/Button/BasicButton';
import FullModal from '@/components/Modal/FullModal';

type ItemPropsType = {
  tap: number;
};
type menuType = {
  id: number;
  img: string;
  name: string;
  engName: string;
  price: number;
  takeout: number;
  desc: string;
};
const menus: menuType[][] = [
  [
    {
      id: 1,
      img: '/image/menu/coffee.png',
      name: '아메리카노',
      engName: 'Americano',
      price: 2500,
      takeout: 1800,
      desc: '[진한 고소함] 견과류 풍미와 초콜릿처럼 달콤 쌉싸름한 맛이 밸런스 있게 어우러진 균형잡힌 바디감의 커피',
    },
  ],
];

// TODO: 탭 번호 해당하는 메뉴들 보여주기
export default function MenuItem({ tap }: ItemPropsType) {
  const router = useRouter();
  const { isOpen, modalHandler } = useModal();
  const [menu, setMenu] = useState<null | menuType | undefined>(null);
  const onClickMenu = (id: number) => {
    const selected = menus[tap].find((menu) => menu.id === id);
    setMenu(selected);
    modalHandler();
  };
  return (
    <>
      {menus[tap].map((menu) => {
        return (
          <li
            onClick={() => onClickMenu(menu.id)}
            key={`menu-${menu.name}`}
            className="flex items-center px-3 py-4 space-x-3 border-b border-b-gray-100"
          >
            <div className="w-[78px] h-[78px] bg-gray-100 rounded-3xl border border-gray-200 relative">
              <Image
                src={menu.img}
                style={{ objectFit: 'contain' }}
                fill
                alt="coffee"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-semibold text-md">{menu.name}</p>
              <p className="text-xs font-thin text-gray-400">{menu.engName}</p>
              <p className="text-sm text-gray-500">
                {addComma(menu.price)}원 (테이크아웃 {addComma(menu.takeout)}원)
              </p>
            </div>
          </li>
        );
      })}
      {isOpen && (
        <FullModal isOpen={isOpen} modalHandler={modalHandler}>
          {menu && (
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
                <div className="flex justify-center space-x-1">
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
              />
            </li>
          )}
        </FullModal>
      )}
    </>
  );
}
