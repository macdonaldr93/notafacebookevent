import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import {
  EventErrorBoundary,
  EventNotFound,
  UsernameGuard,
} from '../../../containers';
import { useEventDetails, useEventOG } from '../../../hooks';
import { EventDetailsView } from '../../../views';
import { EventDetailsViewLoading } from '../../../views';

function EventIndex({ id }: { id: string }) {
  const {
    status,
    eventData,
    guestsData,
    postsData: postsData,
  } = useEventDetails(id);
  const { title, description } = useEventOG(eventData);

  if (status === 'loading') {
    return <EventDetailsViewLoading />;
  }

  if (!eventData) {
    return (
      <>
        <NextSeo title="Not Found" />
        <EventNotFound />
      </>
    );
  }

  return (
    <>
      <NextSeo title={title} description={description} />
      <UsernameGuard>
        <EventDetailsView
          id={id}
          data={eventData}
          guestsData={guestsData}
          postsData={postsData}
        />
      </UsernameGuard>
    </>
  );
}

export default function EventIndexPage() {
  const router = useRouter();
  const id = router.query.id as string | undefined;

  return (
    <main id="main">
      <EventErrorBoundary>
        {id ? <EventIndex id={id} /> : <EventDetailsViewLoading />}
      </EventErrorBoundary>
    </main>
  );
}
