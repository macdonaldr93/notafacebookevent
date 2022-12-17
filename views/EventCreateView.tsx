import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFirestore } from 'reactfire';
import { EventForm, EventFormValues } from '../containers';

export function EventCreateView() {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const firestore = useFirestore();
  const eventsRef = collection(firestore, 'events');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EventFormValues>({
    defaultValues: {
      adminPassword: '',
      coverMedia: undefined,
      description: '',
      location: '',
      locationUrl: '',
      name: '',
      startAt: '',
      endAt: '',
    },
  });

  const onSubmit: SubmitHandler<EventFormValues> = async ({
    adminPassword,
    description,
    location,
    locationUrl,
    name,
    startAt,
    endAt,
  }) => {
    if (startAt === '') {
      enqueueSnackbar('Event start cannot be blank', { variant: 'error' });
      return;
    }

    try {
      const newEvent = await addDoc(eventsRef, {
        admin: {
          managePassword: adminPassword,
        },
        name: name.trim(),
        description,
        location: location ? location.trim() : null,
        locationUrl: locationUrl ? locationUrl.trim() : null,
        startAt: Timestamp.fromDate(startAt),
        endAt: endAt ? Timestamp.fromDate(endAt) : null,
        visibility: 'public',
      });

      router.push(`/events/${newEvent.id}`);
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Event failed to create. Try again', {
        variant: 'error',
      });
    }
  };

  return (
    <Container maxWidth="md">
      <Box my={10}>
        <Typography align="center" variant="h2" gutterBottom>
          👋 Say goodbye to
          <br />
          Facebook events
        </Typography>
      </Box>
      <Box mb={5}>
        <Typography align="center" variant="h3" component="p" gutterBottom>
          Plan events by simply sharing a URL
        </Typography>
      </Box>
      <Box mb={5}>
        <EventForm
          control={control}
          isSubmitting={isSubmitting}
          newEvent
          onSubmit={handleSubmit(onSubmit)}
        />
      </Box>
    </Container>
  );
}
