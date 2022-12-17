import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { FormEvent, useState } from 'react';
import { Control, Controller } from 'react-hook-form';

export interface EventFormValues {
  adminPassword: string;
  coverMedia: File;
  description: string;
  endAt: Date | '';
  location: string;
  locationUrl: string;
  name: string;
  startAt: Date | '';
}

export interface EventFormProps {
  control: Control<EventFormValues>;
  isSubmitting?: boolean;
  newEvent?: boolean;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function EventForm({
  control,
  isSubmitting,
  newEvent,
  onSubmit,
}: EventFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
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
        <Grid item md={6} xs={12}>
          <Controller
            name="endAt"
            control={control}
            render={({ field, fieldState }) => (
              <DateTimePicker
                label="Event end date"
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
        <Grid item xs={6}>
          <Controller
            name="location"
            control={control}
            render={({ field, fieldState }) => (
              <TextField
                type="text"
                label="Location"
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                fullWidth
                {...field}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
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
                type={showPassword ? 'text' : 'password'}
                error={Boolean(fieldState.error)}
                helperText={fieldState.error?.message}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(prev => !prev)}
                        onMouseDown={() => setShowPassword(prev => !prev)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
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
            {newEvent ? 'Create' : 'Save'}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
