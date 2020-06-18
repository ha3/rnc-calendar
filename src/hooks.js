import { useContext, useRef } from 'react';

import { CalendarContext } from './context';


export function useDidUpdateEffect(fn, deps) {
  const isInitialRender = useRef(true);

  useEffect(() => {
    if (isInitialRender.current)
      isInitialRender.current = false;
    else
      fn();
  }, deps);
}

export const useCalendar = () => useContext(CalendarContext);