import { Alert, Container, Typography } from '@mui/material';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFirestore } from 'reactfire';
import { EventForm, EventFormValues } from '../containers';

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
      return;
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

      window.sessionStorage.setItem(
        `events/${newEvent.id}/managePassword`,
        adminPassword,
      );

      router.push(`/events/${newEvent.id}`);
    } catch (err) {
      setErrorMessage('Your event failed to create. Try again');
    }
  };

  return (
    <main id="main">
      <Container>
        <Typography variant="h2" component="h1" gutterBottom>
          Host an event
        </Typography>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <EventForm
          control={control}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit(onSubmit)}
        />
      </Container>
    </main>
  );
}
