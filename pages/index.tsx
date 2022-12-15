import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Head from 'next/head';
import { EventCreate } from '../views/EventCreate';

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Head>
        <title>Not a Facebook Event</title>
        <meta name="description" content="Host events off of Facebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EventCreate />
    </LocalizationProvider>
  );
}
