import { Container, Box, Typography } from '@mui/material';

export function EventNotFound() {
  return (
    <Container maxWidth="md">
      <Box my={10}>
        <section>
          <Box textAlign="center">
            <Typography variant="h2" component="h1" gutterBottom>
              We can&apos;t find the event
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
              Ask your friend for the URL to their event again
            </Typography>
          </Box>
        </section>
      </Box>
    </Container>
  );
}
