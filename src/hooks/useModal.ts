import { useState } from 'react';
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 원래 modalHandler로 상태값을 토글해주는식으로 했는데 strictmode로 인해 두번 렌더링 되는 경우 의도치 않게 상태값이 한번더 반전되는 문제가 있음(strict모드는 개발모드에서만 두번 렌더링되긴함)
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  return { isOpen, openModal, closeModal };
};

export default useModal;
