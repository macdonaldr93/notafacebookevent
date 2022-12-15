import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { useFirestore } from 'reactfire';
import { getUsername } from '../utils/cookies';

export function useTimeline() {
  const firestore = useFirestore();

  const createPost = async (eventId: string, text: string) => {
    const timelineRef = collection(firestore, 'events', eventId, 'timeline');
    const username = getUsername();

    try {
      await addDoc(timelineRef, {
        author: username,
        createdAt: serverTimestamp(),
        text,
        visibility: 'public',
      });

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return { createPost };
}
