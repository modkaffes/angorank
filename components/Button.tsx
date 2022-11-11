import { SyntheticEvent } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

import { classNames as cx } from 'utils/misc';

interface IButton {
  className?: string;
  icon?: JSX.Element;
  caret?: boolean;
  variant?: 'primary' | 'plain';
  children: string | JSX.Element;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (e: SyntheticEvent) => void;
}

export default function Button({
  className = '',
  icon,
  caret,
  variant = 'plain',
  children,
  ...props
}: IButton) {
  const classNames = cx(
    // Overrides from instance
    className,
    // Generic
    'flex gap-1 items-center justify-center border rounded-md shadow-sm font-medium whitespace-nowrap',
    // Size
    'text-sm px-3 py-2 leading-4',
    // Color
    variant === 'plain' &&
      'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 dark:border-transparent dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500',
    variant === 'primary' && 'text-white border-transparent bg-blue-600 hover:bg-blue-700'
  );

  return (
    <button className={classNames} {...props}>
      {icon}
      {children}
      {caret && <ChevronDownIcon className="h-4 w-4 shrink-0 text-gray-400" />}
    </button>
  );
}
