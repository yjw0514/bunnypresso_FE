import { MouseEventHandler } from 'react';

type ModalType = {
  closeModal: () => void;
  children: React.ReactNode;
  title?: string;
  onConfirm?: MouseEventHandler<HTMLButtonElement>;
};

export default function FullModal({
  closeModal,
  children,
  title = '모달',
  onConfirm,
}: ModalType) {
  return (
    <div className="fixed top-0 bottom-0 w-full h-full left-0 right-0 z-[60] bg-white">
      <main className="h-full px-3 pb-4 pt-14">{children}</main>
    </div>
  );
}
