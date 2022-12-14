import { Button, Typography } from '@mui/material';
import Head from 'next/head';

export default function EventsNew() {
  return (
    <div>
      <Head>
        <title>Not a Facebook event</title>
        <meta name="description" content="Host events off of Facebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Typography variant="h2" component="h1" gutterBottom>
          Host an event
        </Typography>
        <Button variant="contained">Get started</Button>
      </main>
    </div>
  );
}
