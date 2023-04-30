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
    <div>
      {pathname !== '/' && <Header />}
      {children}
      <Footer />
    </div>
  );
}
