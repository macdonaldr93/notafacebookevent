import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFirestore } from 'reactfire';
import { getUsername } from '../utils/cookies';

export function usePosts() {
  const firestore = useFirestore();

  const createPost = async (eventId: string, text: string) => {
    const postsRef = collection(firestore, 'events', eventId, 'posts');
    const username = getUsername();

    try {
      await addDoc(postsRef, {
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
