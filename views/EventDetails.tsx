import {
  CalendarMonth,
  MapOutlined,
  People,
  ThumbUp,
} from '@mui/icons-material';
import {
  Alert,
  Box,
  Container,
  Fab,
  List,
  ListItem,
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
import pluralize from 'pluralize';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useFirestore } from 'reactfire';
import { EventData, GuestData, TimelineData } from '../types/events';
import { getGoing, getUsername, setGoing } from '../utils/cookies';
import { TimelineDetails } from './TimelineDetails';

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
              {isGoing ? (
                <Alert severity="info">You&apos;re going to this event</Alert>
              ) : (
                <Fab
                  color="primary"
                  variant="extended"
                  onClick={onGoing}
                  disabled={posting}
                >
                  <ThumbUp sx={{ mr: 1 }} /> Going
                </Fab>
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
                    <MapOutlined color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={data?.location ?? 'No location specified'}
                  />
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
                    )} going`}
                  />
                </ListItem>
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
