import None from '@/components/Common/None';
import { getOrderList } from '@/lib/api/menu';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

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
  // TODO: 주문목록 어떻게 refresh 할건지
  // TODO: 주문목록 가져올떄 userId를 보내서 내 주문 순서?도 같이 응답받을 수 있도록 하기
  const [list, setList] = useState();
  const { isLoading, isError, data, error, isSuccess } = useQuery(
    'orderList',
    () => getOrderList(),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const { orderList } = data.data;
        setList(orderList);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return (
    <div className="bg-gray-50">
      <div className="px-4 pt-4 pb-6 mb-2 bg-white border-b border-gray-100 flex-between ">
        <span className="font-bold">주문번호 1000</span>
        <span className="text-sm text-gray-400">2023.05.10 10:40</span>
      </div>
      {/* 진행상황 */}
      <div className="px-4 py-6 mb-4 bg-white border-gray-100 border-y">
        <ol className="flex items-center w-full px-2 mb-4">
          <li className="flex w-full items-center font-bold text-primary after:content-[''] after:w-full after:h-1 after:border-b after:border-primary after:border-4 after:inline-block">
            <span className="flex items-center justify-center w-10 h-10 bg-white border-4 rounded-full border-primary lg:h-12 lg:w-12 shrink-0">
              1
            </span>
          </li>

          <li className="flex w-full items-center text-gray-400 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block ">
            <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0">
              2
            </span>
          </li>

          <li className="flex items-center text-gray-400">
            <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0">
              3
            </span>
          </li>
        </ol>
        <ol className="text-sm text-gray-600 flex-between">
          <li className="font-bold text-primary">주문요청</li>
          <li>주문확인</li>
          <li>픽업대기</li>
        </ol>
      </div>
      {/* 제조 현황 */}
      <div className="px-4 py-4 bg-white border-t border-gray-100">
        <p className="text-sm font-bold">제조 현황</p>
        <p className="mt-2 font-bold text-md">
          고객님의 음료가 제조 중에 있습니다.
        </p>
        <ul className="flex flex-wrap mt-4">
          {new Array(8).fill('').map((idx) => {
            return (
              <li className="mt-1 mr-1 w-[calc(20%-4px)]" key={idx}>
                <div className="w-full aspect-square h-auto bg-gray-100 rounded-2xl border-[1.5px] border-primary relative">
                  <div className="absolute top-[-10px] bg-primary px-[6px] py-[1px] text-[10px] leading-3 rounded-xl text-white left-0">
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
            );
          })}
        </ul>
      </div>
    </div>
  );
}
