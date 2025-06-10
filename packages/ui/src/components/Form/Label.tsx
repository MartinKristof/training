import { ReactNode, type FC, type LabelHTMLAttributes } from 'react';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  /**
   * The text content of the label
   */
  children: ReactNode;
  /**
   * Whether the associated input is required
   */
  required?: boolean;
  /**
   * The ID of the input this label is for
   */
  htmlFor: string;
}

export const Label: FC<LabelProps> = ({ children, required, className = '', ...props }) => {
  return (
    <label className={`block text-sm font-medium text-gray-700 mb-1 ${className}`} {...props}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};
