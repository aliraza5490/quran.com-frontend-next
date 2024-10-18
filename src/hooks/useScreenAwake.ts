import { useCallback, useEffect, useRef, useState } from 'react';

const useScreenAwake = () => {
  // Function to keep the screen awake
  const [isAwake, setIsAwake] = useState(false);
  const wakeLock = useRef(null);

  const setKeepAwake = useCallback(async (value: boolean) => {
    const navigator = window.navigator as any;
    if ('wakeLock' in navigator) {
      if (value) {
        wakeLock.current = await navigator.wakeLock.request('screen');
        setIsAwake(true);
      } else {
        wakeLock.current.release();
        setIsAwake(false);
      }
    }
  }, []);

  useEffect(() => {
    setKeepAwake(true);

    return () => {
      setKeepAwake(false);
    };
  }, [setKeepAwake]);

  return { isAwake, setKeepAwake };
};
export default useScreenAwake;
