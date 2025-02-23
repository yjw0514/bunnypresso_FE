import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import Image from 'next/image';
import { getOrderList } from '@/lib/api/menu';
import { useQuery } from '@tanstack/react-query';
import { Tooltip as ReactTooltip } from 'react-tooltip';

type listType = {
  name: string;
  img_url: string;
  userId: string;
  menu: string;
  count: number;
  createdAt: Date;
  isHot?: boolean;
};

type orderInfoType = {
  createdAt: string;
  orderNum: number;
  curNum: string;
};

const Story: NextPage = ({
  orderList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [userId, setUserId] = useState('');
  const router = useRouter();
  const [orderInfo, setOrderInfo] = useState<orderInfoType>({
    orderNum: 0,
    createdAt: '',
    curNum: '',
  });

  useEffect(() => {
    setUserId(localStorage.getItem('userId') ?? '');
  }, []);

  const { isLoading, isError, data, error, isSuccess } = useQuery(
    ['orderList'],
    () => getOrderList(),
    {
      initialData: orderList,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        console.log('호출', new Date());
        const { orderList } = data.data;
        if (!orderList.length) return router.push('/menu');
        const { orderNum, createdAt } = orderList.find(
          (el: listType) => el.userId === userId
        );
        const curNum = orderList.findIndex(
          (el: listType) => el.userId === userId
        );
        setOrderInfo({ orderNum, createdAt, curNum });
      },
      onError: (error) => {
        console.log(error);
      },
      refetchInterval: 60000, //1분마다 호출(polling)
    }
  );

  return (
    <div className="bg-gray-50">
      <div className="px-4 pt-4 pb-6 mb-2 bg-white border-b border-gray-100 flex-between ">
        <span className="font-bold">주문번호 {orderInfo.orderNum}</span>
        <span className="text-sm text-gray-400">{orderInfo.createdAt}</span>
      </div>
      {/* 진행상황 */}
      <div className="px-4 py-6 mb-4 bg-white border-gray-100 border-y">
        <ol className="flex items-center w-full px-2 mb-4">
          <li className="flex w-full items-center font-bold text-primary after:content-[''] after:w-full after:h-1 after:border-b after:border-primary after:border-4 after:inline-block">
            <span className="flex items-center justify-center w-10 h-10 bg-white border-4 rounded-full border-primary lg:h-12 lg:w-12 shrink-0">
              1
            </span>
          </li>

          <li className="flex w-full items-center text-white after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block ">
            <span className="flex items-center justify-center w-10 h-10 rounded-full bg-primary lg:h-12 lg:w-12 shrink-0">
              2
            </span>
          </li>

          <li className="flex items-center text-gray-400">
            <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 shrink-0">
              3
            </span>
          </li>
        </ol>
        <ol className="text-sm text-gray-600 flex-between">
          <li className="font-bold text-primary">주문요청</li>
          <li className="font-bold text-primary">주문확인</li>
          <li>픽업대기</li>
        </ol>
      </div>
      {/* 제조 현황 */}
      <div className="px-4 py-4 bg-white border-t border-gray-100">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-bold" data-tooltip-id="my-tooltip">
            제조 현황
          </p>
          <div
            data-tooltip-id="my-tooltip"
            data-tooltip-content="나의 주문 순서를 확인할 수 있어요!"
            className="w-4 h-4 text-xs border rounded-full text-bold text-primary border-primary flex-center"
          >
            !
          </div>
          <ReactTooltip id="my-tooltip" />
        </div>
        <p className="mt-2 text-lg font-bold">
          고객님의 음료가 {orderInfo.curNum + 1}번째로 제조 중에 있습니다.
        </p>
        {isSuccess && data.data && (
          <ul className="flex flex-wrap mt-4">
            {data.data.orderList.map((el: listType, idx: number) => {
              const {
                userId: menuUserId,
                count,
                menu,
                img_url,
                createdAt,
              } = el;
              const isMine = menuUserId === userId;
              return (
                <li
                  className="mt-1 mr-1 w-[calc(20%-4px)]"
                  key={`${createdAt} ${menu} ${idx + 1}`}
                >
                  <div
                    className={`w-full aspect-square h-auto bg-gray-100 rounded-2xl border-[1.5px] ${
                      isMine ? 'border-primary' : ''
                    } relative`}
                  >
                    {isMine ? (
                      <div className="absolute top-[-10px] bg-primary px-[6px] py-[2px] text-[10px] leading-3 rounded-xl text-white left-0">
                        MY
                      </div>
                    ) : null}
                    <Image
                      src={img_url}
                      layout="fill"
                      alt="coffee"
                      priority={true}
                    />
                    {count > 1 ? (
                      <div className="absolute -bottom-1 font-semibold bg-primary p-1 text-[10px] leading-3 rounded-full text-white -right-1">
                        {count}개
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};
export default Story;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/order/list`);
  const { orderList } = await res.json();
  if (!orderList.length) {
    return {
      redirect: {
        permanent: false,
        destination: '/menu?alert=true',
      },
    };
  }
  return { props: { orderList } };
};
