import { useContext } from 'react';
import { PostsContext, PostsContextType } from '../../../context/posts.context';
import { Pagination } from '../../../componets/common/Pagination/Pagination.component';
import { PostsTable } from '../posts-table/posts-table.component';
import { ButtonComponent } from '../../../componets/common/Button/Button.component';

import { Container } from '@mui/material';
import { Box } from '@mui/system';


type PostsButtonType = 'PREVIOUS' | 'NEXT' | 'PAGINATE';

export const Posts = () => {
  const PostsContextApi = useContext<PostsContextType | null>(PostsContext);

  if (!PostsContextApi) {
    return null;
  }
  const { state, dispatch, numberOfPages, eachPage } = PostsContextApi;
  const { pagination } = state;
  const { currentPage } = pagination;

  const renderButton = (typeOfButton: PostsButtonType) => {
    return <ButtonComponent
      type="button"
      size="small"
      variant="contained"
      color="success"
      onClick={() => dispatch?.({ type: typeOfButton, payload: 1 })}
      buttonLabel={`${typeOfButton}`}
    />
  }

  return (
    <Container>
      <Box sx={{ m: 2 }}>
        <PostsTable />
        <Box>
          {currentPage !== 1 &&
            renderButton('PREVIOUS')
          }
          {eachPage.map((pageNumbers: number) => {
            return (
              <Pagination key={`page-${pageNumbers-1}-${pageNumbers}`} pageNumbers={pageNumbers} />
            )
          })}
          {currentPage !== numberOfPages &&
            renderButton('NEXT')
          }
        </Box>
      </Box>
    </Container>
  )
}