import { useRef, useCallback } from 'react';

function useEvent<Callback extends (...args: unknown[]) => unknown>(
  callback: Callback,
) {
  const callbackRef = useRef<Callback>();
  callbackRef.current = callback;

  const memoCallback = useCallback(
    (...args: Parameters<Callback>): ReturnType<Callback> =>
      // @ts-expect-error
      callbackRef.current!(...args),
    [],
  );

  return memoCallback;
}

export default useEvent;
