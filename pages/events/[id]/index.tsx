import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  orderBy,
  query,
} from 'firebase/firestore';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import {
  useFirestore,
  useFirestoreCollection,
  useFirestoreDocData,
} from 'reactfire';
import { UsernameGuard } from '../../../containers';
import { EventData, TimelineData } from '../../../types/events';
import { EventDetails } from '../../../views/EventDetails';

export interface EventIndex {
  id: string;
}

export default function EventIndex({ id }: EventIndex) {
  const firestore = useFirestore();
  const eventRef = doc(firestore, 'events', id) as DocumentReference<EventData>;
  const timelineRef = query(
    collection(firestore, 'events', id, 'timeline'),
    orderBy('postedAt', 'desc'),
  ) as CollectionReference<TimelineData>;
  const { data } = useFirestoreDocData(eventRef);
  const { data: timelineData } = useFirestoreCollection(timelineRef);

  return (
    <>
      <Head>
        <title>{data?.name ?? 'Untitled'} - Not a Facebook Event</title>
        <meta name="description" content="Host events off of Facebook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <UsernameGuard>
        <EventDetails id={id} data={data} timelineData={timelineData} />
      </UsernameGuard>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  if (!context.params?.id) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      id: context.params.id,
    },
  };
}
