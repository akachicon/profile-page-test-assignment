import { useRef } from 'react';

export default function usePersistentObject(obj) {
  const initRender = useRef(true);
  const { current: persistentObj } = useRef(obj);

  if (initRender.current) {
    initRender.current = false;
    return persistentObj;
  }

  Object.entries(obj).forEach(([key, val]) => {
    persistentObj[key] = val;
  });

  return persistentObj;
}
