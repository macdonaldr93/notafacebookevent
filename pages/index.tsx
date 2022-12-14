import { Container, Typography } from '@mui/material';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import Head from 'next/head';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useFirestore } from 'reactfire';
import { EventForm, EventFormValues } from '../containers';

export default function Home() {
  const firestore = useFirestore();
  const eventsRef = collection(firestore, 'events');

  const { control, handleSubmit } = useForm<EventFormValues>({
    defaultValues: {
      coverMedia: undefined,
      description: '',
      locationUrl: '',
      name: '',
      startAt: '',
    },
  });

  const onSubmit: SubmitHandler<EventFormValues> = ({
    name,
    description,
    locationUrl,
    startAt,
  }) => {
    if (startAt === '') {
      return;
    }

    addDoc(eventsRef, {
      name,
      description,
      locationUrl,
      startAt: Timestamp.fromDate(startAt),
    });
  };

  return (
    <Container>
      <Head>
        <title>Not a Facebook event</title>
        <meta name="description" content="Host events off of Facebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id="main">
        <Typography variant="h2" component="h1" gutterBottom>
          Host an event
        </Typography>
        <EventForm control={control} onSubmit={handleSubmit(onSubmit)} />
      </main>
    </Container>
  );
}
