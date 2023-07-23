import { orderType } from '@/dto/orderDto';
import { instance } from '@/lib/api/index';

// 메뉴 목록
export const getMenu = (name?: string) => {
  return instance.get(`/menu?name=${name}`);
};

// 메뉴 상세 정보 가져오기
export const getMenuDetail = (id: string) => {
  return instance.get(`/menu/${id}`);
};

// 주문 등록
export const takeOrder = ({ userId, menu, isHot, count }: orderType) => {
  return instance.post('/order', { userId, menu, isHot, count });
};

// 주문목록 가져오기
export const getOrderList = () => {
  return instance.get('/order/list');
};
