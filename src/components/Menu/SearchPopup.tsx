import { getMenu } from '@/lib/api/menu';
import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { menuType } from '@/dto/menuDto';
import MenuItem from './MenuItem';

const SearchPopup = ({ closeModal }: { closeModal: () => void }) => {
  const [value, setValue] = useState('');
  const [list, setList] = useState<menuType[]>([]);
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
    try {
      const {
        data: { menu },
      } = await getMenu(value);
      setList(menu);
      console.log(menu);
    } catch (err) {
      console.log('err', err);
    }
  };
  return (
    <div className="fixed top-0 left-0 right-0 w-full ">
      <div className="flex items-center w-full px-3 py-4 space-x-2 border-b border-gray-300 ">
        <FiSearch />
        <input
          placeholder="상품명을 입력하세요."
          type="text"
          maxLength={20}
          className="w-full focus:outline-none placeholder:text-gray-400 placeholder:text-md"
          onKeyDown={onEnter}
          onChange={onChange}
        />
        <IoMdClose size={20} onClick={closeModal} />
      </div>
      <ul
        style={{ height: 'calc(100vh - 50px)' }}
        className="pb-10 overflow-y-scroll scrollbar-hide"
      >
        {list.length ? (
          <MenuItem menu={list} />
        ) : (
          <div className="w-full h-full pt-10 text-center">
            <p>검색 결과가 없습니다.</p>
          </div>
        )}
      </ul>
    </div>
  );
};
export default SearchPopup;
