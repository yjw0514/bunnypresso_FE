import None from '@/components/Common/None';
import Image from 'next/image';
import React from 'react';

const menu = {
  id: 1,
  img: '/image/menu/coffee.png',
  name: '아메리카노',
  engName: 'Americano',
  price: 2500,
  takeout: 1800,
  desc: '[진한 고소함] 견과류 풍미와 초콜릿처럼 달콤 쌉싸름한 맛이 밸런스 있게 어우러진 균형잡힌 바디감의 커피',
};

export default function story() {
  return (
    <div className="px-3 py-2">
      <div className="flex-between">
        <span className="font-bold">주문번호 1000</span>
        <span className="text-sm text-gray-400">2023.05.10 10:40</span>
      </div>
      <div>
        <ol className="flex items-center w-full">
          <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
            <span className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
              1
            </span>
          </li>
          <p>주문요청</p>
          <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
            <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              2
            </span>
          </li>
          <p>주문확인</p>

          <li className="flex items-center w-full">
            <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              3
            </span>
          </li>
          <p>픽업대기</p>
        </ol>
      </div>
      <div>
        <p>제조 현황</p>
        <p>고객님의 음료가 제조 중에 있습니다.</p>
        <ul>
          <li>
            <div className="w-[78px] h-[78px] bg-gray-100 rounded-3xl border border-primary relative">
              <div className="absolute top-[-10px] bg-primary px-2 py-1 text-xs leading-3 rounded-xl text-white left-0">
                MY
              </div>
              <Image
                src={menu.img}
                style={{ objectFit: 'contain' }}
                fill
                alt="coffee"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
