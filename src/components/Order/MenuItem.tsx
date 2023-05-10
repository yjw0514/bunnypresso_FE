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

const menu = [
  {
    id: 1,
    img: '/image/menu/coffee.png',
    name: '아메리카노',
    engName: 'Americano',
    price: 2500,
    takeout: 1800,
    desc: '[진한 고소함] 견과류 풍미와 초콜릿처럼 달콤 쌉싸름한 맛이 밸런스 있게 어우러진 균형잡힌 바디감의 커피',
  },
];
const menus: menuType[][] = new Array(6).fill(menu);

// TODO: 탭 번호 해당하는 메뉴들 보여주기
export default function MenuItem({ tap }: ItemPropsType) {
  const router = useRouter();
  const [menuId, setMenuId] = useState<null | number>(null);
  const onClickMenu = (id: number) => {
    setMenuId(id);
    router.push(`/order/${menuId}`);
  };

  return (
    <>
      {menus[tap].map((menu) => {
        return (
          <li
            // onClick={() => onClickMenu(menu.id)}
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
    </>
  );
}
