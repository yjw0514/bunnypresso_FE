import { getMyOrderHistory } from '@/lib/api/order';
import { addComma } from '@/utils/addComma';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useState } from 'react';
import FullButton from '@/components/Button/FullButton';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { historyItemType } from '@/dto/orderDto';
import Loading from '../Loading';

export default function OrderList() {
  const router = useRouter();
  const [history, setHistory] = useState<historyItemType>();
  const { isLoading, isError, data, error, isSuccess, isFetching } = useQuery(
    ['orderList'],
    () => getMyOrderHistory(),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        const { list } = data.data;
        setHistory(list[0]);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );
  return (
    <section className="flex flex-col items-center mt-20">
      <div className="flex justify-between w-full max-w-md mb-6">
        <h5 className="text-xl font-bold leading-none text-gray-900 ">
          나의 주문내역
        </h5>
        {data?.data.list.length > 1 ? (
          <button
            className="space-x-1 flex-center"
            onClick={() => router.push('/orderhistory')}
          >
            <p>더보기</p>
            <MdKeyboardArrowRight />
          </button>
        ) : null}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="w-full max-w-md py-6 bg-white border border-gray-200 rounded-lg shadow max-h-1/2 max-h-max">
          {isSuccess ? (
            history ? (
              <div className="w-full h-ful">
                <ul role="list" className="divide-y divide-gray-200">
                  <li className="p-3 px-6">
                    <div className="flex items-end space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate text-md">
                          {history.date}
                        </p>
                        <p className="mt-2 text-gray-500 truncate text-md ">
                          {history.count > 1
                            ? `${history.menu} ${history.count - 1}개`
                            : history.menu}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-base text-gray-900 ">
                        {addComma(history.total)}원
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="flex flex-col items-center py-10 space-y-3">
                <p>주문한 내역이 없습니다.</p>
                <div className="w-1/3">
                  <FullButton
                    name="주문하러 가기"
                    onClick={() => router.push('/menu')}
                  />
                </div>
              </div>
            )
          ) : null}
        </div>
      )}
    </section>
  );
}
