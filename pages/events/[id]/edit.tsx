import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { EventErrorBoundary } from '../../../containers';
import { useEventOG, useEvent } from '../../../hooks';
import { EventUpdateView } from '../../../views';

function EventEdit({ id }: { id: string }) {
  const { status, data } = useEvent(id);
  const { title, description } = useEventOG();

  if (status === 'loading') {
    return null;
  }

  return (
    <>
      <NextSeo title={title} description={description} />
      <EventUpdateView id={id} data={data} />
    </>
  );
}

export default function EventEditPage() {
  const router = useRouter();
  const id = router.query.id as string | undefined;

  return (
    <main id="main">
      <EventErrorBoundary>
        <NextSeo nofollow noindex />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {id ? <EventEdit id={id} /> : null}
        </LocalizationProvider>
      </EventErrorBoundary>
    </main>
  );
}
