import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from 'reactfire';
import { getUsername } from '../utils/cookies';

export function usePosts() {
  const firestore = useFirestore();

  const createPost = async (
    eventId: string,
    text: string,
    notify?: boolean,
  ) => {
    const postsRef = collection(firestore, 'events', eventId, 'posts');
    const username = getUsername();

    try {
      await addDoc(postsRef, {
        author: username,
        createdAt: serverTimestamp(),
        notify: notify ?? false,
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
