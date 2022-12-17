import { useSnackbar } from 'notistack';
import copy from 'copy-to-clipboard';

export function useShare(id: string, eventName: string) {
  const { enqueueSnackbar } = useSnackbar();

  const onShare = async () => {
    try {
      await navigator.share({ title: eventName, url: window.location.href });
    } catch (err) {
      copy(window.location.href);
      enqueueSnackbar('Copied to clipboard', { variant: 'success' });
      console.error(err);
    }
  };

  return { onShare };
}
