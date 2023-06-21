import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/router';

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { pathname } = useRouter();
  const hasHeaderRoute = ['/menu', '/menu/[id]'];
  return (
    <div>
      {/* {hasHeaderRoute.includes(pathname) && <Header />} */}
      {children}
      {pathname !== '/menu/[id]' && <Footer />}
    </div>
  );
}
