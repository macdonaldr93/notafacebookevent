import { Change, EventContext } from 'firebase-functions';

export type ListenerCallback<Data = any> = (
  snapshot: FirebaseFirestore.QueryDocumentSnapshot<Data>,
  context: EventContext,
) => PromiseLike<any> | any;

export type ListenerChangeCallback<Data = any> = (
  change: Change<FirebaseFirestore.QueryDocumentSnapshot<Data>>,
  context: EventContext,
) => PromiseLike<any> | any;
