import { Box, Typography } from '@mui/material';
import { formatDistance } from 'date-fns';

export interface PostProps {
  author: string;
  createdAt: Date;
  text: string;
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
      <Typography>{text}</Typography>
    </Box>
  );
}
