import { instance } from '@/lib/api/index';

export const getMenuDetail = (id: string) => {
  return instance.get(`/menu/${id}`);
};

const MenuApi = { getMenuDetail };
export default MenuApi;
