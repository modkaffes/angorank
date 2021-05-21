import { PropsWithChildren } from 'react';
import useDetectClickOutside from 'hooks/useDetectClickOutside';

interface IFlyOut {
  title?: string;
  content: JSX.Element;
  footer?: JSX.Element;
}

export function FlyOut({ title, content, footer }: PropsWithChildren<IFlyOut>) {
  return (
    <div className="flex flex-col gap-3">
      {title && <p className="font-medium whitespace-nowrap">{title}</p>}
      {content}
      {footer}
    </div>
  );
}

interface IDropdown {
  trigger: JSX.Element;
  flyout: JSX.Element;
}

export default function Dropdown({ trigger, flyout }: IDropdown) {
  const { show, nodeRef, triggerRef } = useDetectClickOutside(false);

  return (
    <div className="relative inline-block">
      <div ref={triggerRef}>{trigger}</div>
      {show && (
        <div
          className="p-3 origin-top-right absolute right-0 mt-2 rounded-lg shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 outline-none z-[60]"
          ref={nodeRef}
        >
          {flyout}
        </div>
      )}
    </div>
  );
}
