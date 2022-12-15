import { Box, Paper, Typography } from '@mui/material';
import { formatDistance } from 'date-fns';
import { QuerySnapshot } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TimelineForm, TimelineFormValues } from '../containers';
import { useTimeline } from '../hooks/useTimeline';
import { TimelineData } from '../types/events';

export interface TimelineDetailsProps {
  eventId: string;
  data: QuerySnapshot<TimelineData>;
}

export function TimelineDetails({ eventId, data }: TimelineDetailsProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { createPost } = useTimeline();

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
    const succeeded = await createPost(eventId, text);

    if (succeeded) {
      enqueueSnackbar('Posted to timeline', { variant: 'success' });
    } else {
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
          {postData?.createdAt
            ? formatDistance(postData.createdAt.toDate(), new Date())
            : ''}
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