import { useRouter } from 'next/router';
import React from 'react';
import { BiArrowBack } from 'react-icons/bi';
import { FiSearch } from 'react-icons/fi';
// TODO: 라우트에 따라 title 변경하기
export default function Header() {
  const router = useRouter();
  const { pathname } = router;

  return null;
}
