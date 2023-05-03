import React from 'react';
import { FiSearch } from 'react-icons/fi';
// TODO: 라우트에 따라 title 변경하기
export default function Header() {
  return (
    <div className="w-full pb-4 flex-between">
      <h2 className="font-semibold">주문</h2>
      <button>
        <FiSearch />
      </button>
    </div>
  );
}
