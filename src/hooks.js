import { useContext, useEffect, useRef } from 'react';

import CalendarContext from './context';


export function useRunFuncOnUpdates(value, fn) {
  const isInitialRender = useRef(true);
  const prevValue = useRef();

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
    }
    else {
      if (fn && prevValue && prevValue !== value) {
        fn(value);
      }

      prevValue.current = value;
    }
  }, [value, fn]);
}

export const useCalendar = () => useContext(CalendarContext);