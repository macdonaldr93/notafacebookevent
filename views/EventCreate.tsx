import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFirestore } from 'reactfire';
import { EventForm, EventFormValues } from '../containers';
import { setEventManagePassword } from '../utils/cookies';

export function EventCreate() {
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
      locationUrl: '',
      name: '',
      startAt: '',
      endAt: '',
    },
  });

  const onSubmit: SubmitHandler<EventFormValues> = async ({
    adminPassword,
    description,
    locationUrl,
    name,
    startAt,
    endAt,
  }) => {
    if (startAt === '') {
      enqueueSnackbar('Event start cannot be blank', { variant: 'error' });
      throw new Error('startAt cannot be blank');
    }

    try {
      const newEvent = await addDoc(eventsRef, {
        admin: {
          managePassword: adminPassword,
        },
        name,
        description,
        locationUrl,
        startAt: Timestamp.fromDate(startAt),
        endAt: endAt ? Timestamp.fromDate(endAt) : null,
        visibility: 'public',
      });

      setEventManagePassword(newEvent.id, adminPassword);
      router.push(`/events/${newEvent.id}`);
    } catch (err) {
      enqueueSnackbar('Your event failed to create. Try again', {
        variant: 'error',
      });
    }
  };

  return (
    <main id="main">
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
    </main>
  );
}
