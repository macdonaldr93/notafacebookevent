import { eventChanged as eventChangedFn } from './eventChanged';
import { postCreated as postCreatedFn } from './postCreated';
import {
  onChangeListenerRequest,
  onCreateListenerRequest,
} from './onListenerRequest';

export const eventChanged = onChangeListenerRequest(
  'events/{event}',
  eventChangedFn,
);

export const postCreated = onCreateListenerRequest(
  'events/{event}/posts/{post}',
  postCreatedFn,
);
