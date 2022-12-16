import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Head from 'next/head';
import { EventCreate } from '../views/EventCreate';

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Head>
        <title>Not a Facebook Event</title>
        <meta
          name="description"
          content="Say goodbye to Facebook events. This is a simple tool to create an event and share it with your friends via SMS, email, or any other messaging apps."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <EventCreate />
    </LocalizationProvider>
  );
}
