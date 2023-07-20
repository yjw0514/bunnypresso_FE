import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { menuType } from '@/dto/menuDto';
import { addComma } from '@/utils/addComma';
import { useAppSelector } from '@/store/hooks';

type ItemPropsType = {
  menu: menuType[];
};

export default function MenuItem({ menu }: ItemPropsType) {
  const router = useRouter();
  const tap = useAppSelector((state) => state.menu.tap);
  const hasOneOption = [1, 2, 4]; //ice만 있는 메뉴 index
  const onClickMenu = (id: string) => {
    if (hasOneOption.includes(tap)) {
      return router.push(`/menu/${id}?hasOneOption=true`);
    }
    router.push(`/menu/${id}`);
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
                // style={{ objectFit: 'contain' }}
                layout="fill"
                sizes="100%"
                alt={name}
                priority
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
