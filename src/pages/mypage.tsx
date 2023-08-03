import OrderList from '@/components/MyPage/OrderList';
import Profile from '@/components/MyPage/Profile';

export default function MyPage() {
  return (
    <div className="px-4">
      <h2 className="py-4 font-semibold">내 정보</h2>
      <Profile />
      <OrderList />
    </div>
  );
}
