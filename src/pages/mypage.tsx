import OrderHistory from '@/components/Order/OrderHistory';
import { useEffect, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';

export default function MyPage() {
  const [userName, setUserName] = useState<null | string>('');
  useEffect(() => {
    setUserName(localStorage.getItem('name'));
  }, []);
  return (
    <div className="px-4">
      <p className="fixed z-50 font-bold text-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        준비중입니다.
        <br /> 조금만 기다려주세요!
      </p>
      <div className="fixed top-0 bottom-0 left-0 right-0 z-40 bg-white/90 flex-center"></div>

      <h2 className="my-4 font-semibold">내 정보</h2>
      <div className="flex flex-col items-center mt-6 space-y-10">
        <div className="flex flex-col items-center space-y-4">
          <img
            className="w-28 h-28"
            src="https://source.boringavatars.com/beam/?colors=264653,2a9d8f,e9c46a,f4a261,e76f51"
            alt=""
          />
          <div className="relative">
            <span className="font-bold text-md">{userName}</span>
            {/* <input type="text" className="w-full border border-red-100" /> */}
            <button className="absolute top-0 p-1 rounded-lg -right-10 flex-center bg-primary">
              <AiOutlineEdit className="text-sm text-white" />
            </button>
          </div>
        </div>
        <OrderHistory />
      </div>
    </div>
  );
}
