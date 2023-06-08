import React, { useEffect, useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import MenuItem from '@/components/Order/MenuItem';
import withAuth from '@/utils/withAuth';
import useModal from '@/hooks/useModal';
import BasicModal from '@/components/Modal/BasicModal';

const CATEGORY = [
  'COFFEE',
  'BANACCINO & SMOOTHIE',
  'JUICE & DRINK',
  'TEA & ADE',
  'DESSERT',
];

const order: NextPage = ({
  menu,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [tap, setTap] = useState(0);
  const [menuList, setMenuList] = useState([]);
  const { isOpen, closeModal, openModal } = useModal();

  useEffect(() => {
    if (router.query.alert) {
      router.replace(`/order`, undefined, { shallow: true });
      openModal();
    }
    const list = menu.filter((el: any) => el.category === CATEGORY[tap]);
    setMenuList(list);
  }, [tap, router]);
  return (
    <div className="h-screen pt-[52px] overflow-hidden">
      <div>
        {/* 메뉴 카테고리 */}
        <div className="w-full px-3 mt-3 overflow-x-scroll text-xs text-gray-400 border-b border-gray-200 scrollbar-hide">
          <ul className="flex items-center space-x-6 w-max">
            {CATEGORY.map((menu, idx) => {
              return (
                <li
                  key={menu}
                  className={`${
                    idx === tap
                      ? 'text-black font-bold text-xs !border-black'
                      : ''
                  } relative transition-all duration-300 pb-3 border-b-2 border-transparent`}
                  onClick={() => setTap(idx)}
                >
                  <p>{menu}</p>
                </li>
              );
            })}
          </ul>
        </div>
        <div
          style={{ height: 'calc(100vh - 150px)' }}
          className="pb-10 overflow-y-scroll scrollbar-hide"
        >
          <ul>
            <MenuItem menu={menuList} />
          </ul>
        </div>
      </div>
      {isOpen && (
        <BasicModal
          isOpen={isOpen}
          closeModal={closeModal}
          title={'알림'}
          hasOneBtn={true}
        >
          <div className="text-center">
            주문하신 상품이 없습니다.
            <br />
            주문 후 이용해주세요.
          </div>
        </BasicModal>
      )}
    </div>
  );
};

export default withAuth(order);

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('http://localhost:5000/menu');
  const { menu } = await res.json();
  return { props: { menu } };
};
