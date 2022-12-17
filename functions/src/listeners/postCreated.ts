import { firestore } from 'firebase-admin';
import { uniqBy } from 'lodash';
import { addMinutes, isAfter } from 'date-fns';
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

  if (!post.notify) {
    return;
  }

  logger.info(`Getting subscribers for ${event.id}`);

  const subscribers = await getSubscribers(event.id);
  const messagesRef = firestore().collection('messages');

  const updateLastContacted = subscribers.map(({ id }) => {
    const subscriberRef = eventRef?.ref.collection('subscribers').doc(id);

    return subscriberRef?.set({ lastMessagedAt: new Date() }, { merge: true });
  });

  const sendMessages = subscribers.map(({ phone }) =>
    messagesRef.add({
      to: phone,
      body: `There are posts to ${event.name}.\n\nSee https://events.toolbug.io/events/${event.id}`,
    }),
  );

  logger.info(`Sending messages to ${sendMessages.length} subscribers`);

  await Promise.all([...sendMessages, ...updateLastContacted]);
};

async function getSubscribers(
  id: string,
): Promise<{ id: string; phone: string }[]> {
  const subscribersSnap = await firestore()
    .collection(`/events/${id}/subscribers`)
    .get();

  if (subscribersSnap.empty) {
    return [];
  }

  const data: any = subscribersSnap.docs
    ?.map(snap => ({
      ...snap.data(),
      id: snap.id,
    }))
    .filter((data: any) => {
      if (!data.lastMessagedAt) {
        return true;
      }

      const willMessage = addMinutes(data.lastMessagedAt, 15);

      return isAfter(new Date(), willMessage);
    });

  return uniqBy<{ id: string; phone: string }>(data, 'phone');
}
