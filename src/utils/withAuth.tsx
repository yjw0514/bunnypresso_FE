import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '@/utils/cookies';

const withAuth = (Component: NextPage | React.FC) => {
  const Auth = () => {
    const router = useRouter();

    useEffect(() => {
      const accessToken = getCookie('accessToken');
      const name = localStorage.getItem('name');

      if (accessToken && name) {
        router.replace(`/?type=login`);
        return;
      }
      <Component />;
    }, [router]);
  };

  return Auth;
};

export default withAuth;
