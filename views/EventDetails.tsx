import {
  CalendarMonth,
  MapOutlined,
  People,
  ThumbUp,
} from '@mui/icons-material';
import {
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
import { QuerySnapshot } from 'firebase/firestore';
import { EventData, TimelineData } from '../types/events';
import { TimelineDetails } from './TimelineDetails';

export interface EventDetailsProps {
  id: string;
  data: EventData;
  timelineData: QuerySnapshot<TimelineData>;
}

export function EventDetails({ id, data, timelineData }: EventDetailsProps) {
  const startAt = data?.startAt?.toDate();
  const relativeStartAt = startAt
    ? formatDistance(startAt, new Date(), { addSuffix: true })
    : null;
  const localizedStartAt = startAt?.toLocaleString();

  return (
    <main id="main">
      <Container>
        <Box my={10}>
          <section>
            <Box flexDirection="row" display="flex">
              <CalendarMonth color="secondary" sx={{ mr: 1 }} />
              <Typography variant="subtitle1" component="p" gutterBottom>
                {relativeStartAt ?? <Skeleton variant="text" />}
              </Typography>
            </Box>
            <Typography variant="h2" component="h1" gutterBottom>
              {data?.name ?? <Skeleton variant="text" />}
            </Typography>
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
                  <ListItemText primary="3 people going" />
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
      <Box textAlign="center">
        <Fab size="large" color="primary" variant="extended">
          <ThumbUp sx={{ mr: 1 }} /> Going
        </Fab>
      </Box>
    </main>
  );
}
