import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useFirestore } from 'reactfire';
import { getGoing, setGoing } from '../utils/cookies';
import { usePosts } from './usePosts';
import { useUsername } from './useUsername';

export function useIsGoing(id: string) {
  const firestore = useFirestore();
  const { createPost } = usePosts();
  const { enqueueSnackbar } = useSnackbar();
  const { username } = useUsername();

  const [loading, setLoading] = useState(false);
  const [isGoing, setIsGoing] = useState(false);

  const onGoing = async () => {
    setLoading(true);

    const guestsRef = collection(firestore, 'events', id, 'guests');

    try {
      await addDoc(guestsRef, {
        name: username,
        createdAt: serverTimestamp(),
      });
      await createPost(id, `🙌 ${username} has RVPed`);
      setIsGoing(true);
      setGoing(id, true);
      enqueueSnackbar('RVPed to event', { variant: 'success' });
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Failed to RVP. Try again', {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setIsGoing(getGoing(id));
  }, [id]);

  return { isGoing, onGoing, loading };
}
