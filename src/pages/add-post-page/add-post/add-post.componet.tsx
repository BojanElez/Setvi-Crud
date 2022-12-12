import { useContext } from 'react';
import { PopUp } from '../../../componets/common/PopUp/PopUp.component';
import { Box, Container} from '@mui/material';
import { AddPostContext, AddPostContextType } from '../../../context/add-post.context';
import { AddPostForm } from './../add-post-form/add-post-form';


export const AddPost = () => {
  const AddPostContextAPI = useContext<AddPostContextType | null>(AddPostContext);

  if (!AddPostContextAPI) {
    return null;
  }
  const { open, setOpen } = AddPostContextAPI;

  return (
    <Container>
      <Box sx={{ m: 2 }}>
        <AddPostForm />
      </Box>
      <PopUp
        dialogTitle="Add"
        dialogText="This will falsely add the user. Check your network tab before redirecting!"
        open={open}
        setOpen={setOpen}
      />
    </Container>
  )
}
