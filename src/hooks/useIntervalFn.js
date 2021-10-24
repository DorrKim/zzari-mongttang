import { useRef, useCallback, useEffect } from 'react';

const useIntervalFn = (fn, ms) => {
  const timerId = useRef();
  const cb = useRef(fn);

  useEffect(() => {
    cb.current = fn;
  }, [fn]);

  const run = useCallback(() => {
    timerId.current && clearInterval(timerId.current);
    setInterval(() => {
      cb.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    timerId.current && clearInterval(timerId.current);
  }, []);

  useEffect(clear, []);

  return [run, clear];
};

export default useIntervalFn;
