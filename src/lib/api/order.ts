import { orderType } from '@/dto/orderDto';
import { instance } from '@/lib/api/index';

// 내 주문 내역 가져오기
export const getMyOrderHistory = () => {
  return instance.get(`/order/history`);
};
