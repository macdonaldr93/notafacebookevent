import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { PropsWithChildren, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useUsername } from '../hooks/useUsername';

export interface UsernameFormValues {
  username: string;
}

export function UsernameGuard({ children }: PropsWithChildren<{}>) {
  const { username, changeUsername } = useUsername();
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
    changeUsername(username);
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
