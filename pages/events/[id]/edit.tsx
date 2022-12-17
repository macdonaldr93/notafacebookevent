import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { doc, DocumentReference } from 'firebase/firestore';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { EventErrorBoundary } from '../../../containers';
import { EventData } from '../../../types/events';
import { EventUpdate } from '../../../views/EventUpdate';

function EventEdit({ id }: { id: string }) {
  const firestore = useFirestore();
  const eventRef = doc(firestore, 'events', id) as DocumentReference<EventData>;
  const { status, data } = useFirestoreDocData(eventRef, { idField: 'id' });

  if (status === 'loading') {
    return (
      <>
        <Head>
          <title>Events | Toolbug</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      </>
    );
  }

  return (
    <main id="main">
      <Head>
        <title>{data?.name ?? 'Untitled'} | Events | Toolbug</title>
        <meta
          name="description"
          content={`${data?.name} on ${data?.startAt
            .toDate()
            .toLocaleString()} | ${data?.description}`}
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <EventUpdate id={id} data={data} />
    </main>
  );
}

export default function EventEditPage() {
  const router = useRouter();
  const id = router.query.id as string | undefined;

  if (!id) {
    return (
      <>
        <Head>
          <title>Events | Toolbug</title>
          <meta name="robots" content="noindex, nofollow" />
        </Head>
      </>
    );
  }

  return (
    <EventErrorBoundary>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <EventEdit id={id} />
      </LocalizationProvider>
    </EventErrorBoundary>
  );
}
