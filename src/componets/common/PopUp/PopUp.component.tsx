import redirectPage from '../../../utils/helpers/helpers';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button} from '@mui/material/';

type DialogType = {
  dialogTitle: string;
  dialogText: string;
  open: boolean;
  setOpen: (arg0: boolean) => void
}

export const PopUp = ({dialogTitle, dialogText, open, setOpen}:DialogType) =>{
  const handleClose = () => {
    setOpen(false);
    redirectPage();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}