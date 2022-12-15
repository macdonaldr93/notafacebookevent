import { Box, Paper, Typography } from '@mui/material';
import { formatDistance } from 'date-fns';
import {
  addDoc,
  collection,
  QuerySnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useFirestore } from 'reactfire';
import { TimelineForm, TimelineFormValues } from '../containers';
import { TimelineData } from '../types/events';
import { getUsername } from '../utils/cookies';

export interface TimelineDetailsProps {
  eventId: string;
  data: QuerySnapshot<TimelineData>;
}

export function TimelineDetails({ eventId, data }: TimelineDetailsProps) {
  const { enqueueSnackbar } = useSnackbar();
  const firestore = useFirestore();
  const timelineRef = collection(firestore, 'events', eventId, 'timeline');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TimelineFormValues>({
    defaultValues: {
      text: '',
    },
  });

  const onSubmit: SubmitHandler<TimelineFormValues> = async ({ text }) => {
    const username = getUsername();

    try {
      await addDoc(timelineRef, {
        author: username,
        postedAt: serverTimestamp(),
        text,
        visibility: 'public',
      });

      enqueueSnackbar('Posted to timeline', { variant: 'success' });
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Failed to post to timeline. Try again', {
        variant: 'error',
      });
    }
  };

  const timelineMarkup = data?.docs.map(post => {
    const postData = post.data();

    return (
      <Box
        key={post.id}
        sx={{ borderLeft: 2, borderLeftColor: 'InactiveBorder', my: 2, pl: 1 }}
      >
        <Typography variant="body2">
          {postData?.author}
          {' - '}
          {formatDistance(postData?.postedAt.toDate(), new Date())}
        </Typography>
        <Typography>{postData?.text}</Typography>
      </Box>
    );
  });

  return (
    <section>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Timeline</Typography>
        {timelineMarkup && <Box sx={{ mt: 2, mb: 4 }}>{timelineMarkup}</Box>}
        <TimelineForm
          control={control}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit(onSubmit)}
        />
      </Paper>
    </section>
  );
}
