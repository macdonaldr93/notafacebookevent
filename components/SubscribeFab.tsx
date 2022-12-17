import { useState } from 'react';
import { NotificationAdd } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  TextField,
  Tooltip,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { addDoc, collection, doc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from 'reactfire';
import { useUsername } from '../hooks';
import { useSnackbar } from 'notistack';

export function SubscribeFab({ id }: { id: string }) {
  const { enqueueSnackbar } = useSnackbar();
  const { username } = useUsername();
  const firestore = useFirestore();
  const [modalOpen, setModalOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<{ phone: string }>({
    defaultValues: {
      phone: '',
    },
  });

  const onSubmit: SubmitHandler<{ phone: string }> = async ({ phone }) => {
    const subsRef = collection(firestore, 'events', id, 'subscribers');

    try {
      await addDoc(subsRef, {
        phone,
        username,
        createdAt: serverTimestamp(),
      });

      enqueueSnackbar('You have subscribed to the event', {
        variant: 'success',
      });
    } catch (err) {
      enqueueSnackbar('Failed to subscribe. Try again', {
        variant: 'error',
      });
      console.error(err);
    }

    setModalOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setModalOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <Tooltip title="Subscribe" arrow>
        <Fab
          color="secondary"
          variant="extended"
          onClick={handleClick}
          onMouseDown={handleClick}
        >
          <NotificationAdd />
        </Fab>
      </Tooltip>
      <Dialog open={modalOpen} onClose={handleClose} maxWidth="xs" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Receive SMS updates</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Controller
                name="phone"
                control={control}
                rules={{
                  required: 'This is required',
                  pattern: {
                    value: new RegExp('^\\+[1-9]\\d{1,14}$'),
                    message: 'Format invalid. Use +11234567890',
                  },
                }}
                render={({ field, fieldState }) => (
                  <TextField
                    id="phone"
                    label="Phone"
                    type="tel"
                    fullWidth
                    variant="standard"
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    placeholder="+11234567890"
                    {...field}
                  />
                )}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              type="submit"
              variant="contained"
              color="error"
              disabled={isSubmitting}
            >
              Subscribe
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
