import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { UsernameGuard } from '../../../containers';
import { useEvent } from '../../../hooks';
import { EventDetails } from '../../../views/EventDetails';
import { EventDetailsLoading } from '../../../views/EventDetailsLoading';

function EventIndex({ id }: { id: string }) {
  const { status, eventData, guestsData, timelineData } = useEvent(id);

  if (status === 'loading') {
    return (
      <>
        <Head>
          <title>Not a Facebook Event</title>
        </Head>
        <EventDetailsLoading />
      </>
    );
  }

  if (!eventData) {
    return (
      <>
        <Head>
          <title>Not Found - Not a Facebook Event</title>
          <meta name="description" content="Host events off of Facebook" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main id="main">
          <Container maxWidth="md">
            <Box my={10}>
              <section>
                <Box textAlign="center">
                  <Typography variant="h2" component="h1" gutterBottom>
                    We can&apos;t find the event
                  </Typography>
                  <Typography variant="h5" component="p" gutterBottom>
                    Ask your friend for the URL to their event again
                  </Typography>
                </Box>
              </section>
            </Box>
          </Container>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{eventData?.name ?? 'Untitled'} - Not a Facebook Event</title>
        <meta
          name="description"
          content={`${eventData?.name} on ${eventData?.startAt
            .toDate()
            .toLocaleString()} | ${eventData?.description}`}
        />
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

export default function EventIndexPage() {
  const router = useRouter();
  const id = router.query.id as string | undefined;

  if (!id) {
    return (
      <>
        <Head>
          <title>Not a Facebook Event</title>
        </Head>
        <EventDetailsLoading />
      </>
    );
  }

  return <EventIndex id={id} />;
}
