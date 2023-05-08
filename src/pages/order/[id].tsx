import { addComma } from '@/utils/addComma';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const menus = [
  [
    {
      img: '/image/menu/coffee.png',
      name: '아메리카노',
      engName: 'Americano',
      price: 2500,
      takeout: 1800,
      desc: '[진한 고소함] 견과류 풍미와 초콜릿처럼 달콤 쌉싸름한 맛이 밸런스 있게 어우러진 균형잡힌 바디감의 커피',
    },
  ],
];
export default function Detail() {
  const {
    query: { id },
  } = useRouter();

  return (
    <>
      {menus[Number(id)]?.map((menu, idx) => {
        return (
          <li
            key={`menu-${menu.name}`}
            className="flex items-center px-3 py-4 space-x-3 border-b border-b-gray-100"
          >
            <div className="w-[78px] h-[78px] bg-gray-100 rounded-3xl border border-gray-200 relative">
              <Image
                src={menu.img}
                style={{ objectFit: 'contain' }}
                fill
                alt="coffee"
                sizes="100%"
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
    </>
  );
}
