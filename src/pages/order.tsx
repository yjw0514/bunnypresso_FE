import React from 'react';

const menuCategory = [
  '추천',
  'COFFEE',
  'DECAFFEINE COFFEE',
  'MILK & LATTE',
  'JUICE & DRINK',
];

export default function order() {
  return (
    <div>
      {/* 메뉴 카테고리 */}
      <div className="w-full fixed top-[52px] left-0 pb-3 pl-3  overflow-x-scroll text-sm text-gray-400 border-b border-gray-200 scrollbar-hide">
        <ul className="flex items-center gap-6 leading-3 w-max ">
          {menuCategory.map((el) => {
            return <li key={el}>{el}</li>;
          })}
        </ul>
      </div>

      <ul className="mt-8">메뉴</ul>
    </div>
  );
}
