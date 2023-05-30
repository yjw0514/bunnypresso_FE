import MenuItem from '@/components/Order/MenuItem';
import withAuth from '@/utils/withAuth';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
const CATEGORY = [
  'COFFEE',
  'BANACCINO & SMOOTHIE',
  'JUICE & DRINK',
  'TEA & ADE',
  'DESSERT',
];

const order: NextPage = ({
  menu,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [tap, setTap] = useState(0);
  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    const list = menu.filter((el: any) => el.category === CATEGORY[tap]);
    setMenuList(list);
  }, [tap]);
  return (
    <div>
      {/* 메뉴 카테고리 */}
      <div className="w-full px-3 mt-3 overflow-x-scroll text-xs text-gray-400 border-b border-gray-200 scrollbar-hide">
        <ul className="flex items-center space-x-6 w-max">
          {CATEGORY.map((menu, idx) => {
            return (
              <li
                key={menu}
                className={`${
                  idx === tap
                    ? 'text-black font-bold text-xs !border-black'
                    : ''
                } relative transition-all duration-300 pb-3 border-b-2 border-transparent`}
                onClick={() => setTap(idx)}
              >
                <p>{menu}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <ul className="pb-20">
        <MenuItem menu={menuList} />
      </ul>
    </div>
  );
};

export default withAuth(order);

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:5000/menu');
  const { menu } = await res.json();
  return { props: { menu } };
};
