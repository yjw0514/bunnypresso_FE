import useModal from '@/hooks/useModal';
import { addComma } from '@/utils/addComma';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import BasicButton from '@/components/Button/BasicButton';
import FullModal from '@/components/Modal/FullModal';

type ItemPropsType = {
  menu: menuType[];
};
type menuType = {
  id: string;
  img_url: string;
  name: string;
  en_name: string;
  price: number;
  takeout: number;
  desc: string;
  category: string;
};

export default function MenuItem({ menu }: ItemPropsType) {
  const router = useRouter();
  const [menuId, setMenuId] = useState<null | string>(null);
  const onClickMenu = (id: string) => {
    setMenuId(id);
    router.push(`/order/${menuId}`);
  };

  return (
    <>
      {menu.map((menu) => {
        return (
          <li
            onClick={() => onClickMenu(menu.id)}
            key={`menu-${menu.name}`}
            className="flex items-center px-3 py-4 space-x-3 border-b border-b-gray-100"
          >
            <div className="w-[78px] h-[78px] bg-gray-100 rounded-3xl border border-gray-200 relative">
              <Image
                src={menu.img_url}
                style={{ objectFit: 'contain' }}
                fill
                alt="coffee"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-semibold text-md">{menu.name}</p>
              <p className="text-xs font-thin text-gray-400">{menu.en_name}</p>
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
