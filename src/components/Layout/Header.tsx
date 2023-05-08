import { useRouter } from 'next/router';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
// TODO: 라우트에 따라 title 변경하기
export default function Header() {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className="w-full px-3 pb-4 flex-between">
      {pathname === '/order/[id]' ? (
        <>
          <div className="flex items-center space-x-3">
            <button onClick={() => router.back()}>
              <BiArrowBack size={20} />
            </button>
            <h2 className="font-semibold">메뉴 상세</h2>
          </div>
        </>
      ) : (
        <>
          <h2 className="font-semibold">주문</h2>
          <button>
            <FiSearch />
          </button>
        </>
      )}
    </div>
  );
}
