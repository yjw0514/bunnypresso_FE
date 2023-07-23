import OrderList from '@/components/MyPage/OrderList';
import Profile from '@/components/MyPage/Profile';

export default function MyPage() {
  return (
    <div className="px-4">
      {/* <p className="fixed z-50 font-bold text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        준비중입니다.
        <br /> 조금만 기다려주세요!
      </p>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-40 bg-white/90 flex-center"></div> */}

      <h2 className="my-4 font-semibold">내 정보</h2>
      <Profile />
      <OrderList />
    </div>
  );
}
