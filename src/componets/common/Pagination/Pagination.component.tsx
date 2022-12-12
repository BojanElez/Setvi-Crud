import { useContext } from 'react';
import { PostsContext, PostsContextType } from './../../../context/posts.context';
import { Badge, Box } from '@mui/material';

type PaginationProps = {
  pageNumbers: number
}

export const Pagination = ({ pageNumbers}: PaginationProps) => {
  const PostsContextApi = useContext<PostsContextType | null>(PostsContext);

  if (!PostsContextApi) return null;
  const { dispatch,
    state: {
      pagination
    }
  } = PostsContextApi;

  return (
    <Badge className={`cursor-pointer ${pagination.currentPage  == pageNumbers && 'active'}`} color="secondary" >
      <Box sx={{ m: 2 }} onClick={() => dispatch?.({ type: 'PAGINATE', payload: pageNumbers })}>
        {pageNumbers}
      </Box>
    </Badge>
  )
}

