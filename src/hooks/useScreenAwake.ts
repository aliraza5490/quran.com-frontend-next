import { useCallback, useEffect, useState } from 'react';

const useScreenAwake = () => {
  // Function to keep the screen awake
  const [isAwake, setIsAwake] = useState(false);

  const setKeepAwake = useCallback(async (value: boolean) => {
    const navigator = window.navigator as any;
    if ('wakeLock' in navigator) {
      if (value) {
        await navigator.wakeLock.request('screen');
        setIsAwake(true);
      } else {
        await navigator.wakeLock.release();
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
