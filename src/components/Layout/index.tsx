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
  return (
    <div className="pt-3 ">
      {pathname !== '/' && <Header />}
      {children}
      {pathname !== '/order/[id]' && <Footer />}
    </div>
  );
}
