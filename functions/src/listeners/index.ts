import { eventChanged as eventChangedFn } from './eventChanged';
import {
  onChangeListenerRequest,
  onCreateListenerRequest,
} from './onListenerRequest';

export const eventChanged = onChangeListenerRequest(
  'events/{event}',
  eventChangedFn,
);

export const eventPostCreated = onChangeListenerRequest(
  'events/{event}/posts',
  eventChangedFn,
);
