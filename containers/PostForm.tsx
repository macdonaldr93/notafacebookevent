import { Box, Button, TextField } from '@mui/material';
import { FormEvent } from 'react';
import { Control, Controller } from 'react-hook-form';

export interface PostFormValues {
  text: string;
}

export interface PostFormProps {
  control: Control<PostFormValues>;
  isSubmitting?: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function PostForm({ control, isSubmitting, onSubmit }: PostFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Box my={4}>
        <Controller
          name="text"
          control={control}
          rules={{ required: 'This is required' }}
          render={({ field, fieldState }) => (
            <TextField
              label="Write something"
              error={Boolean(fieldState.error)}
              helperText={fieldState.error?.message}
              fullWidth
              rows={3}
              multiline
              {...field}
            />
          )}
        />
      </Box>
      <Button
        size="large"
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        fullWidth
      >
        Post
      </Button>
    </form>
  );
}
