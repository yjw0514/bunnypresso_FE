import React, { useEffect, useState } from 'react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { useRouter } from 'next/router';
import MenuItem from '@/components/Menu/MenuItem';
import useModal from '@/hooks/useModal';
import BasicModal from '@/components/Modal/BasicModal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeTap, toggleSearchPopup } from '@/store/slice/menuSlice';
import { FiSearch } from 'react-icons/fi';
import FullModal from '@/components/Modal/FullModal';
import SearchPopup from '@/components/Menu/SearchPopup';

const CATEGORY = [
  'COFFEE',
  'BANACCINO & SMOOTHIE',
  'JUICE & DRINK',
  'TEA & ADE',
  'DESSERT',
];

const Menu: NextPage = ({
  menu,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [menuList, setMenuList] = useState([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const tap = useAppSelector((state) => state.menu.tap);
  const { isOpen, closeModal, openModal } = useModal();
  const fromSearch = useAppSelector((state) => state.menu.searchPopup);

  useEffect(() => {
    if (router.query.alert) {
      router.replace(`/menu`, undefined, { shallow: true });
      openModal();
    }
    const list = menu.filter((el: any) => el.category === CATEGORY[tap]);
    setMenuList(list);
  }, [tap, router]);

  const searchPopupHandler = () => {
    dispatch(toggleSearchPopup());
  };
  return (
    <>
      <div className="fixed top-0 left-0 right-0 w-full px-3 pt-3 pb-4 flex-between">
        <h2 className="font-semibold">주문</h2>
        <FiSearch onClick={searchPopupHandler} />
      </div>
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
                    onClick={() => {
                      dispatch(changeTap(idx));
                    }}
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
        {fromSearch && (
          <FullModal closeModal={searchPopupHandler}>
            <SearchPopup closeModal={searchPopupHandler} />
          </FullModal>
        )}
      </div>
    </>
  );
};

export default Menu;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/menu`);
  const { menu } = await res.json();
  return { props: { menu } };
};
