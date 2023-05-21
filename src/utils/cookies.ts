import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCooke = (name: string, value: string, option?: any) => {
  return cookies.set(name, value, { ...option });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};
