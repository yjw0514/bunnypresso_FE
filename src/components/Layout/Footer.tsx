import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BsFillPersonFill, BsPhoneFill } from 'react-icons/bs';
import { RiHomeLine, RiHomeFill } from 'react-icons/ri';
import { BsPhoneVibrate } from 'react-icons/bs';
import { BiNotepad } from 'react-icons/bi';
import { TbBorderAll } from 'react-icons/tb';
import { useRouter } from 'next/router';
import Tooltip from '@/components/Tooltip/index';

export default function Footer() {
  const [showTooltip, setShowTooltip] = useState(true);
  const { pathname } = useRouter();

  useEffect(() => {
    setTimeout(() => {
      setShowTooltip(false);
    }, 3000);
  }, []);
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex max-w-md px-4 py-2 bg-white border border-gray-100 rounded-t-xl flex-between">
      <Link href="/">
        <a className={`menu-item ${pathname === '/' ? 'active' : 'unactive'}`}>
          {pathname === '/' ? (
            <RiHomeFill size="20" />
          ) : (
            <RiHomeLine size="20" />
          )}
          <p>홈</p>
        </a>
      </Link>
      <Link href="/mypage">
        <a
          className={`menu-item ${
            pathname === '/mypage' ? 'active' : 'unactive'
          }`}
        >
          <BsFillPersonFill size="20" />
          <p>내정보</p>
        </a>
      </Link>
      <Link href="/menu" className="relative">
        <a>
          {showTooltip ? (
            <div className="absolute left-1/2 translate-x-[-50%] bottom-16">
              <Tooltip />
            </div>
          ) : null}

          {pathname === '/menu' ? (
            <div
              className={`menu-item  ${
                pathname === '/menu' ? 'active' : 'unactive'
              }`}
            >
              <BsPhoneFill />
              <p>주문</p>
            </div>
          ) : (
            // <div className="fixed left-0 right-0 max-w-md bottom-3">
            //   <div
            //     className={`absolute bottom-0 left-1/2 translate-x-[-50%] bg-gradient-to-r from-pink-300 to-primary shadow-md text-white w-[3.4rem] h-[3.4rem] rounded-full menu-item ${
            //       pathname === '/menu' ? 'active' : 'unactive'
            //     }`}
            //   >
            //     <div className="gap-1 flex-col-center">
            //       <BsPhoneVibrate size="20" />
            //       <p>주문</p>
            //     </div>
            //   </div>
            // </div>
            <div
              className={`absolute bottom-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-300 to-primary shadow-md text-white w-[3.4rem] h-[3.4rem] rounded-full menu-item ${
                pathname === '/menu' ? 'active' : 'unactive'
              }`}
            >
              <div className="gap-1 flex-col-center">
                <BsPhoneVibrate size="20" />
                <p>주문</p>
              </div>
            </div>
          )}
        </a>
      </Link>
      <Link href="/story">
        <a
          className={`menu-item ${
            pathname === '/story' ? 'active' : 'unactive'
          }`}
        >
          <BiNotepad size="20" />
          <p>스토리</p>
        </a>
      </Link>
      <Link href="/all">
        <a
          className={`menu-item ${pathname === '/all' ? 'active' : 'unactive'}`}
        >
          <TbBorderAll size="20" />
          <p>새소식</p>
        </a>
      </Link>
    </div>
  );
}
