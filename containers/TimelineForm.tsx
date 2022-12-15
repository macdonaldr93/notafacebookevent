import { Box, Button, Grid, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { FormEvent } from 'react';
import { Control, Controller } from 'react-hook-form';

export interface TimelineFormValues {
  text: string;
}

export interface TimelineFormProps {
  control: Control<TimelineFormValues>;
  isSubmitting?: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function TimelineForm({
  control,
  isSubmitting,
  onSubmit,
}: TimelineFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Box my={2}>
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
      >
        Post
      </Button>
    </form>
  );
}
