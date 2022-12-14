import { Button, Grid, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { FormEvent } from 'react';
import Dropzone from 'react-dropzone';
import { Control, Controller } from 'react-hook-form';

export interface EventFormValues {
  coverMedia: File;
  description: string;
  name: string;
  startAt: Date | '';
  locationUrl: string;
}

export interface EventFormProps {
  control: Control<EventFormValues>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function EventForm({ control, onSubmit }: EventFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <Controller
            name="name"
            control={control}
            rules={{ required: 'Required' }}
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
            rules={{ required: 'Required' }}
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
                label="Location"
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
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
