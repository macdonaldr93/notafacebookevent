import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { NextSeo } from 'next-seo';
import { EventCreateView } from '../views';

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <NextSeo description="Say goodbye to Facebook events. This is a simple tool to create an event and share it with your friends via SMS, email, or any other messaging apps." />
      <main id="main">
        <EventCreateView />
      </main>
    </LocalizationProvider>
  );
}
