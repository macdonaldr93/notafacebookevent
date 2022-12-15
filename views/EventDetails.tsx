import {
  CalendarMonth,
  MapOutlined,
  People,
  Share,
  ThumbUp,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Container,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Skeleton,
  Typography,
} from '@mui/material';
import { formatDistance } from 'date-fns';
import {
  addDoc,
  collection,
  QuerySnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import copy from 'copy-to-clipboard';
import pluralize from 'pluralize';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useFirestore } from 'reactfire';
import { EventData, GuestData, TimelineData } from '../types/events';
import { getGoing, getUsername, setGoing } from '../utils/cookies';
import { TimelineDetails } from './TimelineDetails';
import { useTimeline } from '../hooks/useTimeline';

export interface EventDetailsProps {
  id: string;
  data: EventData;
  guestsData: QuerySnapshot<GuestData>;
  timelineData: QuerySnapshot<TimelineData>;
}

export function EventDetails({
  id,
  data,
  guestsData,
  timelineData,
}: EventDetailsProps) {
  const [posting, setPosting] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const firestore = useFirestore();
  const { createPost } = useTimeline();

  const isGoing = getGoing(id);
  const startAt = data?.startAt?.toDate();
  const relativeStartAt = startAt
    ? formatDistance(startAt, new Date(), { addSuffix: true })
    : null;
  const localizedStartAt = startAt?.toLocaleString();

  const onGoing = async () => {
    setPosting(true);

    const guestsRef = collection(firestore, 'events', id, 'guests');
    const username = getUsername();

    try {
      await addDoc(guestsRef, {
        name: username,
        createdAt: serverTimestamp(),
      });
      await createPost(id, `🙌 ${username} is going to the event`);
      setGoing(id, true);
      enqueueSnackbar('Woohoo!', { variant: 'success' });
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Failed to post you're going. Try again", {
        variant: 'error',
      });
    } finally {
      setPosting(false);
    }
  };

  const onShare = async () => {
    try {
      await navigator.share({ title: data?.name, url: window.location.href });
    } catch (err) {
      copy(window.location.href);
      enqueueSnackbar('Copied to clipboard', { variant: 'success' });
      console.error(err);
    }
  };

  const guestNames = guestsData?.docs
    .map(guest => guest.data().name)
    .join(', ');

  return (
    <main id="main">
      <Container maxWidth="md">
        <Box my={10}>
          <section>
            <Box textAlign="center">
              <Box flexDirection="row" justifyContent="center" display="flex">
                <CalendarMonth color="secondary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" component="p" gutterBottom>
                  {relativeStartAt ?? <Skeleton variant="text" />}
                </Typography>
              </Box>
              <Typography variant="h2" component="h1" gutterBottom>
                {data?.name ?? <Skeleton variant="text" />}
              </Typography>
              <Grid container spacing={1} justifyContent="center">
                {!isGoing && (
                  <Grid item>
                    <Fab
                      color="primary"
                      variant="extended"
                      onClick={onGoing}
                      disabled={posting}
                    >
                      <ThumbUp sx={{ mr: 1 }} /> Going
                    </Fab>
                  </Grid>
                )}
                <Grid item>
                  <Fab
                    color="secondary"
                    variant="extended"
                    onClick={onShare}
                    disabled={posting}
                  >
                    <Share sx={{ mr: 1 }} /> Share
                  </Fab>
                </Grid>
              </Grid>
              {isGoing && (
                <Box mt={4}>
                  <Alert severity="info">You&apos;re going to this event</Alert>
                </Box>
              )}
            </Box>
            {data?.location && (
              <Box flexDirection="row" display="flex">
                <MapOutlined color="secondary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" component="p" gutterBottom>
                  {data.localtion}
                </Typography>
              </Box>
            )}
            <Paper sx={{ p: 2, mt: 2 }}>
              <Typography variant="h6">Details</Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <CalendarMonth color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary={localizedStartAt} />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <People color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${pluralize(
                      'person',
                      guestsData?.size,
                      true,
                    )} going (${guestNames})`}
                  />
                </ListItem>
                {data?.locationUrl && (
                  <ListItem disablePadding>
                    <ListItemButton component="a" href={data.locationUrl}>
                      <ListItemIcon>
                        <MapOutlined color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary="Google Maps" />
                    </ListItemButton>
                  </ListItem>
                )}
              </List>
              <Typography variant="body1" component="p">
                {data?.description}
              </Typography>
            </Paper>
          </section>
          <TimelineDetails eventId={id} data={timelineData} />
        </Box>
      </Container>
    </main>
  );
}
