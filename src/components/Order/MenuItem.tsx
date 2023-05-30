import useModal from '@/hooks/useModal';
import { addComma } from '@/utils/addComma';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

type ItemPropsType = {
  menu: menuType[];
};
type menuType = {
  _id: string;
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
        const { _id, name, img_url, price, en_name, takeout } = menu;
        return (
          <li
            onClick={() => onClickMenu(_id)}
            key={`${name}-${_id}`}
            className="flex items-center px-3 py-4 space-x-3 border-b last:border-none border-b-gray-100"
          >
            <div className="w-[78px] h-[78px] bg-gray-100 rounded-3xl border border-gray-200 relative">
              <Image
                src={img_url}
                style={{ objectFit: 'contain' }}
                fill
                alt="coffee"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <p className="font-semibold text-md">{name}</p>
              <p className="text-xs font-thin text-gray-400">{en_name}</p>
              <p className="text-sm text-gray-500">
                {addComma(price)}원 (테이크아웃 {addComma(takeout)}원)
              </p>
            </div>
          </li>
        );
      })}
    </>
  );
}
