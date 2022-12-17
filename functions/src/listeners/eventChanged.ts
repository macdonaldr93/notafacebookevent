import { firestore } from 'firebase-admin';
import { ListenerChangeCallback } from './types';
import * as logger from '../utilities/logger';

export const eventChanged: ListenerChangeCallback = async ({ before }) => {
  const event = before.data();

  logger.info(`Getting subscribers for ${before.id}`);

  const subscribers = await getSubscribers(before.id);
  const messagesRef = firestore().collection('messages');

  const sendMessages = subscribers.map(phone =>
    messagesRef.add({
      to: phone,
      body: `${event.name} changed.\n\nSee https://events.toolbug.io/events/${before.id}`,
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
