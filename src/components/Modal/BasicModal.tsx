import { Dialog, Transition } from '@headlessui/react';
import { Fragment, MouseEventHandler, useState } from 'react';
import BasicButton from '@/components/Button/BasicButton';

type ModalType = {
  isOpen: boolean;
  modalHandler: () => void;
  children: React.ReactNode;
  title?: string;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
};

export default function BasicModal({
  isOpen = false,
  modalHandler,
  children,
  title = '모달',
  onConfirm,
}: ModalType) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={modalHandler}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">{children}</div>

                  <div className="flex items-center justify-end gap-2 mt-4">
                    <BasicButton utilType="fill" onClick={onConfirm} />
                    <BasicButton name="닫기" onClick={modalHandler} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
