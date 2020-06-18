import { useContext } from 'react';

import { CalendarContext } from './contexts';


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