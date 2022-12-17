import { Box, Typography } from '@mui/material';
import { formatDistance } from 'date-fns';

export interface PostProps {
  author: string | undefined | null;
  createdAt: Date | undefined | null;
  text: string | undefined | null;
}

export function Post({ author, createdAt, text }: PostProps) {
  return (
    <Box
      sx={{
        borderLeft: 3,
        borderLeftColor: 'InactiveBorder',
        my: 2,
        pl: 1,
        py: 0.5,
      }}
    >
      <Box mb={0.5}>
        <Typography variant="body2">
          {author}
          {' - '}
          {createdAt ? formatDistance(createdAt, new Date()) : ''}
        </Typography>
      </Box>
      {text && <Typography>{text}</Typography>}
    </Box>
  );
}
