import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';
import { getCookie } from '@/utils/cookies';
import { useAppDispatch } from '@/store/hooks';
import { login } from '@/store/slice/authSlice';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (getCookie('accessToken') && getCookie('refreshToken')) {
      dispatch(login());
    }
  }, []);
  return (
    <div>
      {children}
      {pathname !== '/menu/[id]' && <Footer />}
    </div>
  );
}
