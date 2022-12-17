import { Box, Paper, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Post } from '../components';
import { PostForm, PostFormValues as PostFormValues } from '../containers';
import { usePosts } from '../hooks';
import { PostData } from '../types/events';

export interface TimelineViewProps {
  eventId: string;
  data: PostData[];
}

export function TimelineView({ eventId, data }: TimelineViewProps) {
  const { enqueueSnackbar } = useSnackbar();
  const { createPost } = usePosts();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<PostFormValues>({
    defaultValues: {
      notify: false,
      text: '',
    },
  });

  const onSubmit: SubmitHandler<PostFormValues> = async ({ notify, text }) => {
    const succeeded = await createPost(eventId, text, notify);

    if (succeeded) {
      enqueueSnackbar('Posted to timeline', { variant: 'success' });
      reset();
    } else {
      enqueueSnackbar('Failed to post to timeline. Try again', {
        variant: 'error',
      });
    }
  };

  const timelineMarkup = data?.map(post => {
    return (
      <Post
        key={post.id}
        author={post?.author}
        createdAt={post?.createdAt?.toDate()}
        text={post?.text}
      />
    );
  });

  return (
    <section>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Timeline</Typography>
        {timelineMarkup && <Box sx={{ mt: 2, mb: 4 }}>{timelineMarkup}</Box>}
        <PostForm
          control={control}
          isSubmitting={isSubmitting}
          onSubmit={handleSubmit(onSubmit)}
        />
      </Paper>
    </section>
  );
}
