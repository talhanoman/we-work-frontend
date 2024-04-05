import { useEffect, useRef } from 'react';

export function OutsideAlerter({ outsideClick, children }) {
  const wrapperRef = useRef(null);
  function useOutsideAlerter(ref, clickEvent) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          clickEvent();
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  }

  useOutsideAlerter(wrapperRef, outsideClick);
  return <div ref={wrapperRef}>{children}</div>;
}
