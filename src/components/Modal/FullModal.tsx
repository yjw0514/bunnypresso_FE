import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { Fragment, MouseEventHandler, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';

type ModalType = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  title?: string;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
};

export default function FullModal({
  isOpen = false,
  closeModal,
  children,
  title = '모달',
  onConfirm,
}: ModalType) {
  const router = useRouter();

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-[60] bg-white">
      <header className="fixed top-0 left-0 right-0 w-full px-3 py-4 flex-between">
        <div className="flex items-center space-x-3">
          <button onClick={closeModal}>
            <BiArrowBack size={20} />
          </button>
          <h2 className="font-semibold">메뉴 상세</h2>
        </div>
      </header>
      <main className="h-full px-3 pb-4 pt-14">{children}</main>
    </div>
  );
}
