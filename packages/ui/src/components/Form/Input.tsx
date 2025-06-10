import type { FC, InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * The name of the input field
   */
  name: string;
  /**
   * The type of the input field
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  /**
   * Whether the input has an error
   */
  hasError?: boolean;
}

export const Input: FC<InputProps> = ({ name, type = 'text', hasError = false, className = '', ...props }) => {
  const inputId = `input-${name}`;

  return (
    <input
      id={inputId}
      name={name}
      type={type}
      aria-invalid={hasError}
      className={`
        w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        ${hasError ? 'border-red-500' : 'border-gray-300'}
        ${className}
      `}
      {...props}
    />
  );
};
