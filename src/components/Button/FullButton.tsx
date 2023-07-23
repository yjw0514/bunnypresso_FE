import React, { ButtonHTMLAttributes, MouseEventHandler } from 'react';

// 버튼 스타일
type utilType = 'outline' | 'fill' | 'disable';
const STYLE = {
  outline: 'text-primary border-primary ',
  fill: 'bg-primary text-white border-primary',
  disable: 'bg-gray-200 text-gray-700',
};

// 버튼 props 타입
interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  utilType?: utilType;
}

export default function FullButton({
  name = '확인',
  className = '',
  onClick,
  utilType = 'fill',
  ...rest
}: ButtonType) {
  return (
    <button
      onClick={onClick}
      className={`${STYLE[utilType]} ${className} text-center w-full py-3 text-md border rounded-md font-bold disabled:border-gray-300 disabled:bg-gray-200 focus:outline-none`}
      {...rest}
    >
      {name}
    </button>
  );
}
