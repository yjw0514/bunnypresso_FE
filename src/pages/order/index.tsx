import MenuItem from '@/components/Order/MenuItem';
import React, { useState } from 'react';
const menuCategory = [
  'COFFEE',
  'DECAFFEINE COFFEE',
  'MILK & LATTE',
  'JUICE & DRINK',
  'TEA & ADE',
  'BREAD',
];

export default function order() {
  const [tap, setTap] = useState(0);

  return (
    <div>
      {/* 메뉴 카테고리 */}
      <div className="w-full pb-3 pl-3 mt-3 overflow-x-scroll text-xs text-gray-400 border-b border-gray-200 scrollbar-hide">
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
}
