import { firestore } from 'firebase-admin';
import { uniqBy } from 'lodash';
import { addMinutes, isAfter } from 'date-fns';
import { ListenerCallback } from './types';
import * as logger from '../utilities/logger';

export const postCreated: ListenerCallback = async snapshot => {
  const eventRef = await snapshot.ref.parent.parent?.get();
  const event = eventRef?.data();

  if (!event || !eventRef) {
    logger.critical('Event cannot be found', { ref: snapshot.ref });
    return;
  }

  const post = snapshot.data();

  if (!post.notify) {
    return;
  }

  logger.info(`Getting subscribers for ${eventRef.id}`);

  const subscribers = await getSubscribers(eventRef.id, post.author);
  const messagesRef = firestore().collection('messages');

  const updateLastContacted = subscribers.map(({ id }) => {
    const subscriberRef = eventRef?.ref.collection('subscribers').doc(id);

    return subscriberRef?.set({ lastMessagedAt: new Date() }, { merge: true });
  });

  const sendMessages = subscribers.map(({ phone }) =>
    messagesRef.add({
      to: phone,
      body: `New posts at ${event.name}.\n\nhttps://events.toolbug.io/events/${eventRef.id}`,
    }),
  );

  logger.info(`Sending messages to ${sendMessages.length} subscribers`);

  await Promise.all([...sendMessages, ...updateLastContacted]);
};

async function getSubscribers(
  id: string,
  username: string,
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
      if (username === data.username) {
        return false;
      }

      if (!data.lastMessagedAt) {
        return true;
      }

      const willMessage = addMinutes(data.lastMessagedAt, 15);

      return isAfter(new Date(), willMessage);
    });

  return uniqBy<{ id: string; phone: string }>(data, 'phone');
}
