import { historyItemType } from '@/dto/orderDto';
import { getMyOrderHistory } from '@/lib/api/order';
import { addComma } from '@/utils/addComma';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function OrderHistory() {
  const { isLoading, isError, data, error, isSuccess } = useQuery(
    ['orderList'],
    () => getMyOrderHistory(),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {},
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return (
    <div className="p-4">
      <h3 className="mb-6 text-lg font-bold tex-center">나의 주문 내역</h3>

      <div className="w-full h-ful">
        <ul
          role="list"
          className="flex flex-col space-y-4 divide-y divide-gray-200"
        >
          {isSuccess &&
            data.data.list.map((item: historyItemType) => {
              return (
                <li className="w-full px-4 py-6 mx-auto border border-gray-200 rounded-lg shadow max-h-1/2 max-h-max">
                  <div className="flex items-end space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gray-900 truncate text-md">
                        {item.date}
                      </p>
                      <p className="mt-2 text-gray-500 truncate text-md ">
                        {item.count > 1
                          ? `${item.menu} ${item.count - 1}개`
                          : item.menu}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base text-gray-900 ">
                      {addComma(item.total)}원
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}
