import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BsFillPersonFill } from 'react-icons/bs';
import { RiHomeLine, RiHomeFill } from 'react-icons/ri';
import { BsPhoneVibrate } from 'react-icons/bs';
import { BiNotepad } from 'react-icons/bi';
import { TbBorderAll } from 'react-icons/tb';
import { useRouter } from 'next/router';

export default function Footer() {
  const { pathname } = useRouter();
  return (
    <ul className="fixed bottom-0 left-0 right-0 z-50 flex px-4 py-2 bg-white border border-gray-100 rounded-t-xl flex-between">
      <Link href="/">
        <li className={`menu-item ${pathname === '/' ? 'active' : 'unactive'}`}>
          {pathname === '/' ? (
            <RiHomeFill size="20" />
          ) : (
            <RiHomeLine size="20" />
          )}
          <p>홈</p>
        </li>
      </Link>
      <Link href="/membership">
        <li
          className={`menu-item ${
            pathname === '/membership' ? 'active' : 'unactive'
          }`}
        >
          <BsFillPersonFill size="20" />
          <p>멤버쉽</p>
        </li>
      </Link>
      <Link href="/order">
        <li
          className={`fixed bottom-2 left-1/2 translate-x-[-50%] bg-gradient-to-r from-pink-300 to-[#FA6FA9] shadow-md text-white w-[3.6rem] h-[3.6rem] rounded-full menu-item ${
            pathname === '/order' ? 'active' : 'unactive'
          }`}
        >
          <div className="gap-1 flex-col-center">
            <BsPhoneVibrate size="20" />
            <p>주문</p>
          </div>
        </li>
      </Link>
      <Link href="/story">
        <li
          className={`menu-item ${
            pathname === '/story' ? 'active' : 'unactive'
          }`}
        >
          <BiNotepad size="20" />
          <p>스토리</p>
        </li>
      </Link>
      <Link href="/menu">
        <li
          className={`menu-item ${
            pathname === '/menu' ? 'active' : 'unactive'
          }`}
        >
          <TbBorderAll size="20" />
          <p>전체</p>
        </li>
      </Link>
    </ul>
  );
}
