import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PostDetailsCard } from '../post-details-card/post-details-card.component';
import { PostDetailContext, PostDetailContextType } from '../../../context/post-details.context';
import { Box, Container } from '@mui/material';
import { PostDetailsForm } from '../post-details-form/post-details-form.component';

type Params = {
	id: string;
}

export const PostDetails = () => {
  const params = useParams<Params>();

  const PostDetailContextApi = useContext<PostDetailContextType | null>(PostDetailContext);
  const { edit, setPostDetailID }:any = PostDetailContextApi;

  if (!PostDetailContextApi) {
    return null;
  }

  useEffect(()=>{
    setPostDetailID(params.id)
  },[params.id])

  return (
    <Container>
      <Box sx={{ m: 2 }}>
        {edit ?
          <>
            <PostDetailsForm />
          </>
          :
          <>
            <PostDetailsCard />
          </>
        }
      </Box>
    </Container>
  )
}
