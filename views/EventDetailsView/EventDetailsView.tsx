import {
  AccessTime,
  Event,
  MapOutlined,
  People,
  Share,
  ThumbUp,
} from '@mui/icons-material';
import MuiMarkdown from 'mui-markdown';
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
  Tooltip,
  Typography,
} from '@mui/material';
import { formatDistance } from 'date-fns';
import pluralize from 'pluralize';
import { AddToCalendarFab, SubscribeFab } from '../../components';
import { EventData, GuestData, PostData } from '../../types/events';
import { useIsGoing, useShare } from '../../hooks';
import { TimelineView } from '../TimelineView';

export interface EventDetailsViewProps {
  id: string;
  data: EventData;
  guestsData: GuestData[];
  postsData: PostData[];
}

export function EventDetailsView({
  id,
  data,
  guestsData,
  postsData,
}: EventDetailsViewProps) {
  const { isGoing, onGoing, loading: goingLoading } = useIsGoing(id);
  const { onShare } = useShare(id, data?.name);

  const startAt = data?.startAt?.toDate();
  const endAt = data?.endAt?.toDate();
  const relativeStartAt = startAt
    ? formatDistance(startAt, new Date(), { addSuffix: true })
    : null;
  const localizedStartAt = startAt?.toLocaleString();
  const localizedEndAt = endAt?.toLocaleString();
  const guestNames = guestsData?.map(guest => guest.name).join(', ');

  return (
    <Container maxWidth="md">
      <Box my={10}>
        <section>
          <Box textAlign="center">
            <Box flexDirection="row" justifyContent="center" display="flex">
              <AccessTime color="secondary" sx={{ mr: 1 }} />
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
                    disabled={goingLoading}
                  >
                    <ThumbUp sx={{ mr: 1 }} /> Going
                  </Fab>
                </Grid>
              )}
              <Grid item>
                <Tooltip title="Share" arrow>
                  <Fab color="secondary" variant="extended" onClick={onShare}>
                    <Share />
                  </Fab>
                </Tooltip>
              </Grid>
              <Grid item>
                <AddToCalendarFab
                  event={data}
                  onSelect={url => window.open(url, '_blank')}
                />
              </Grid>
              <Grid item>
                <SubscribeFab id={id} />
              </Grid>
            </Grid>
          </Box>
          <Box mt={10}>
            {isGoing && (
              <Box mt={4}>
                <Alert severity="info">You&apos;re going to this event</Alert>
              </Box>
            )}
            <Paper sx={{ p: 2, mt: 2 }}>
              <Typography variant="h6">Details</Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Event color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      localizedEndAt
                        ? `${localizedStartAt} - ${localizedEndAt}`
                        : localizedStartAt
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <People color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${pluralize(
                      'person',
                      guestsData?.length ?? 0,
                      true,
                    )} going${guestNames ? ` (${guestNames})` : ''}`}
                  />
                </ListItem>
                {data?.locationUrl ? (
                  <ListItem disablePadding>
                    <ListItemButton component="a" href={data.locationUrl}>
                      <ListItemIcon>
                        <MapOutlined color="secondary" />
                      </ListItemIcon>
                      <ListItemText primary={data?.location || 'Maps'} />
                    </ListItemButton>
                  </ListItem>
                ) : data?.location ? (
                  <ListItem>
                    <ListItemIcon>
                      <MapOutlined color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary={data.location} />
                  </ListItem>
                ) : null}
              </List>
            </Paper>
            {data?.description && (
              <Paper sx={{ p: 2, mt: 2 }}>
                <MuiMarkdown>{data.description}</MuiMarkdown>
              </Paper>
            )}
          </Box>
        </section>
        <TimelineView eventId={id} data={postsData} />
      </Box>
    </Container>
  );
}
