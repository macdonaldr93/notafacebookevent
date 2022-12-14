import {
  Autocomplete,
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import Head from 'next/head';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Dropzone from 'react-dropzone';

export interface FormValues {
  coverMedia: File;
  description: string;
  eventName: string;
  eventStartAt: Date | '';
  location: string;
}

export default function Home() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      coverMedia: undefined,
      description: '',
      eventName: '',
      eventStartAt: '',
      location: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data);
  };

  return (
    <>
      <Head>
        <title>Not a Facebook event</title>
        <meta name="description" content="Host events off of Facebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography variant="h2" component="h1" gutterBottom>
          Host an event
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4}>
            <Grid item md={6} xs={12}>
              <Controller
                name="eventName"
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
                name="eventStartAt"
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
                name="location"
                control={control}
                render={({ field, fieldState }) => (
                  <Autocomplete
                    options={['Sudbury']}
                    fullWidth
                    renderInput={inputProps => (
                      <TextField
                        label="Location"
                        error={Boolean(fieldState.error)}
                        helperText={fieldState.error?.message}
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
      </main>
    </>
  );
}
