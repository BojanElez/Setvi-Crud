import { MouseEvent, useContext } from 'react';
import { PostDetailContext, PostDetailContextType } from '../../../context/post-details.context';
import { CardActions, CardContent, Typography } from '@mui/material'
import { ButtonComponent } from '../../../componets/common/Button/Button.component';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeIcon from '@mui/icons-material/Mode';
import { PopUp } from '../../../componets/common/PopUp/PopUp.component';

type EventButtonType = MouseEvent<HTMLButtonElement, MouseEvent<Element, globalThis.MouseEvent>>

export const PostDetailsCard = () => {
  const PostDetailContextApi = useContext<PostDetailContextType | null>(PostDetailContext);
  const { state, edit, setEdit, open, setOpen, onSubmitDelete }:any = PostDetailContextApi;

  return (
    <>
      <CardActions>
        <CardContent>
          <Typography variant='h3' color="text.secondary" gutterBottom>
            {state.data?.id} - {state.data?.title}
          </Typography>
          <Typography variant="h6" component="div">
            {state.data?.body}
          </Typography>
        </CardContent>
      </CardActions>
      <ButtonComponent
        type="submit"
        size="medium"
        variant="contained"
        color="error"
        className="btn btn-delete"
        onClick={(event: EventButtonType) => onSubmitDelete(event)}
        buttonLabel="Delete"
        startIcon={<DeleteIcon />}
      />
      <ButtonComponent
        type="button"
        size="medium"
        variant="contained"
        color="primary"
        onClick={() => setEdit(true)}
        buttonLabel="Edit"
        startIcon={<ModeIcon />}
      />
      {!edit &&
        <PopUp
          dialogTitle="Delete"
          dialogText="This will falsely delete the user. Check your network tab before redirecting!"
          open={open}
          setOpen={setOpen}
        />
      }
    </>
  )
}
