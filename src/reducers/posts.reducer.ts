import { useState } from 'react';
import { PostObjectType } from '../utils/types/types';

export interface IPagination {
  currentPage: number;
  startIndex: number;
  recordsPerPage: number;
}

export interface IAllPosts {
  posts: PostObjectType | null | number;
  error: string;
  loading: boolean;
}

export type PaginationActionTypes =
  | { type: 'NEXT'; payload: number }
  | { type: 'PREVIOUS'; payload: number }
  | { type: 'PAGINATE'; payload: number }

export type FetchAllActionTypes =
  | { type: 'FECTH_SUCCESS'; payload: number | PostObjectType | null }
  | { type: 'FECTH_ERORR'; payload: number | PostObjectType | null }

export const PagintionInitialState: IPagination = {
  currentPage: 1,
  startIndex: 0,
  recordsPerPage: 10,
};

export const FetchInitialState: IAllPosts = {
  posts: null,
  error: '',
  loading: true,
};

export const combineInitialState = {
  pagination: PagintionInitialState,
  fetch: FetchInitialState,
}

export type combineInitialStateType = {
  pagination: IPagination,
  fetch: IAllPosts,
}

export const PaginationReducer = (state: combineInitialStateType, action: PaginationActionTypes) => {
  switch (action.type) {
  case 'PAGINATE':
    return {
      ...state,
      pagination:
        {
          ...state.pagination,
          currentPage: action.payload,
          startIndex: (action.payload -1) * state.pagination.recordsPerPage
        }
    };
  case 'NEXT':
    return {
      ...state,
      pagination:
        {
          ...state.pagination,
          currentPage: state.pagination.currentPage + action.payload,
          startIndex: state.pagination.startIndex + state.pagination.recordsPerPage
        }
    }
  case 'PREVIOUS':
    return {
      ...state,
      pagination:
        {
          ...state.pagination,
          currentPage: state.pagination.currentPage - action.payload,
          startIndex: state.pagination.startIndex - state.pagination.recordsPerPage
        }
    }
  default:
    return state;
  }
}

export function FetchAllDataReducer(state: combineInitialStateType, action: FetchAllActionTypes) {
  switch (action.type) {
  case 'FECTH_SUCCESS':
    return {
      ...state,
      fetch: {
        ...state.fetch,
        posts: action.payload,
        error: '',
        loading: true
      }
    };
  case 'FECTH_ERORR':
    return {
      ...state,
      fetch: {
        ...state.fetch,
        posts: action.payload,
        error: '',
        loading: true
      }
    };
  default:
    return state;
  }
}

type PaginationReducerCombineType = { (state: combineInitialStateType, action: PaginationActionTypes):combineInitialStateType }
type FetchAllReducerCombineType = { (state: combineInitialStateType, action: FetchAllActionTypes):combineInitialStateType }

export const useCombineReducers = (
  PaginationReducer: PaginationReducerCombineType,
  FetchAllDataReducer: FetchAllReducerCombineType,
  initialState: any
) => {
  const [state,setState] = useState(initialState);

  const dispatch = (action: PaginationActionTypes | FetchAllActionTypes) => {

    let updatedPosts = null;
    // Can be improved
    if (action.type === 'NEXT' || action.type === 'PREVIOUS' || action.type === 'PAGINATE' ) {
      updatedPosts = PaginationReducer(state, action)
    }
    if (action.type === 'FECTH_SUCCESS') {
      updatedPosts = FetchAllDataReducer(state, action)
    }

    setState(updatedPosts);
  }
  return [state, dispatch];
}
