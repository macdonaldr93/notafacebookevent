import { doc, DocumentReference } from 'firebase/firestore';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { EventData } from '../types/events';

export function useEvent(id: string) {
  const firestore = useFirestore();
  const eventRef = doc(firestore, 'events', id) as DocumentReference<EventData>;
  const { status, data } = useFirestoreDocData(eventRef, {
    idField: 'id',
  });

  return {
    status,
    data,
  };
}
