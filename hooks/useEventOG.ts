import { EventData } from '../types/events';

export function useEventOG(event?: EventData) {
  const title = `${event?.name ?? 'Untitled'} | Events | Toolbug`;
  const description = `${event?.name} on ${event?.startAt
    .toDate()
    .toLocaleString()} | ${event?.description}`;

  return { title, description };
}
