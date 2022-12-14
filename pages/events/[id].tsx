import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import { doc, DocumentReference } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { EventData } from '../../types/events';

export interface EventsIdProps {
  id: string;
}

export default function EventsId({ id }: EventsIdProps) {
  const firestore = useFirestore();
  const eventRef = doc(firestore, 'events', id) as DocumentReference<EventData>;
  const { status, data } = useFirestoreDocData(eventRef);

  return (
    <Container>
      <Head>
        <title>Not a Facebook event</title>
        <meta name="description" content="Host events off of Facebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id="main">
        {status === 'loading' && <p>Loading...</p>}
        <Typography variant="subtitle1" component="p" gutterBottom>
          {data?.startAt?.toDate().toLocaleDateString()}
        </Typography>
        <Typography variant="h2" component="h1" gutterBottom>
          {data?.name}
        </Typography>
        <Alert
          severity="info"
          action={
            <Button variant="outlined" size="small">
              Going
            </Button>
          }
        >
          Ryan invited you
        </Alert>
        <Box>
          <Typography variant="body1" component="p" gutterBottom>
            {data?.description}
          </Typography>
        </Box>
        <Paper>
          <Typography>3 people are going</Typography>
        </Paper>
        <Typography>Timeline</Typography>
        <Paper>
          <Typography>3 people are going</Typography>
        </Paper>
      </main>
    </Container>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params?.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: context.params.id,
    },
  };
}
