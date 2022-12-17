import { firestore } from 'firebase-admin';
import { ListenerCallback } from './types';
import * as logger from '../utilities/logger';

export const postCreated: ListenerCallback = async snapshot => {
  const eventRef = await snapshot.ref.parent.parent?.get();
  const event = eventRef?.data();

  if (!event) {
    logger.critical('Event cannot be found', { ref: snapshot.ref });
    return;
  }

  const post = snapshot.data();

  logger.info(`Getting subscribers for ${event.id}`);

  const subscribers = await getSubscribers(event.id);
  const messagesRef = firestore().collection('messages');

  const sendMessages = subscribers.map(phone =>
    messagesRef.add({
      to: phone,
      body: `${post.author} posted to ${event.name}.\n\nSee https://events.toolbug.io/events/${event.id}`,
    }),
  );

  logger.info(`Sending messages to ${sendMessages.length} subscribers`);

  await Promise.all(sendMessages);
};

async function getSubscribers(id: string): Promise<string[]> {
  const subscribersSnap = await firestore()
    .collection(`/events/${id}/subscribers`)
    .get();

  return (
    [...new Set(subscribersSnap.docs?.map(snap => snap.data().phone))] ?? []
  );
}
