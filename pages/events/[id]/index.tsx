import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  orderBy,
  query,
} from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  useFirestore,
  useFirestoreCollection,
  useFirestoreDoc,
} from 'reactfire';
import { UsernameGuard } from '../../../containers';
import { EventData, GuestData, TimelineData } from '../../../types/events';
import { EventDetails } from '../../../views/EventDetails';

export interface EventIndex {
  id: string;
}

function EventIndex({ id }: EventIndex) {
  const firestore = useFirestore();
  const eventRef = doc(firestore, 'events', id) as DocumentReference<EventData>;
  const timelineRef = query(
    collection(firestore, 'events', id, 'timeline'),
    orderBy('createdAt', 'desc'),
  ) as CollectionReference<TimelineData>;
  const guestsRef = query(
    collection(firestore, 'events', id, 'guests'),
    orderBy('createdAt', 'asc'),
  ) as CollectionReference<GuestData>;
  const { data } = useFirestoreDoc(eventRef);
  const { data: timelineData } = useFirestoreCollection(timelineRef);
  const { data: guestsData } = useFirestoreCollection(guestsRef);

  if (!data?.exists()) {
    return (
      <>
        <Head>
          <title>Not Found - Not a Facebook Event</title>
          <meta name="description" content="Host events off of Facebook" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Container maxWidth="md">
          <Box textAlign="center" my={10}>
            <Typography variant="h2" component="h1">
              Event not found
            </Typography>
          </Box>
        </Container>
      </>
    );
  }

  const eventData = data.data() as EventData;

  return (
    <>
      <Head>
        <title>{eventData?.name ?? 'Untitled'} - Not a Facebook Event</title>
        <meta name="description" content="Host events off of Facebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UsernameGuard>
        <EventDetails
          id={id}
          data={eventData}
          guestsData={guestsData}
          timelineData={timelineData}
        />
      </UsernameGuard>
    </>
  );
}

export default function EventIndexContainer() {
  const [id, setId] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      setId(router.query.id as string);
    }
  }, [router.isReady, router.query.id]);

  if (id) {
    return <EventIndex id={id as string} />;
  }

  return (
    <>
      <Head>
        <title>Not a Facebook Event</title>
        <meta name="description" content="Host events off of Facebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </>
  );
}
