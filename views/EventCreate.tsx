import { Alert, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFirestore } from 'reactfire';
import { EventForm, EventFormValues } from '../containers';
import { setEventManagePassword } from '../utils/cookies';

export function EventCreate() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    },
  });

  const onSubmit: SubmitHandler<EventFormValues> = async ({
    adminPassword,
    description,
    locationUrl,
    name,
    startAt,
  }) => {
    setErrorMessage(null);

    if (startAt === '') {
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
        visibility: 'public',
      });

      setEventManagePassword(newEvent.id, adminPassword);
      router.push(`/events/${newEvent.id}`);
    } catch (err) {
      setErrorMessage('Your event failed to create. Try again');
    }
  };

  return (
    <main id="main">
      <Container>
        <Box my={20}>
          <Typography align="center" variant="h1" gutterBottom>
            Say goodbye to Facebook
          </Typography>
        </Box>
        <Box mb={7}>
          <Typography align="center" variant="h2" component="p" gutterBottom>
            Host events by simply sharing a URL
          </Typography>
        </Box>
        <Box mb={7}>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <EventForm
            control={control}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit(onSubmit)}
          />
        </Box>
      </Container>
    </main>
  );
}
