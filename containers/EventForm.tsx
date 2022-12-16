import { Button, Grid, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { DateTimePicker } from '@mui/x-date-pickers';
import { FormEvent } from 'react';
import Dropzone from 'react-dropzone';
import { Control, Controller } from 'react-hook-form';

export interface EventFormValues {
  adminPassword: string;
  coverMedia: File;
  description: string;
  name: string;
  startAt: Date | '';
  locationUrl: string;
}

export interface EventFormProps {
  control: Control<EventFormValues>;
  isSubmitting?: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function EventForm({ control, isSubmitting, onSubmit }: EventFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'This is required' }}
            render={({ field, fieldState }) => (
              <TextField
                label="Event name"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item md={6} xs={12}>
          <Controller
            name="startAt"
            control={control}
            rules={{ required: 'This is required' }}
            render={({ field, fieldState }) => (
              <DateTimePicker
                label="Event start date"
                renderInput={inputProps => (
                  <TextField
                    error={Boolean(fieldState.error)}
                    helperText={fieldState.error?.message}
                    fullWidth
                    {...inputProps}
                  />
                )}
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="locationUrl"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                type="url"
                label="Google Maps URL"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                label="Description"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                multiline
                rows={4}
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <Controller
            name="coverMedia"
            control={control}
            render={({ field: { onChange } }) => (
              <Dropzone onDropAccepted={files => onChange(files[0])}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>Drop some files here, or click to select files</p>
                  </div>
                )}
              </Dropzone>
            )}
          />
        </Grid> */}
        <Grid item xs={12}>
          <Controller
            name="adminPassword"
            control={control}
            rules={{
              required: 'This is required',
              minLength: {
                value: 4,
                message: 'This must be longer than 4 letters',
              },
            }}
            render={({ field, fieldState }) => (
              <TextField
                label="Admin password"
                type="password"
                error={Boolean(fieldState.error)}
                helperText={
                  fieldState.error?.message ??
                  "You'll use this to edit your event in the future"
                }
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            size="large"
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            fullWidth
          >
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
