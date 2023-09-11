import None from '@/components/Common/None';
import MainBanner from '@/components/Home/MainBanner';
import Image from 'next/image';
import React from 'react';
import eventOne from '../../public/image/event/1.jpeg';
import eventTWe from '../../public/image/event/2.png';
import eventThree from '../../public/image/event/3.jpeg';

export default function All() {
  return (
    <section className="flex flex-col h-full px-4 pb-16">
      <h2 className="py-4 mb-4 font-semibold">공지사항 & 이벤트</h2>
      <ul className="overflow-y-auto scrollbar-hide">
        <li className="w-full mb-4">
          <Image
            src={eventOne}
            className="border rounded-lg border-slate-100"
          />
          <p className="text-sm font-semibold">신메뉴 자허블 출시</p>
          <p className="text-xs text-gray-400">2023.09.01</p>
        </li>
        <li className="w-full mb-4">
          <Image
            src={eventTWe}
            className="border rounded-lg border-slate-100"
          />
          <p className="text-sm font-semibold">카카페오페 사용 안내</p>
          <p className="text-xs text-gray-400">2023.05.05</p>
        </li>
        <li className="w-full">
          <Image
            src={eventThree}
            className="border rounded-lg border-slate-100"
          />
          <p className="text-sm font-semibold">바나프레소 새로운 지점 오픈</p>
          <p className="text-xs text-gray-400">2023.01.01</p>
        </li>
      </ul>
    </section>
  );
}
