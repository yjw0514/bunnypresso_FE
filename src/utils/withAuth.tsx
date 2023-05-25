import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { getCookie } from '@/utils/cookies';
import { useAppDispatch } from '@/store/hooks';
import { login, logout } from '@/store/slice/authSlice';

const withAuth = (Component: NextPage | React.FC) => {
  const Auth = ({ ...props }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    let isAuth = false;

    useEffect(() => {
      const accessToken = getCookie('accessToken');
      const name = localStorage.getItem('name');
      isAuth = !!accessToken && !!name;
      if (!isAuth) {
        dispatch(logout());
        router.replace(`/?type=login`);
        return;
      }
    }, [router]);

    dispatch(login());
    return <Component {...props} />;
  };

  return Auth;
};

export default withAuth;
