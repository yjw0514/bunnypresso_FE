import React, { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  isError?: boolean;
  errorMsg?: string;
  register?: UseFormRegisterReturn;
}

const BasicInput = React.forwardRef(function BasicInput(
  { isError = false, errorMsg, register, ...rest }: InputType,
  ref?: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <div className="w-full mb-2">
      <input
        {...register}
        className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg outline-none focus:ring-primary focus:border-primary block w-full p-2.5
      ${
        isError
          ? 'border-red-500  focus:ring-0 focus:outline-none focus:border-red-500 hover:border-red-400'
          : 'border-gray-300'
      }
        `}
        {...rest}
      />
      {isError && (
        <p className="pl-1 mt-1 text-xs text-red-500 error-msg">{errorMsg}</p>
      )}
    </div>
  );
});

export default BasicInput;
