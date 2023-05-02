import { useState } from 'react';
const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalHandler = () => {
    setIsOpen((prev) => !prev);
  };

  return { isOpen, modalHandler };
};

export default useModal;
