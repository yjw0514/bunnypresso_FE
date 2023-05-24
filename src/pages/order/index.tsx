import MenuItem from '@/components/Order/MenuItem';
import { instance } from '@/lib/api';
import { getMenu } from '@/lib/api/menu';
import withAuth from '@/utils/withAuth';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import React, { useEffect, useState } from 'react';
const menuCategory = [
  'COFFEE',
  'DECAFFEINE COFFEE',
  'MILK & LATTE',
  'JUICE & DRINK',
  'TEA & ADE',
];

const order: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(data);
  const [tap, setTap] = useState(0);
  return (
    <div>
      {/* 메뉴 카테고리 */}
      <div className="w-full px-3 pb-3 mt-3 overflow-x-scroll text-xs text-gray-400 border-b border-gray-200 scrollbar-hide">
        <ul className="flex items-center space-x-6 w-max">
          {menuCategory.map((menu, idx) => {
            return (
              <li
                key={menu}
                className={`${
                  idx === tap ? 'text-black font-bold text-xs' : ''
                } relative`}
                onClick={() => setTap(idx)}
              >
                <p>{menu}</p>
                {idx === tap && (
                  <div className="absolute z-20 w-full h-[2px] bg-black top-[26px] rounded-md"></div>
                )}
              </li>
            );
          })}
        </ul>
      </div>

      <ul className="pb-4">
        <MenuItem tap={tap} />
      </ul>
    </div>
  );
};

export default order;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:5000/menu');
  const data = await res.json();
  return { props: { data } };
};
