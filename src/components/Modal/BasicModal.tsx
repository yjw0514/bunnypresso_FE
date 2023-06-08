import { Dialog, Transition } from '@headlessui/react';
import { Fragment, MouseEventHandler, useState } from 'react';
import BasicButton from '@/components/Button/BasicButton';
import { SubmitHandler } from 'react-hook-form';

type ModalType = {
  isOpen: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  title?: string;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
  btnName?: string;
  hasOneBtn?: Boolean;
};

export default function BasicModal({
  isOpen = false,
  closeModal,
  children,
  title = '모달',
  onConfirm,
  btnName = '확인',
  hasOneBtn = false,
}: ModalType) {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
            <div className="flex items-center justify-center min-h-full p-8 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md p-4 flex flex-col justify-between overflow-hidden min-h-[200px] text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-center text-primary"
                  >
                    {title}
                  </Dialog.Title>
                  <div>{children}</div>
                  {hasOneBtn ? (
                    <BasicButton
                      name="닫기"
                      utilType="fill"
                      onClick={closeModal}
                      className="!py-2"
                    />
                  ) : (
                    <div className="flex items-center justify-end gap-2 mt-4">
                      <BasicButton
                        name={btnName}
                        utilType="fill"
                        onClick={onConfirm}
                      />
                      <BasicButton name="닫기" onClick={closeModal} />
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
