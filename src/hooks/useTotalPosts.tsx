import { useEffect } from 'react'

type setTotalType = (arg0: number) => void
type dispatchTotalType = (arg0: { type: string; payload: number; }) => number

export const useTotalPosts = (dispatch: dispatchTotalType , totalPost:number, setTotalPosts: setTotalType) => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  return (

    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((posts) => {
          setTotalPosts(posts.length)
        })
        .catch((error) => dispatch({type: 'FECTH_ERROR', payload: error}))
    },[totalPost])
  )
}
