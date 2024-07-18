import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const ConfirmDialog = ({open, handleClose, handleConfirm ,title, content, actionTitle}: {
  open: boolean,
  handleClose: () => void,
  handleConfirm: () => void,
  title: string,
  content: string,
  actionTitle: string,
}) => {
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle className="!font-semibold">{title}</DialogTitle>
      <Box position="absolute" top={0} right={0}>
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent>
        <Typography className="!text-sm">{content}</Typography>
      </DialogContent>
      <DialogActions className="!m-5">
        <Button
          variant="outlined"
          className="!normal-case"
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          className="!bg-[#C72B20] !normal-case"
          onClick={() => {
            handleConfirm();
            handleClose();
          }}
        >
          {actionTitle}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
