import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { getUsername, setUsername } from '../utils/cookies';

export interface UsernameFormValues {
  username: string;
}

export function UsernameGuard({ children }: PropsWithChildren<{}>) {
  const username = getUsername();
  const [modalOpen, setModalOpen] = useState(!username);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UsernameFormValues>({
    defaultValues: {
      username: username ?? '',
    },
  });
  const onSubmit: SubmitHandler<UsernameFormValues> = ({ username }) => {
    console.log(username);
    setUsername(username);
    setModalOpen(false);
  };

  return (
    <>
      {username ? children : null}
      <Dialog open={modalOpen}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>What would you like to be called?</DialogTitle>
          <DialogContent>
            <Controller
              name="username"
              control={control}
              rules={{ required: 'This is required' }}
              render={({ field, fieldState }) => (
                <TextField
                  id="username"
                  label="Username"
                  type="text"
                  fullWidth
                  variant="standard"
                  error={Boolean(fieldState.error)}
                  helperText={fieldState.error?.message}
                  {...field}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
