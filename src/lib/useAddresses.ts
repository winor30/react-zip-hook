import { useEffect, useReducer } from 'react';
import client from "./client";
import { Address } from "./type";

const CODE_LENGTH = 7;
type Status = 'init' | 'loading' | 'loaded' | 'error';
type State = {
  status: Status;
  addresses: Address[];
  error: Error | null;
};

type Action =
  | {
    type: 'setStatus';
    status: Status;
  }
  | {
    type: 'setAddresses';
    addresses: Address[];
  }
  | {
    type: 'setError';
    error: Error;
  };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'setStatus':
      return {
        ...state,
        status: action.status,
      };
    case 'setAddresses':
      return {
        ...state,
        addresses: action.addresses,
        status: 'loaded',
      };
    case 'setError':
      return {
        ...state,
        addresses: [],
        status: 'error',
        error: action.error,
      };
    default:
      return state;
  }
};

const useAddresses = (zipcode?: string, limit?: number) => {
  const [state, dispatch] = useReducer(reducer, {
    status: 'init',
    addresses: [],
    error: null,
  });

  useEffect(() => {
    if (!zipcode) return;
    if (zipcode.length !== CODE_LENGTH) return;
    dispatch({
      type: 'setStatus',
      status: 'loading',
    });
    client.fetchAddress(zipcode, limit).then(([addresses, error]) => {
      if (error || !addresses) {
        dispatch({
          type: 'setError',
          error: error || new Error('addresses is null'),
        })
        return;
      }

      dispatch({
        type: 'setAddresses',
        addresses,
      });
    });
  }, [zipcode, limit]);

  return state;
}

export default useAddresses;
