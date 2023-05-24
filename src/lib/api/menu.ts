import { instance } from '@/lib/api/index';

export const getMenu = () => {
  return instance.get('/menu');
};

const MenuApi = { getMenu };
export default MenuApi;
