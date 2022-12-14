import { Container, Typography } from '@mui/material';
import { doc } from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useFirestore, useFirestoreDocData } from 'reactfire';

export interface EventsIdProps {
  id: string;
}

export default function EventsId({ id }: EventsIdProps) {
  console.log('eventId', id);

  const firestore = useFirestore();
  const eventRef = doc(firestore, 'events', id);
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
        <Typography variant="h2" component="h1" gutterBottom>
          {data?.name}
        </Typography>
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
