import React, { ButtonHTMLAttributes, MouseEventHandler } from 'react';

// 버튼 props 타입
interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function BasicButton({
  children,
  onClick,
  className,
  ...rest
}: ButtonType) {
  return (
    <button
      onClick={onClick}
      className={`${className} text-sm font-semibold text-primary `}
    >
      {children}
    </button>
  );
}
