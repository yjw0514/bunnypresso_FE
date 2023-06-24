import React, { ButtonHTMLAttributes, MouseEventHandler } from 'react';

// 버튼 스타일
type utilType = 'outline' | 'fill' | 'disable';
const STYLE = {
  outline: 'text-primary border-primary',
  fill: 'bg-pink-400 text-white border-pink-400',
  disable: 'bg-gray-200 text-gray-700',
};

// 버튼 사이즈
type sizeType = 'sm' | 'md';
const SIZE = {
  sm: 'px-2 py-1',
  md: 'px-3 py-2',
};

// 버튼 props 타입
interface ButtonType extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  utilType?: utilType;
  size?: sizeType;
}

export default function BasicButton({
  name = '확인',
  className = '',
  onClick,
  utilType = 'outline',
  size = 'sm',
  ...rest
}: ButtonType) {
  return (
    <button
      onClick={onClick}
      className={`${STYLE[utilType]} ${className} ${SIZE[size]} text-sm font-semibold border rounded-md disabled:border-gray-300 disabled:bg-gray-200`}
      {...rest}
    >
      {name}
    </button>
  );
}
