import { Box, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { EventErrorBoundary, UsernameGuard } from '../../../containers';
import { useEvent } from '../../../hooks';
import { EventDetails } from '../../../views/EventDetails';
import { EventDetailsLoading } from '../../../views/EventDetailsLoading';

function EventIndex({ id }: { id: string }) {
  const { status, eventData, guestsData, postsData: postsData } = useEvent(id);

  if (status === 'loading') {
    return (
      <>
        <Head>
          <title>Events | Toolbug</title>
        </Head>
        <EventDetailsLoading />
      </>
    );
  }

  if (!eventData) {
    return (
      <>
        <Head>
          <title>Not Found | Events | Toolbug</title>
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
        <title>{eventData?.name ?? 'Untitled'} | Events | Toolbug</title>
        <meta
          name="description"
          content={`${eventData?.name} on ${eventData?.startAt
            .toDate()
            .toLocaleString()} | ${eventData?.description}`}
        />
      </Head>
      <UsernameGuard>
        <EventDetails
          id={id}
          data={eventData}
          guestsData={guestsData}
          postsData={postsData}
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
          <title>Events | Toolbug</title>
        </Head>
        <EventDetailsLoading />
      </>
    );
  }

  return (
    <EventErrorBoundary>
      <EventIndex id={id} />
    </EventErrorBoundary>
  );
}
