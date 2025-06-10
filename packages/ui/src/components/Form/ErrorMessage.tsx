import { ReactNode, type FC, type HTMLAttributes } from 'react';

export interface ErrorMessageProps extends HTMLAttributes<HTMLParagraphElement> {
  /**
   * The error message to display
   */
  children: ReactNode;
}

export const ErrorMessage: FC<ErrorMessageProps> = ({ children, className = '', ...props }) => {
  return (
    <p role="alert" className={`mt-1 text-sm text-red-600 ${className}`} {...props}>
      {children}
    </p>
  );
};
