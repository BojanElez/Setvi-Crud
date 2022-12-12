import { useContext } from 'react';
import { ButtonComponent } from '../../../componets/common/Button/Button.component';
import { Input } from '../../../componets/common/Input/Input.component';
import { PostDetailContext, PostDetailContextType } from '../../../context/post-details.context';
import { Box } from '@mui/material';
import { PopUp } from '../../../componets/common/PopUp/PopUp.component';

export const PostDetailsForm= () => {
  const PostDetailContextApi = useContext<PostDetailContextType | null>(PostDetailContext);
  const { form, setForm, open, setOpen, state, onSubmitEdit }:any = PostDetailContextApi;

  return (
    <form onSubmit={(event) => onSubmitEdit(event)} >
      <Box sx={{ m: 2 }}>
        <Input
          type="text"
          id="edit-title"
          defaultValue={state.data?.title}
          onChange={(event) => setForm({...form, title: event.target.value})}
          placeholder="edit title"
          name="title"
          variant="filled"
        />
      </Box>
      <Box sx={{ m: 2 }}>
        <Input
          type="text"
          id="edit-body"
          defaultValue={state.data?.body}
          onChange={(event) => setForm({...form, body: event.target.value})}
          placeholder="edit body"
          name="body"
          variant="filled"
        />
      </Box>
      <Box sx={{ m: 2 }}>
        <ButtonComponent
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          buttonLabel="Edit"
        />
      </Box>
      <PopUp
        dialogTitle="Edit"
        dialogText="This will falsely edit the user. Check your network tab before redirecting!"
        open={open}
        setOpen={setOpen}
      />
    </form>
  )
}
