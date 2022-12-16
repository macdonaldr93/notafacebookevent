import {
  AccessTime,
  ArrowDropDown,
  Event,
  EventAvailable,
  People,
  Share,
  ThumbUp,
} from '@mui/icons-material';
import {
  Box,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  orderBy,
  query,
} from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
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

export default function EventIndex({ id }: EventIndex) {
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
  const { status, data } = useFirestoreDoc(eventRef);
  const { data: timelineData } = useFirestoreCollection(timelineRef);
  const { data: guestsData } = useFirestoreCollection(guestsRef);
  const eventData = data?.data();

  if (status === 'loading') {
    return (
      <>
        <Head>
          <title>... - Not a Facebook Event</title>
          <meta name="description" content="Host events off of Facebook" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main id="main">
          <Container maxWidth="md">
            <Box my={10}>
              <section>
                <Box textAlign="center">
                  <Box
                    flexDirection="row"
                    justifyContent="center"
                    display="flex"
                  >
                    <AccessTime color="secondary" sx={{ mr: 1 }} />
                    <Typography variant="subtitle1" component="p" gutterBottom>
                      <Skeleton variant="text" />
                    </Typography>
                  </Box>
                  <Typography variant="h2" component="h1" gutterBottom>
                    <Skeleton variant="text" />
                  </Typography>
                  <Grid container spacing={1} justifyContent="center">
                    <Grid item>
                      <Fab color="primary" variant="extended" disabled>
                        <ThumbUp sx={{ mr: 1 }} /> Going
                      </Fab>
                    </Grid>
                    <Grid item>
                      <Fab color="secondary" variant="extended" disabled>
                        <Share sx={{ mr: 1 }} /> Share
                      </Fab>
                    </Grid>
                    <Grid item>
                      <Fab color="secondary" variant="extended" disabled>
                        <EventAvailable sx={{ mr: 1 }} /> Calendar{' '}
                        <ArrowDropDown />
                      </Fab>
                    </Grid>
                  </Grid>
                </Box>
                <Box mt={10}>
                  <Paper sx={{ p: 2, mt: 2 }}>
                    <Typography variant="h6">Details</Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <Event color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={<Skeleton variant="text" />} />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <People color="secondary" />
                        </ListItemIcon>
                        <ListItemText primary={<Skeleton variant="text" />} />
                      </ListItem>
                    </List>
                    <Typography variant="body1" component="p">
                      <Skeleton variant="rectangular" />
                    </Typography>
                  </Paper>
                </Box>
              </section>
            </Box>
          </Container>
        </main>
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
                    Event not found
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
