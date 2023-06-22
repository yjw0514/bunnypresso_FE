import useModal from '@/hooks/useModal';
import { getMenu } from '@/lib/api/menu';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import FullModal from '../Modal/FullModal';

const SearchPopup = () => {
  const [value, setValue] = useState('');
  const { isOpen, openModal, closeModal } = useModal();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  // 검색
  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      searchMenu();
    }
  };
  const searchMenu = async () => {
    console.log(value);
    try {
      const {
        data: { menu },
      } = await getMenu(value);
    } catch (err) {
      console.log('err', err);
    }
  };
  return (
    <FullModal isOpen={isOpen} closeModal={closeModal}>
      <div className="fixed top-0 left-0 right-0 w-full px-3 pt-3 pb-4 flex-between">
        <h2 className="font-semibold">주문</h2>
        {/* <div className="flex items-center w-1/2 px-2 py-1 space-x-2 border border-gray-300 rounded ">
        <input
          placeholder="상품명을 입력하세요."
          type="text"
          maxLength={20}
          className="w-full focus:outline-none placeholder:text-gray-400 placeholder:text-sm"
          onKeyDown={onEnter}
          onChange={onChange}
        />
      </div> */}
      </div>
    </FullModal>
  );
};
export default SearchPopup;
