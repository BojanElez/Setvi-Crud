import { useContext } from 'react';
import { Input } from '../../../componets/common/Input/Input.component';
import { ButtonComponent } from  '../../../componets/common/Button/Button.component';
import { AddPostContext, AddPostContextType } from '../../../context/add-post.context';
import { Box, Grid, Stack } from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';

export const AddPostForm = () => {
  const AddPostContextAPI = useContext<AddPostContextType | null>(AddPostContext);

  if (!AddPostContextAPI) {
    return null;
  }

  const { form, setForm,onSubmitAddPosts, errors } = AddPostContextAPI;

  return (
    <form onSubmit={(event) => onSubmitAddPosts(event)} >
      <Stack>
        <Grid item xs={8}>
          <Box sx={{ m: 2 }}>
            <Input
              type="text"
              name="title"
              placeholder="title"
              id="title"
              variant="filled"
              onChange={(event) => setForm({...form, title: event.target.value})}
            />
            {errors.title.dirty && errors.title.error ? (
              <p className="err">{errors.title.message}</p>
            ) : null}
          </Box>
        </Grid>
      </Stack>
      <Stack>
        <Grid item xs={8}>
          <Box sx={{ m: 2 }}>
            <Input
              type="text"
              name="body"
              id="body"
              placeholder="description"
              variant="filled"
              onChange={(event) => setForm({...form, body: event.target.value})}
            />
            {errors.body.dirty && errors.body.error ? (
              <p className="err">{errors.body.message}</p>
            ) : null}
          </Box>
        </Grid>
      </Stack>
      <Box sx={{ m: 2 }}>
        <ButtonComponent
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          buttonLabel="Add new data"
          endIcon={<CreateNewFolderIcon />}
        />
      </Box>
    </form>
  )
}
