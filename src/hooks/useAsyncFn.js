import { useReducer, useRef, useCallback } from 'react';

const reducer = (_state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        isLoading: true,
        value: null,
        error: null
      };
    case 'SUCCESS':
      return {
        isLoading: false,
        value: action.value,
        error: null
      };
    case 'ERROR':
      return {
        isLoading: false,
        value: null,
        error: action.error
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const useAsyncFn = (fn, deps = []) => {
  const [state, dispatch] = useReducer(reducer, {
    isLoading: false,
    value: null,
    error: null
  });
  const lastCallId = useRef(0);

  const callback = useCallback((...args) => {
    const callId = ++lastCallId.current;
    dispatch({ type: 'LOADING' });

    return fn(...args).then(
      value => {
        callId === lastCallId.current && dispatch({ type: 'SUCCESS',
          value });
      }, 
      error => {
        callId === lastCallId.current && dispatch({ type: 'ERROR',
          error });
      });
  }, deps);

  return [state, callback];
};

export default useAsyncFn;
