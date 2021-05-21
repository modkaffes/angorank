import { MouseEvent, useEffect, useRef, useState } from 'react';

export default function useDetectClickOutside(initState: boolean) {
  const triggerRef = useRef<HTMLInputElement>(null); // The element we interacted on (eg, button)
  const nodeRef = useRef<HTMLInputElement>(null); // The element that appeared (eg, dropdown)

  const [show, setShow] = useState(initState);

  const handleClickOutside = ({ target }: MouseEvent) => {
    // If click is on trigger element, toggle dropdown
    if (triggerRef.current && triggerRef.current.contains(target as Node)) {
      return setShow(!show);
    }

    // If dropdown is open and click is outside dropdown, close it
    if (nodeRef.current && !nodeRef.current.contains(target as Node)) {
      return setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return {
    triggerRef,
    nodeRef,
    show,
    setShow,
  };
}
