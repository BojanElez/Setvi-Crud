import { createContext, useEffect, useState } from 'react';
import { useTotalPosts } from '../hooks/useTotalPosts';
import {
  combineInitialState,
  FetchAllDataReducer,
  PaginationActionTypes,
  PaginationReducer,
  combineInitialStateType,
  useCombineReducers
} from '../reducers/posts.reducer';
import { Data, getAllData } from '../api/API';

type PostsContextProviderProps = {
  children: React.ReactNode
}

export type PostsContextType = {
  state: combineInitialStateType
  dispatch: React.Dispatch<PaginationActionTypes>
  eachPage: number[]
  handlePagination?: (currentPage: number) => void
  numberOfPages: number
}

export const PostsContext = createContext<PostsContextType | null>(null);

export const PostsProvider = ({children}: PostsContextProviderProps) => {
  const [state, dispatch] = useCombineReducers(PaginationReducer, FetchAllDataReducer, combineInitialState);
  const [totalPost, setTotalPosts ] = useState<number>(0);
  const { pagination: {
    recordsPerPage,
    startIndex,
    currentPage
  }} = state;

  const numberOfPages = Math.round(totalPost / recordsPerPage);
  const eachPage = [...Array(numberOfPages + 1).keys()].slice(1);

  useEffect(() => {
    const fetchedPostsPerPage = async () => {
      const postsPerPage = await getAllData(Data.POSTS, startIndex, recordsPerPage);
      dispatch({type: 'FECTH_SUCCESS', payload: postsPerPage})
    }
    fetchedPostsPerPage();
  }, [startIndex]);

  useTotalPosts(dispatch, totalPost, setTotalPosts);

  return (
    <PostsContext.Provider value={{state, dispatch, eachPage , numberOfPages}} >
      {children}
    </PostsContext.Provider>
  )
}